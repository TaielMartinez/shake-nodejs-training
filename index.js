var connect = require("./database/connect")
var web_server = require("./web_server/routes")

// Coneccion a base de datos. Y migrations
connect.db_connect().catch((err) => {
    console.log(err)
})


// Express = Web Server
web_server.start_server()

