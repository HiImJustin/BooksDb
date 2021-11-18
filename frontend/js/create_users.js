function createUser() {

    let createUser = document.getElementById("create_users");
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
        console.log("user create request sent")
        alert(res)
    })
    .catch(error => {
        console.log("create user request failed" + error)
    })
}