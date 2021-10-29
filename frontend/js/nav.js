fetch("../views/nav.html")
.then(response => response.text())
.then(text => {
    let navBar = document.getElementById("loadnavbar")
    navBar.innerHTML += text
})