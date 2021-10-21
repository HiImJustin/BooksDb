function createAuthor() {

    // Get access to the create user form element

    let createAuthor = document.getElementById("createAuthor")

    // Convert the user form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createAuthor)));

    // Post form data to the API

    fetch("/api/create/author",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
}
