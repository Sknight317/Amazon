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

  // Function to start the bamazon app
  function start() {
    // Using inquirer to ask the user a question
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
        // stop if it's not a number
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
  // DOne after asking the user questions
  .then(function(answer) {
    // Check to see if stock quantity is greater than or equal to entered number
   // Creating a query with mysql; select from prodcuts table
   var query = "SELECT * FROM products WHERE ?";
   // Passing in the item id number that the user entered
    connection.query(query, { item_id: answer.id }, function(err, data) {
      //For loop to loop through the data
       for(var i = 0; i < data.length; i++) {
         // If the user's answer for the quantity is greater than the quantitiy in the database
         if(answer.Quantity > data[i].stock_quantity) {
           console.log("Insufficient Quantity");
           start();
         } else {
      // Fucntion to update the mysql database and process the order
      
        // Creating a variable to the newstock; stock quantitiy in database - the user's entered stock
      var newStock = data[i].stock_quantity - answer.Quantity;
      // Variable for the newsale; sale in database + the price of the product multiplied by the user's entered quantitiy
      var newSale = data[i].product_sales + (data[i].price * answer.Quantity);
      //Logging the customers new total and rounding it to 2 decimal places
      console.log("Your total is: $" + (data[i].price * answer.Quantity).toFixed(2));
      connection.query(
        //Updating the products table in mysql
        "UPDATE products SET ? WHERE ?",
        [
          {
            //Updating the stock qauntity to the new stock and the prouct sales to the newsale amount
            stock_quantity: newStock,
            product_sales: newSale
          },
          {
            //Using the id number that the user types in
            item_id: answer.id,
            item_id: answer.id
          }
        ],
    
        function(error) {
          if (error) throw err;
          console.log("Successfully purchased " + answer.Quantity + "."+ "\n");
          // Calling the function to log to table and restart the app
          afterConnection();   
        } 
      );
     
      } 
       }
    });
});
}




