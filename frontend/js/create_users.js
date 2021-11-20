function createUser() {
    
    let createUser = document.getElementById("create_users");
    //Converts the formdata from create_users into json
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createUser)));
    
    fetch("/api/users/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: formDataJSON,
    })
    .then(res => res.json())
    .then(res => {
        //Handles the response from the server
        console.log("user create request sent")
        //Alerts the respsone
        alert(res)
        //Redirects to list_users if created
        window.location.href = "list_users.html"
    })
    .catch(error => {
        console.log("create user request failed" + error)
    })
}