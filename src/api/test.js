const utils = require("../utlities");
const dataService = require("../dataservice/testservice");

module.exports = {
    GET: {
        handler : (req, res, param) => {
            if(param) {
                param = param.replace("/","");
                
                dataService.getById(param)
                .then(data => {
                    utils.sendJson(res, {msg: "Test", method: req.method, param: param, data});
                })
                .catch(err => {
                    utils.sendJson(res, {msg: "Test", method: req.method, param: param, err: err.message});
                });
                return;
            }
            dataService.getAll()
            .then(data => {
                utils.sendJson(res, {msg: "Test", method: req.method, param: param, data});
            })
            .catch(err => {
                utils.sendJson(res, {msg: "Test", method: req.method, err: err.message});
            });
        }
    },
    POST: {
        handler : (req, res, param) => {
            if(param) {
                utils.sendJson(res, {msg: "Parameter not allowed here"}, 400);
                return;
                // param = param.replace("/","");
            }
            utils.getBody(req)
                .then( body => {
                    utils.sendJson(res, {msg: "Test", method: req.method, body});
                })
                .catch( err => {
                    utils.sendJson(res, err, 500);
                })
        }
    },
    PUT: {
        handler : (req, res, param) => {
            if(param) {
                param = param.replace("/","");
                utils.sendJson(res, {msg: "Test", method: req.method, param: param});
                return;
            }
            utils.sendJson(res, {msg: "Parameter required"}, 400);
        }
    },
    DELETE : {
        handler: (req, res, param) => {
            if(!param) {
                utils.sendJson(res, {msg: "Parameter required"}, 400);
                return;
            }
            param = param.replace("/","");
            utils.sendJson(res, {msg: "Test", method: req.method, param});
        }
    }
}