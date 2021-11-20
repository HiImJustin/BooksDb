function login() {
    
    //check if logged in
    let loginform = document.getElementById("login_form")
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(loginform)));
    //posts the data entered into the login form to the api endpoint
        fetch("/api/users/login", {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: formDataJSON
        })
        .then(res => res.json())
        .then(res => {
            //handles the response from the server
            console.log('login request sent')
            alert(res)
            window.location.href = "/frontend/views/book_list.html"
        })
        .catch(err => {
            console.log('login request failed ' + err)
        })
}
//Sends a request to the server to destroy the session
function logout() {
    fetch("/api/logout")
        .then(res => res.json())
        .then(res => {
            //Handles the request from the server
            console.log("logout request sent")
            alert(res)
            //Redirects
            window.location.href = "index.html"
        })
        .catch(error => {
            console.log('logout request failed ' + error)
        })
}

//Checks who the current users is and the userID
fetch("/api/secret")
    .then(res => res.json())
    .then(loggedin => {
        if (!loggedin) {
            console.log("login dickhead")
        }   else {
            //hides the login form
            document.getElementById("login_form").style.display = "none"
            console.log("carry on")
            //makes the login navbar show as logout
            document.getElementById("logout_form").style.display = "block"
        }
    })
    .catch(error => {
        console.log('not logged in ' + error)
})