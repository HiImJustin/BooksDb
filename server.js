const express = require("express")

const server = express()
const port = 8080


//server static front end resources
server.use(express.static("frontend"))

// server static backend api
server.use("/api", express.static("backend"))

//Enable middleware for JSON and urlecoded form data
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// link up book Controller 
const bookController = require("./backend/controllers/bookController")
server.use("/api", bookController)

//link up author controller, this allows us to access
// things in that folder
//its like linking to a script src
const authorController = require("./backend/controllers/authorController")
server.use("/api", authorController)

const userController = require("./backend/controllers/userController")
server.use("/api", userController)


//User login endpoint
server.post("/api/login",(req,res) => {
    for (let user of users) {
        if (user.username == req.body.username && user.password == req.body.password) {
            // The successful case!
            res.status(200)
                .type("json")
                .send(`
                    {
                        "status": "login successful"
                    }
                `)
            // Return (stop) the function here, we are all done.
            return;
        }
    }

    res.status(401)
        .type("json")
        .send (`
            {
                "status": "login failed:"
            }
        `)

})


//start the express server
server.listen(port, () => {
    console.log("server listening on http://localhost:" +port)
})