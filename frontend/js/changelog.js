// THIS IS A TESTING FUNCTION 
function changelog() {

    let changelogform = document.getElementById("changelog")

    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(changelogform)));
    
    fetch("/api/changeLog", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: formDataJSON
    })
}