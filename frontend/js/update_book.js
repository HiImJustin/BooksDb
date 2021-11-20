// Load existing date
let urlParamters = new URLSearchParams(window.location.search)

let bookID = urlParamters.get("id")
//populate update book form
if (bookID) {
Promise.all([
    fetch(`/api/books/${bookID}`).then(value => value.json()),
    fetch(`/api/secret`).then(value => value.json()),
    fetch(`/api/coverimages`).then(value => value.json()),
    fetch(`/api/authors`).then(value => value.json()),
])
    .then((res) => {
        console.log(res)
        let book = res[0]
        let user = res[1]
        let images = res[2]
        let authors = res[3]
        //populates the update book form
        document.getElementById("bookID").value = book.bookID
        document.getElementById("bookTitle").value = book.bookTitle
        document.getElementById("originalTitle").value = book.originalTitle
        document.getElementById("yearofPublication").value = book.yearofPublication
        document.getElementById("genre").value = book.genre
        document.getElementById("millionsSold").value = book.millionsSold
        document.getElementById("languageWritten").value = book.languageWritten
        //Inserts the current coverimage
        document.getElementById("coverimagepath").innerHTML += `<option value"${book.coverImagePath}">
            ${book.coverImagePath}
            </option>
        `
        //Inserts the current author name
        document.getElementById("author").innerHTML += `<option value="${book.name}">
            ${book.name}
            </option>
        `
        // Gets a list of cover images to choose to update to
        for (let image of images) {
            document.getElementById("coverimagepath").innerHTML
            += `<option value="${image.coverImagePath}">
                ${image.coverImagePath}
                </option>
            `
        }
        //Gets a lits of authors to choose to update to
        for (let author of authors) {
            document.getElementById("author").innerHTML 
            += `<option value ="${author.authorID}">
                ${author.name + " " + author.surname}
                </option>
            `
        }
        //populates a hidden form who the user is making changes
        document.getElementById("userID").value = user.userID
        })
}


//Update from to post to the datbase
function updateBook() {

    let updateBookForm = document.getElementById("update_book")
    
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateBookForm)));
    //Handles the update query
    fetch("/api/books/update", {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: formDataJSON,
    })
    //Handles the update query
    fetch("/api/updatelog", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: formDataJSON
    })
    .then(res => res.json())
    .then(response => {
        //Handles the response from the server
        alert(response)
        window.location.href = "book_list.html"
    })
}