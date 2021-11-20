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
}
//Fetches all the possible authors and adds it to a select list
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

// Fetches all possible coverimages into a select list
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

//Promise all to fetch the new bookid for the changelog and who the current user is and adds it to the form
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
