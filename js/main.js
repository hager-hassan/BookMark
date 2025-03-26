// ! global variables

let siteName = document.getElementById('siteName');
let siteURL = document.getElementById('siteURL');

bookmarkList = [];

// use it fe function el update
let currentIndex;

// ! lw 3ndy bookmarks fe el localstorage display them 
// ! (awl ma a3ml refresh aw lma a5rog w ad5ol el website b3den)
if(JSON.parse(localStorage.getItem('bookmarkList')) != null){
    bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
    display();
}

// ! to clear el inputs
function clear(){
    siteName.value = '';
    siteURL.value = '';
}

// ! check lw el inputs empty
function isEmpty(){
    return siteName.value.trim() === '' || siteURL.value.trim() === '';
}

// ! check lw each bookmark name is unique
function isUnique(indexToIgnore = -1) {
    for (let i = 0; i < bookmarkList.length; i++) {
        if (i !== indexToIgnore && bookmarkList[i].bookmarkName === siteName.value) {
            return false;
        }
    }
    return true;
}

// ! to display el bookmarks
function display(){
    let container = '';

    for(let i = 0; i < bookmarkList.length ; i++){
        container += `<tr>
                            <td>${i+1}</td>
                            <td>${bookmarkList[i].bookmarkName}</td>
                            <td>
                                <button class="btn btn-visit" onclick="visit(${i})">
                                    <i class="fa-solid fa-eye pe-2"></i>
                                    Visit
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-update" onclick="retrieveData(${i})">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                    Update
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-delete" onclick="deleteBookmark(${i})">
                                    <i class="fa-solid fa-circle-xmark"></i>
                                </button>
                            </td>
                        </tr>`
    }

    document.getElementById('tableContent').innerHTML = container;
}

// ! to add bookmark
function add(){
    // select el values mn el inputs w store them
    let bookmark = {
        bookmarkName: siteName.value,
        bookmarkURL: siteURL.value
    }

    if(isEmpty()){
        emptyInputsAlter();
        return;
    }

    if(!isUnique()){
        notUniqueAlter();
        return;
    }

    // add el bookmark l el list
    bookmarkList.push(bookmark);

    // clear el inputs
    clear();

    // store them in local storage
    localStorage.setItem('bookmarkList' , JSON.stringify(bookmarkList));

    // display el bookmarks
    display();

    addMessage();
}

// ! to delete bookmark
function deleteBookmark(index){
    // delete el book mark mn el array
    bookmarkList.splice(index , 1);

    // add el remaining bookmarks in localstorage again
    localStorage.setItem('bookmarkList' , JSON.stringify(bookmarkList));

    // display el bookmarks
    display();
}

// ! to retrieve el data for inputs
function retrieveData(index){
    siteName.value = bookmarkList[index].bookmarkName;
    siteURL.value = bookmarkList[index].bookmarkURL;

    currentIndex = index;

    // show update button and hide add button
    document.getElementById('btn-add').classList.add("d-none");
    document.getElementById('btn-update').classList.remove("d-none");
} 

// ! to update el bookmark
function update(){
    let bookmark = {
        bookmarkName: siteName.value,
        bookmarkURL: siteURL.value
    }

    if(isEmpty()){
        emptyInputsAlter();
        return;
    }

    if(!isUnique(currentIndex)){
        notUniqueAlter();
        return;
    }

    // update el book mark
    bookmarkList.splice(currentIndex , 1 , bookmark);

    // clear el inputs
    clear();

    localStorage.setItem('bookmarkList' , JSON.stringify(bookmarkList));

    display();

    // show add button and hide update button
    document.getElementById('btn-update').classList.add("d-none");
    document.getElementById('btn-add').classList.remove("d-none");

    updateMessage();
}

// ! to go to the link
function visit(index){
    let url = bookmarkList[index].bookmarkURL;

    window.open(url , '_blank');
}

// !------------------------ functions for alters ---------------------! 

//  ? alter for empty inputs
function emptyInputsAlter(){
    Swal.fire({
        title: 'Error!',
        text: 'Fields cannot be empty!',
        icon: 'error',
        iconColor: '#fb6f92',
        confirmButtonColor: "#fb6f92",
        color: '#504e52',
    });
}

//  ? alter for empty inputs
function notUniqueAlter(){
    Swal.fire({
        title: 'Error!',
        text: 'Bookmark name should be unique!',
        icon: 'error',
        iconColor: '#fb6f92',
        confirmButtonColor: "#fb6f92",
        color: '#504e52',
    });
}

// ? show message when add bookmark
function addMessage(){
    Swal.fire({
        toast: true,
        icon: 'success',
        iconColor: '#9f86c0',
        title: 'Bookmark added successfully!',
        width: '25%',
        showConfirmButton: false,
        timer: 2000, 
    });
}

// ? show message when update bookmark
function updateMessage(){
    Swal.fire({
        toast: true,
        icon: 'success',
        iconColor: '#9f86c0',
        title: 'Bookmark updated successfully!',
        width: '26%',
        showConfirmButton: false,
        timer: 2000, 
    });
}