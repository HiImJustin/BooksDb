fetch("/api/author")
    .then(response => response.json())
    .then(authors => {
        console.log(authors)
        let author_list = document.getElementById("author-list")

    for (let author of authors) {
        author_list.innerHTML += `
    <article class="book">
        <h1>${author.name}</h1>
        <h2>${author.surname}</h2>
        <h2>${author.nationality}</h2>
        <h3>${author.birthYear}</h3>
        <h3>${author.deathYear}</h3>
        <a href="update_author.html?id=${author.authorID}">Edit</a>
        <a href="delete_author.html?id=${author.authorID}">Delete</a>
    </article>
        `
    }
})