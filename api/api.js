const sql = require('./BDConfig')
const express = require("express");
const cors = require('cors');
const app = express();
const server = require("http").createServer(app);
var corsOptions = {
    origin:'*', 
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use(express.json())

app.use("/create",(req, res) => {

    return new Promise((resolve, reject) => {
        sql.connection.query('CALL create_search("'+ req.body.cidade +'")', function(err, results) {
          if (err) {
            reject(err);
        }
          resolve(results);
        });       
    
    });

})

app.use("/top",(req, res) => {

    sql.connection.query('CALL top_searched()', (err, results) => {
        res.json(results)
      })

})

app.use("/busca",(req, res) => {

    sql.connection.query('CALL last_searched()', (err, results) => {
        res.json(results)
      })

})

server.listen(1000);
