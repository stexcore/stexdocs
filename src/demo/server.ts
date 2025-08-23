import express from "express";
import stexdoc from "../lib";
import fs from "fs";
import path from "path";

const text = fs.readFileSync(path.join(__dirname, "template.json")).toString();
const template = JSON.parse(text);

const middleware = stexdoc({ template });
const app = express();

app.use("/demo", middleware);

app.listen(9000, () => {
    console.log("Server ready on: http://localhost:9000");
});