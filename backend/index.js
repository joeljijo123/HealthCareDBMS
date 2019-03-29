const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const selectAllStates = 'SELECT * FROM sys.user;';

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'coogs123',
    database: 'sys'
})

connection.connect(err => {
    if(err) {
        return err;
    }
});


app.use(cors());

app.get('/', (req,res) => {
    res.send('hello from the products server')
});

app.get('/states', (req,res) => {
   connection.query(selectAllStates,(err, results) => {
       if(err) {
           return res.send(err)
       }
       else {
           return res.json({
               data: results
           })
       }
   });

});

app.listen(4000, () => {
    console.log(`Producs server listening on port 4000`)
});