function changelog() {

    let changelogform = document.getElementById("changelog")

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(changelogform)));

    fetch("/api/changelog", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: formDataJSON
    })
}