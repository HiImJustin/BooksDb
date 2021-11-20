let urlParamters = new URLSearchParams(window.location.search)

let userId = urlParamters.get("id")
//Populates the Delete user form  uses the fetch to grab all the data
if (userId) {
    fetch(`/api/users/${userId}`)
        .then(res => res.json())
        .then(user => {
            console.log(user)
            document.getElementById("userId").value = user.userId
            document.getElementById("firstName").value  = user.firstName
            document.getElementById("lastName").value = user.lastName
            document.getElementById("email").value = user.email
            document.getElementById("username").value = user.username
            document.getElementById("password").value = user.password
            document.getElementById("accessRights").value = user.accessRights
        })
}
// Function to deleteUser
function deleteUser() {
    // Get access to the update user form 
    let deleteUserForm = document.getElementById("delete-user-form")
    // conver the form data into a json string
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(deleteUserForm)));
    // Post the json data to the API
    fetch(`/api/users/delete?id=` + userId, {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: formDataJSON,
    })
    .then(res => res.json())
    .then(response => {
        alert(response)
        //Redirect back to user list
        window.location.href = "list_users.html"
    })
}