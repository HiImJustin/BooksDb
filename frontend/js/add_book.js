function postAddBook() {

    // Get access to the add book form element

    let addBookForm = document.getElementById("add_book")

    // Convert the user form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(addBookForm)));

    // Post form data to the API
    fetch("/api/changeLog", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: formDataJSON
    })

    fetch("/api/book/add",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
}

//populate add book

    Promise.all([
        fetch(`/api/book/lastID`).then(value => value.json()),
        fetch(`/api/secret`).then(value => value.json())
    ])
        .then((res) => {
            let book = res[0]
            let user = res[1]
            console.log(res)
            document.getElementById("bookID").value = book.bookID
            document.getElementById("userID").value = user.userID
        })

