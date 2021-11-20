// Load existing data
let urlParamters = new URLSearchParams(window.location.search)

//Access the user ID from the query string 
let authorId = urlParamters.get("id")

if (authorId) {
    fetch(`/api/author/${authorId}`)
        .then(res => res.json())
        .then(author => {
            console.log(author)

            document.getElementById("authorId").value = author.authorID
            document.getElementById("name").value = author.name
            document.getElementById("surname").value = author.surname
            document.getElementById("nationality").value = author.nationality
            document.getElementById("birthYear").value = author.birthYear
            document.getElementById("deathYear").value = author.deathYear
        })
}
//Update user function
function updateAuthor() {
    // Get access to the update user form 
    let updateUserForm = document.getElementById("update-author-form")
    // conver the form data into a json string
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateUserForm)));
    // Post the json data to the API
    fetch("/api/author/update", {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: formDataJSON,
    })
    .then(res => res.json())
    .then(response => {
        //handles the response from the server
        alert(response)
        //Redirect back to user list
        window.location.href = "author_list.html"
    })
}
