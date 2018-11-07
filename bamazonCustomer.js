// require mysql
var mysql = require("mysql");

// require inquirer
var inquirer = require("inquirer");

// used to require console.table
const cTable = require('console.table');

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
      console.table(data);
      start();
    });
  }

  function start() {
    inquirer
    .prompt([
      {
      name: "id",
      type: "input",
      message: "What is the ID of the item you would like to purchase?",
       // To validate whether the user's answer is a number
      validate: function(value) {
        if(isNaN(value)=== false){
            return true;
        }
        return false;   
     }
    },
    {
      name: "Quantity",
      type: "input",
      message: "How many would you like?",
      // To validate whether the user's answer is a number
      validate: function(value) {
        if(isNaN(value)=== false){
            return true;
        }
        return false;   
     }
    },
  ])
  .then(function(answer) {
    // Check to see if stock quantity is greater than or equal to entered number
    // "SELECT stock_quantity, item_id FROM products GROUP BY stock_quantity HAVING count(*) > ?";
   var query = "SELECT * FROM products WHERE ?";
    connection.query(query, { item_id: answer.id }, function(err, data) {
       for(var i = 0; i < data.length; i++) {
         
         if(answer.Quantity > data[i].stock_quantity) {
           console.log("Insufficient Quantity");
           start();
         } 
        else
        {
     
      var newStock = data[i].stock_quantity - answer.Quantity;
      var newSale = data[i].product_sales + (data[i].price * answer.Quantity);
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newStock,
            product_sales: newSale
          },
          {
            item_id: answer.id,
            item_id: answer.id
          }
        ],
    
        function(error) {
          if (error) throw err;
         
          console.log("Successfully purchased " + answer.Quantity);
          console.table(data);
          start();
        }
        
      ); 
      } 
       }
    });
});
}



