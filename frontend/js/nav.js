fetch("../views/nav.html")
.then(response => response.text())
.then(text => {
    let navBar = document.getElementById("loadnavbar")
    navBar.innerHTML += text
})

fetch("../views/footer.html")
    .then(res => res.text())
    .then(text => {
        let footer = document.getElementById("loadfooter")
        footer.innerHTML += text
    }) 