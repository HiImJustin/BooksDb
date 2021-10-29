function postAddBook() {

    // Get access to the add book form element

    let addBookForm = document.getElementById("add_book")

    // Convert the user form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(addBookForm)));

    // Post form data to the API

    fetch("/api/book/add",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
}

