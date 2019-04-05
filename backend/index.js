const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

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
    connection.query(`SELECT * FROM Clinic_Main.EmployeeInfoWithLogin WHERE EmployeeLoginID='${LoginID}'`,(err, results) => {
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
    connection.query(`SELECT * FROM Clinic_Main.PatientInfoWithLogin WHERE PatientLoginID='${LoginID}'`,(err, results) => {
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
 app.get('/Facilities', (req,res) => {
    connection.query(`SELECT * FROM Clinic_Main.MedicalOffice`,(err, results) => {
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
 app.get('/Doctors/:FacilityID', (req,res) => {
    const FacilityID = req.params.FacilityID;
    connection.query(`CALL RetrieveDoctorsWorkingAtFacility(${FacilityID})`,(err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results[0]
            })
        }
    });
 });


 app.post('/AppointmentTimes', (req,res) => {
    const { DoctorID, FacilityID, AppDate}  =   req.body;
    connection.query(`CALL FindAvailableAppointmentTimes(
        '${DoctorID}', 
        '${FacilityID}',
        '${AppDate}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.json({
                data: results[0]
            })
        }
    }); 
 });
 app.post('/Appointments', (req,res) => {
    const { UserType, UserID}  =   req.body;
    connection.query(`CALL AppointmentHistory(
        '${UserType}', 
        '${UserID}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.json({
                data: results[0]
            })
        }
    }); 
 });

 app.post('/CancelAppointment', (req,res) => {
    const { AppointmentID }  =   req.body;
    connection.query(`UPDATE Clinic_Main.Appointment SET StatusID = '2' WHERE (idAppointment = '${AppointmentID}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.send("Cancelled Appointment")
        }
    }); 
 });

 app.post('/AddAppointment', (req,res) => {
    const { FacilityID, DoctorID, PatientID, Reason, TimeID, AppDate  }  =   req.body;
    connection.query(`call AddNewAppointment(
        '${FacilityID}',
        '${DoctorID}',
        '${PatientID}',
        '${Reason}',
        '${TimeID}',
        '${AppDate}', );`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.send("Added Appointment")
        }
    }); 
 });
 app.get('/PrescriptionAndDiagnosis/:AppointmentID', (req,res) => {
    const AppointmentID = req.params.AppointmentID;
    connection.query(`call Clinic_Main.GetDiagnosis(${AppointmentID})`,(err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results[0]
            })
        }
    });
 
 });
app.post('/RegisterUser', (req,res) => {
    const { FirstName, LastName, Sex, Email, username, password, CellNumber, 
            AddressStreet, AddressCity, AddressState, AddressZip, DateOfBirth, 
            SSN, userType, raceID}  =   req.body;
    connection.query(`CALL RegisterANewUser(
        '${FirstName}', 
        '${LastName}',
        '${Sex}', 
        '${Email}', 
        '${username}', 
        '${password}', 
        '${CellNumber}', 
        '${AddressStreet}',
        '${AddressCity}', 
        '${AddressState}', 
        '${AddressZip}',
        '${DateOfBirth}', 
        '${SSN}', 
        '${userType}',
        '${raceID}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.send('Added User')
        }
    }); 
 });
 app.post('/UpdateUser', (req,res) => {
    const { UserID, InsuranceID, FirstName, LastName, Sex, Email, username, password, CellNumber, 
            AddressStreet, AddressCity, AddressState, AddressZip,
            userType, LoginTableID}  =   req.body;
    connection.query(`CALL UpdateUser(
        '${UserID}',
        '${InsuranceID}',
        '${FirstName}', 
        '${LastName}',
        '${Sex}', 
        '${Email}', 
        '${username}', 
        '${password}', 
        '${CellNumber}', 
        '${AddressStreet}',
        '${AddressCity}', 
        '${AddressState}', 
        '${AddressZip}',
        '${userType}',
        '${LoginTableID}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.send('Updated User')
        }
    }); 
 });
app.listen(4000, () => {
    console.log(`Producs server listening on port 4000`)
});