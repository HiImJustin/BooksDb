//fetches the nav bar 
fetch("../views/nav.html")
.then(response => response.text())
.then(text => {
    let navBar = document.getElementById("loadnavbar")
    navBar.innerHTML += text
})
//fetches the footer
fetch("../views/footer.html")
    .then(res => res.text())
    .then(text => {
        let footer = document.getElementById("loadfooter")
        footer.innerHTML += text
})
//creates a function to sleep
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  //sleeps for 0.1 milliseconds to allow time for the navbar to load in
  sleep(0.1).then(() => {
    fetch("/api/secret")
    .then(res => res.json())
    .then(loggedin => {
        if(loggedin) {
            document.getElementById("loginnav").innerHTML = "logout"
        }
    })
});


