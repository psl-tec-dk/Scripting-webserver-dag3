const dbh = require("../datasource/mysqldata");

exports.getAll = () => {
    return new Promise((succes, failure) =>{
        dbh.getAll()
        .then(data => {
            succes(data);
            // console.log(data);
        })
        .catch( err => {
            console.log(err);
            failure(err)
        });
    });
}

exports.getById = id => {
    return new Promise((succes, failure) =>{
        dbh.getById(id)
        .then(data => {
            succes(data);
            // console.log(data);
        })
        .catch( err => {
            console.log(err);
            failure(err)
        });
    });
}