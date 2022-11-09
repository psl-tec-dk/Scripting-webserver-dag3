const fs = require("fs");
const mimetypes = require("./mimetypes.json");
const path = require("path");

exports.sendText = (res, msg, status = 200) => {
    res.statusCode = status;
    res.setHeader("Content-type", "text/plain");
    res.end(msg);
}

exports.sendJson = (res, msg, status = 200) => {
    res.statusCode = status;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(msg));
}

exports.sendFile = (res, filename) => {
    const ext = path.extname(filename);
    const mime = mimetypes[ext];
    fs.readFile(filename, (err, filecontent) => {
        if(err) {
            exports.sendJson(res, {msg: "Filen findes ikke"}, 404);
            return;
        }
        res.statusCode = 200;
        res.setHeader("Content-type", mime.type);
        res.end(filecontent);
    })
}

exports.logger = (req, res) => {
    let logStr = new Date().toISOString();
    logStr += ` ${req.method} ${req.url}`;
    res.on("finish", () => {
        logStr += ` ${res.statusCode} ${res.statusMessage}`;
        console.log(logStr);
    })
}

exports.redirect = (res, url) => {
    res.statusCode = 308;
    res.setHeader("Location", url);
    res.end();
}

exports.getBody = (req) => {
    let body = "";
    return new Promise((resolve, reject) => {
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            body = JSON.parse(body);
            resolve(body);
        });
        req.on("error", () => {
            reject("Fejl");
        });
    });
}