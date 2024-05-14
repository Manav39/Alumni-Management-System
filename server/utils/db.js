import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    port: "4306",
    user: "root",
    password: "",
    database: "wt_lab_exam"
})

con.connect((err) => {
    if (err) {
        console.log("Connection Error", err)
    } else {
        console.log("connected")
    }
})

export default con;
