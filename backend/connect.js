const sql = require('mssql/msnodesqlv8')
const config = {
    server: 'localhost',
    user: 'sa',
    password: '123456',
    database: 'ShoppeDoAn3',
    driver: 'msnodesqlv8'
}
const connect = new sql.ConnectionPool(config).connect().then((bool => {
    return bool
}))
export { sql, connect }