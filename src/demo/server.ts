import express from "express";
import stexdoc from "../lib";
import fs from "fs";
import path from "path";

// Read and parse the JSON template used for documentation rendering
const text = fs.readFileSync(path.join(__dirname, "template.json")).toString();
const template = JSON.parse(text);

// Initialize the StexDoc middleware with the parsed template
const middleware = stexdoc({ template });

// Create an Express app instance
const app = express();

// Mount the documentation middleware at /demo
app.use("/demo", middleware);

// Start the server on port 9000
app.listen(9000, () => {
  console.log("Server ready on: http://localhost:9000");
});