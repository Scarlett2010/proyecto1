import app from "./server.js";

app.listen(app.get('port'),()=>console.log("server on"));

