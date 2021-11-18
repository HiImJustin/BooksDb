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
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  sleep(0.1).then(() => {
    fetch("/api/secret")
    .then(res => res.json())
    .then(loggedin => {
        if(loggedin) {
            document.getElementById("loginnav").innerHTML = "logout"
        }
    })
});


