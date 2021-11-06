var connect = require("./database/connect")

// Coneccion a base de datos. Y migrations
connect.db_connect().catch((err) => {
    console.log(err)
})


