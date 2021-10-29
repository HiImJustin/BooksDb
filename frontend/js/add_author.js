function createAuthor() {

    // Get access to the create user form element

    let createAuthor = document.getElementById("createAuthor")

    // Convert the user form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createAuthor)));

    // Post form data to the API

    fetch("/api/create/author", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
        .then(res => res.json())
        .then(res => {
            //handle the response from the server
            console.log("author request sent")
            alert(res)
            //Redirect back to user list
            window.location.href = "author_list.html"
        })
        .catch(err => {
            //handle the error from the server
            console.log("create author request failed " + err)
        })
}
