import express from "express";

const app = express();

app.use(function (req, res, next) {
    console.log('Request:', req.method, req.path);
    next()
})