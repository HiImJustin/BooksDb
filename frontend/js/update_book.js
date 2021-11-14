// Load existing date
let urlParamters = new URLSearchParams(window.location.search)

let bookID = urlParamters.get("id")

if (bookID) {
Promise.all([
    fetch(`/api/books/${bookID}`).then(value => value.json()),
    fetch(`/api/secret`).then(value => value.json())
])
    .then((res) => {
        console.log(res)
        let book = res[0]
        let user = res[1]

        document.getElementById("bookID").value = book.bookID
        document.getElementById("bookTitle").value = book.bookTitle
        document.getElementById("originalTitle").value = book.originalTitle
        document.getElementById("yearofPublication").value = book.yearofPublication
        document.getElementById("genre").value = book.genre
        document.getElementById("millionsSold").value = book.millionsSold
        document.getElementById("languageWritten").value = book.languageWritten
        document.getElementById("coverImagePath").value = book.coverImagePath
        document.getElementById("userID").value = user.userID
        })
}



function updateBook() {

    let updateBookForm = document.getElementById("update_book")
    
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateBookForm)));

    fetch("/api/books/update", {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: formDataJSON,
    })
    fetch("/api/updatelog", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: formDataJSON
    })
    .then(res => res.json())
    .then(response => {
        alert(response)
        window.location.href = "book_list.html"
    })
}