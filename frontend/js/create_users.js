function postCreateUser() {

    // Get access to the create user form element

    let createUserForm = document.getElementById("create_users")

    // Convert the user form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createUserForm)));

    // Post form data to the API

    fetch("/api/users/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
        .then(res => res.json())
        .then(res => {
            //handle the response from the server
            console.log("user request sent")
            alert(res)
            //Redirect back to user list
            /* window.location.href = "list_users.html" */
        })
        .catch(err => {
            //handle the error from the server
            console.log("create user request failed " + err)
        })

}