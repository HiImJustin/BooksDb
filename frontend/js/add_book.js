function postAddBook() {

    // Get access to the add book form element

    let addBookForm = document.getElementById("add_book")

    // Convert the user form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(addBookForm)));
    console.log(formDataJSON)

    // Post form data to the API
    fetch("/api/book/add",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
        /* fetch("/api/changelog", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: formDataJSON
        }) */
        window.location.href = "book_list.html"
}

fetch("/api/authors")
    .then(res => res.json())
    .then((authors) => {
        let authorSelect = document.getElementById("author")

        for(let author of authors) {
            authorSelect.innerHTML 
            += `<option value = "${author.authorID}">
                ${author.name + " " + author.surname}
            </option>`
        }
})

fetch("/api/coverimages")
    .then(res => res.json())
    .then((images) => {
        let coverImage = document.getElementById("coverimagepath")

        for (let image of images) {
            console.log(image)
            coverImage.innerHTML 
            += `<option value = "${image.coverImagePath}">
                ${image.coverImagePath}
                </option>
            `
        }
    })
//populate add book

    Promise.all([
        fetch(`/api/book/lastID`).then(value => value.json()),
        fetch(`/api/secret`).then(value => value.json())
    ])
        .then((res) => {
            let book = res[0]
            let user = res[1]
            document.getElementById("bookID").value = book.bookID + 1;
            document.getElementById("userID").value = user.userID
    })
