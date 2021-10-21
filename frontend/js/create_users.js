function postCreateUser() {

    // Get access to the create user form element

    let createUserForm = document.getElementById("create_users")

    // Convert the user form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createUserForm)));

    // Post form data to the API

    fetch("/api/users/create",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
}
