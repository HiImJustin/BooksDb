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
            window.location.href = "../index.html"
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
            window.location.href = "login.html"
        })
        .catch(error => {
            console.log('logout request failed ' + error)
        })
}
