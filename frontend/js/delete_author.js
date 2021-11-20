let urlParamters = new URLSearchParams(window.location.search)
//Grabs the id from the url
let authorId = urlParamters.get("id")
console.log(authorId)

if (authorId) {
    //fetches data from the api to populate the delete form
    fetch(`/api/author/${authorId}`)
        .then(res => res.json())
        .then(author => {
            console.log(author)
            document.getElementById("authorID").value = author.authorID
            document.getElementById("name").value  = author.name
            document.getElementById("surname").value = author.surname
            document.getElementById("nationality").value = author.nationality
            document.getElementById("birthYear").value = author.birthYear
            document.getElementById("deathYear").value = author.deathYear
        })
}

function deleteAuthor() {
    // Get access to the delete author form
    let deleteAuthorForm = document.getElementById("delete-author-form")

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(deleteAuthorForm)))
    //delete?id is the same as ${authorId}
    fetch(`/api/author/delete?id=` + authorId, {
        method: "POST",
        headers: {
            'Content-type': "aplication/json"
        },
        body: formDataJSON,
    })
    .then(res => res.json())
    .then(response => {
        //Response from the server
        alert(response)
        //Redirect
        window.location.href = "author_list.html"
    }) 
}