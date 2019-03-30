const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const selectAllStates = 'SELECT * FROM Clinic_Main.States_LookUp;';

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'coogs123',
    database: 'Clinic_Main'
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
   connection.query('SELECT * FROM Clinic_Main.States_LookUp;',(err, results) => {
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
app.get('/sexes', (req,res) => {
    connection.query('SELECT * FROM Clinic_Main.Sex_LookUp;',(err, results) => {
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
 app.get('/login', (req,res) => {
    connection.query(`SELECT * FROM Clinic_Main.LoginTable WHERE username='${username}'`,(err, results) => {
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