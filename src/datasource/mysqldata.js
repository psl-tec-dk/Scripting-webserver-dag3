const mysql = require("mysql2");
const config = require("../config/dbconfig.json");

let pool;
try {
    pool = mysql.createPool(config);
}
catch(err) {
    console.log(err);
}

exports.getAll = () => {
    return new Promise((succes, failure) => {
        const sql = "select * from tblapi order by fullname";
        pool.execute(sql, (err, rows) => {
            if(err) {
                failure(err);
                return;
            }
            succes(rows);
        });
    });
}

exports.getById = id => {
    return new Promise((succes, failure) => {
        const sql = "select * from tblapi where id = ? order by fullname";
        pool.execute(sql, [id], (err, rows) => {
            if(err) {
                failure(err);
                return;
            }
            succes(rows);
        });
    });
}