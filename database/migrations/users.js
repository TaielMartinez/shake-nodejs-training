(async function () {
    const conn = require('../connect')
    let check_table
    // Query SQL para comprobar si existe
    check_table = `SHOW TABLES LIKE "users"`

    if (Object.keys(await conn.query(check_table)).length == 0) {
        console.log('-Create users')

        // Query SQL para crear la tabla
        await conn.query(`
        CREATE TABLE \`users\` (
            \`id\` INT(11) NOT NULL AUTO_INCREMENT,
            \`user\` VARCHAR(255) NULL DEFAULT NULL,
            \`pass\` VARCHAR(255) NULL DEFAULT NULL,
            \`rol\` INT(11) NULL DEFAULT NULL,
            \`name\` VARCHAR(255) NULL DEFAULT NULL,
            PRIMARY KEY (\`id\`)
            )`).catch(err => { throw err })

    }







    /////////////       SEEDS          //////////////
    /*                       Comprobación por query                               */
    // Query SQL para comprobar si existe
    check_table = `SELECT * FROM users WHERE user = 'user1'`
    if (Object.keys(await conn.query(check_table)).length == 0) {
        console.log('-Insert users')
        // Query SQL para crear el seed
        await conn.query(`
            INSERT INTO users (user, pass, rol, name) VALUES ('user1', 'pass123', 10, 'admin')
        `).catch(err => { throw err })
    }


    // Query SQL para comprobar si existe
    check_table = `SELECT * FROM users WHERE user = 'user2'`
    if (Object.keys(await conn.query(check_table)).length == 0) {
        console.log('-Insert users')
        // Query SQL para crear el seed
        await conn.query(`
            INSERT INTO users (user, pass, rol, name) VALUES ('user2', 'pass123', 5, 'admin')
        `).catch(err => { throw err })
    }





    /*                       Una sola comprobación                                 */
    // Query SQL para comprobar si existe
    check_table = `SELECT * FROM users WHERE user = 'user1'`
    if (Object.keys(await conn.query(check_table)).length == 0) {
        console.log('-Insert users')

        // Querys SQL para crear el seed
        await conn.query(`
            INSERT INTO users (user, pass, rol, name) VALUES ('user1', 'pass123', 10, 'admin')
        `).catch(err => { throw err })
        await conn.query(`
            INSERT INTO users (user, pass, rol, name) VALUES ('user2', 'pass123', 5, 'admin')
        `).catch(err => { throw err })

    }
}())
