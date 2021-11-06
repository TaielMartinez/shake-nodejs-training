var mysql = require('mysql')
const config = require('../config.json')
const fs = require('fs');
const { builtinModules } = require('module');
var con


const query = (sql) => {
    return new Promise((resolve, reject) => {
        con.query(sql, function (err, result) {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const db_connect = () => {
    return new Promise((resolve, reject) => {
        let config_key = Object.keys(config)
        if (!(config_key.includes("DB_IP") && config_key.includes("DB_PORT") && config_key.includes("DB_USER") && config_key.includes("DB_PASS") && config_key.includes("DB_NAME"))) {
            reject('Datos de connecion no econtrados')
            return
        }
        con = mysql.createConnection({
            host: config.DB_IP,
            port: config.DB_PORT,
            user: config.DB_USER,
            password: config.DB_PASS,
            database: config.DB_NAME,
        })

        con.connect(async function (err) {
            if (err) {
                await create_database()
                    .then(async () => {
                        console.log("-Base de datos conectada")
                        await migrations_seeds()
                        resolve()
                    })
            } else {
                console.log("-Base de datos conectada")
                await migrations_seeds()
                resolve()
            }
        })
    })
}


const migrations_seeds = () => {
    return new Promise(async (resolve, reject) => {
        await fs.readdirSync(__dirname + "/migrations").forEach(async migration => {
            await require(__dirname + '/migrations/' + migration)
        })
    })
}

const create_database = () => {
    return new Promise((resolve, reject) => {
        con = mysql.createConnection({
            host: config.DB_IP,
            port: config.DB_PORT,
            user: config.DB_USER,
            password: config.DB_PASS
        })

        con.connect(async function (err2) {
            if (err2) throw err2
            await query("CREATE DATABASE `" + config.DB_NAME + "`").catch(err => { throw err })
            con = mysql.createConnection({
                host: config.DB_IP,
                port: config.DB_PORT,
                user: config.DB_USER,
                password: config.DB_PASS,
                database: config.DB_NAME
            })
            console.log('-Base de datos creada')
            resolve()
        })
    })
}


module.exports = {
    db_connect,
    query
}
