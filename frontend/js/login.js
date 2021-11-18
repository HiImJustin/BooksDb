function login() {
    
    //check if logged in
    let loginform = document.getElementById("login_form")
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(loginform)));

        fetch("/api/users/login", {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: formDataJSON
        })
        .then(res => res.json())
        .then(res => {
            console.log('login request sent')
            alert(res)
            window.location.href = "/frontend/views/book_list.html"
        })
        .catch(err => {
            console.log('login request failed ' + err)
        })
}

function logout() {
    fetch("/api/logout")
        .then(res => res.json())
        .then(res => {
            console.log("logout request sent")
            alert(res)
            window.location.href = "index.html"
        })
        .catch(error => {
            console.log('logout request failed ' + error)
        })
}


fetch("/api/secret")
    .then(res => res.json())
    .then(loggedin => {
        if (!loggedin) {
            console.log("login dickhead")
        }   else {
            document.getElementById("login_form").style.display = "none"
            console.log("carry on")
            document.getElementById("logout_form").style.display = "block"
        }
    })
    .catch(error => {
        console.log('not logged in ' + error)
})