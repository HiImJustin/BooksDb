fetch("/api/users")
    .then(res => res.json())
    .then(users => {
        let userListSection = document.getElementById("user-list")

        for (let user of users) {
            userListSection.innerHTML += `
            <article class="user">
                <span>Id: ${user.userId}</span>
                <span>${user.firstName}</span>
                <span>${user.lastName}</span>
                <span>${user.username}</span>
                <span>${user.email}</span>
                <div>
                <a href="update_user.html?id=${user.userId}">Edit</a>
                <a href="delete_user.html?id=${user.userId}">Delete</a>
                </div>
            </article>
            `
        }
    })