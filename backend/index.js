const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());

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
 app.get('/roles', (req,res) => {
    connection.query('SELECT * FROM Clinic_Main.Role_LookUp;',(err, results) => {
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
 app.get('/races', (req,res) => {
    connection.query('SELECT * FROM Clinic_Main.Race_LookUp;',(err, results) => {
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
 app.get('/login/:username', (req,res) => {
    const username = req.params.username;
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
 
 app.get('/Employee/:LoginTableID', (req,res) => {
    const LoginID = req.params.LoginTableID;
    connection.query(`SELECT * FROM Clinic_Main.Employee WHERE EmployeeLoginID='${LoginID}'`,(err, results) => {
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
 app.get('/Patient/:LoginTableID', (req,res) => {
    const LoginID = req.params.LoginTableID;
    connection.query(`SELECT * FROM Clinic_Main.Patient WHERE PatientLoginID='${LoginID}'`,(err, results) => {
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
 app.post('/Patient/registerLogin', (req,res) => {
    const {LoginID, username, password} = req.body;
    connection.query(`INSERT INTO Clinic_Main.LoginTable (LoginTableID, Username, Password) VALUES (${LoginID}, '${username}', '${password}')`,(err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send("added")
        }
    })
 
 });
 app.post('/RegisterUser', (req,res) => {
    const { FirstName, LastName, Sex, Email, username, password, CellNumber, 
            AddressStreet, AddressCity, AddressState, AddressZip, DateOfBirth, 
            SSN, userType, raceID}  =   req.body;
    var loginID=Math.floor(Math.random() *1000);
    var userID=Math.floor(Math.random() *100);
    connection.query(`INSERT INTO Clinic_Main.Employee (EmployeeID, FirstName, LastName, RoleID, SSN, Email, CellNumber, DOB, SexID, EmployeeLoginID, AddressStreet, AddressCity, AddressStateID, AddressZip) VALUES ('${userID}', '${FirstName}', '${LastName}',
             '${userType}', '${SSN}', '${Email}', '${CellNumber}', '${DateOfBirth}', '${Sex}', '${loginID}', '${AddressStreet}', '${AddressCity}', '${AddressState}', '${AddressZip}');`,(err, results) => {
                if(err) {
                    return res.send(err)
                }
                else{
                    console.log("here");
                    return res.send('Added Employee')
                }
            });    
    // connection.query(`INSERT INTO Clinic_Main.LoginTable (LoginTableID, Username, Password) VALUES ('${loginID}', '${username}', '${password}');`,(err, results) => {
    //     if(err) {
    //         return res.send(err)
    //     }
    //     else if(userType===1 || userType===3) {
            
    //         connection.query(`INSERT INTO Clinic_Main.Employee (EmployeeID, FirstName, LastName, RoleID, SSN, Email, CellNumber, DOB, SexID, EmployeeLoginID, AddressStreet, AddressCity, AddressStateID, AddressZip) VALUES ('${userID}', '${FirstName}', '${LastName}',
    //          '${userType}', '${SSN}', '${Email}', '${CellNumber}', '${DateOfBirth}', '${Sex}', '${loginID}', '${AddressStreet}', '${AddressCity}', '${AddressState}', '${AddressZip}');`,(err, results) => {
    //             console.log("hhhd")
    //             if(err) {
    //                 return res.send(err)
    //             }
    //             else{
    //                 return res.send('Added Employee')
    //             }
    //         });    
    //     }
    //     else if(userType===2){
    //         connection.query(`INSERT INTO Clinic_Main.Patient (PatientID, FirstName, LastName, SexID, DOB, CellNumber, AddressStreet, AddressCity, AddressStateID, AddressZip, Email, SSN, PatientLoginID, RaceID) VALUES ('${userID}', '${FirstName}', '${LastName}', '${Sex}',
    //          '${DateOfBirth}', '${CellNumber}', '${AddressStreet}', '${AddressCity}', '${AddressState}', '${AddressZip}', '${Email}', '${SSN}', '${loginID}', '${raceID}');`,(err, results) => {
    //             if(err) {
    //                 return res.send(err)
    //             }
    //             else{
    //                 return res.send('Added Patient')
    //             }
    //         });
    //     }

    // });
 
 });
 
app.listen(4000, () => {
    console.log(`Producs server listening on port 4000`)
});