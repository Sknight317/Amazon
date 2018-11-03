// require mysql
var mysql = require("mysql");

// require inquirer
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });

  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // run this function after the connection is made 
    afterConnection();
  });
  
  // Needs to run AFTER everything is connected
  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, data) {
      if (err) throw err;
      console.log(data);
      connection.end();
    });
  }