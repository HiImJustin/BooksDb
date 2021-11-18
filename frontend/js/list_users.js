fetch("/api/users")
    .then(res => res.json())
    .then(users => {
        let userListSection = document.getElementById("user-list")

        for (let user of users) {
            userListSection.innerHTML += `
            <article class="user">
                <tr>
                    <td>${user.userId}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.accessRights}</td>
                    <td><a href="update_user.html?id=${user.userId}">Edit</a></td>
                    <td><a href="delete_user.html?id=${user.userId}">Delete</a></td>
                </tr>
            </article>
            `
        }
    })