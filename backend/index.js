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
    res.send('Welcome, you are now connected to the server')
});

//LookUpTableReturns

//This will return all the possible medicines you can prescribe
app.get('/AllMedicines/', (req,res) => {

    connection.query(`SELECT * FROM Clinic_Main.Prescription_LookUp;`,(err, results) => {
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

 //This will return all the states 
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

//This will return the sexes
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

 //This will return the roles -> Doctor(1), Patient(2), Administrator(3)
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

 //This will return all the races
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

 //This will return all the Facilities
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

  // This will return All the weekdays (Monday - Friday)
  app.get('/Weekday', (req,res) => {
    connection.query(`SELECT * FROM Clinic_Main.Weekday_LookUp;`,(err, results) => {
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

 //Parameter Based Queries

 //Facility and Doctor should be -1 if you want all 
 app.get('/FacilityAppointmentReport/:FacilityID/:MinDate/:MaxDate', (req,res) => {
    const {FacilityID, MinDate,MaxDate} = req.params;
    if(MinDate==="null"){
        connection.query(`call Clinic_Main.FacilitiesReport(${FacilityID}, NULL,NULL);`,(err, results) => {
            if(err) {
                return res.send(err)
            }
            else {
                return res.json({
                    data: results[0]
                })
            }
        });
    }
    else{
        connection.query(`call Clinic_Main.FacilitiesReport(${FacilityID},'${MinDate}','${MaxDate}');`,(err, results) => {
            if(err) {
                return res.send(err)
            }
            else {
                return res.json({
                    data: results[0]
                })
            }
        });
    }
    
});

app.get('/DoctorReport/:Doctor/:MinDate/:MaxDate', (req,res) => {
    const {Doctor, MinDate,MaxDate} = req.params;
    if(MinDate==="null"){
        connection.query(`call Clinic_Main.DoctorsReport(${Doctor}, NULL,NULL);`,(err, results) => {
            if(err) {
                return res.send(err)
            }
            else {
                return res.json({
                    data: results[0]
                })
            }
        });
    }
    else{
        connection.query(`call Clinic_Main.DoctorsReport(${Doctor},'${MinDate}','${MaxDate}');`,(err, results) => {
            if(err) {
                return res.send(err)
            }
            else {
                return res.json({
                    data: results[0]
                })
            }
        });
    }
});

 //This will return the username and password of a given username if it exists
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
 app.get('/insurance/:PatientID', (req,res) => {
    const PatientID = req.params.PatientID;
    connection.query(`SELECT * FROM Clinic_Main.Insurance WHERE PatientID='${PatientID}'`,(err, results) => {
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
 app.get('/AllInsurance', (req,res) => {
    connection.query(`SELECT * FROM Clinic_Main.Insurance;`,(err, results) => {
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
 app.get('/CheckUp', (req,res) => {
    connection.query(`SELECT * FROM Clinic_Main.CheckUpPatients;`,(err, results) => {
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
   // Gets specified Employee WorkSchedule
app.get('/WorkSchdule/:userID', (req,res) => {
    const userID = req.params.userID;
    connection.query(`CALL GetEmployeeWorkSchedule(${userID});`,(err, results) => {
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

 // Remove specified day from employee WorkSchedule
 app.post('/RemoveWorkScheduleDay', (req,res) => {
    const { RemoveDayID, EmployeeID}  =   req.body;
    connection.query(`CALL DeleteDayFromWorkSchedule(
        '${EmployeeID}', 
        '${RemoveDayID}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.send("Employee Day Removed")
        }
    }); 
 });

 // Update specified WorkSchedule day to new facility
 app.post('/UpdateWorkScheduleDay', (req,res) => {
    const { UpdateDayID, EmployeeID, NewFacilityID}  =   req.body;
    connection.query(`CALL UpdateDayFromWorkSchedule(
        '${EmployeeID}', 
        '${UpdateDayID}',
        '${NewFacilityID}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.send("Employee Day Updated")
        }
    }); 
 });

 // Add new WorkSchedule day to a specified employee
 app.post('/AddNewWorkSchedule', (req,res) => {
    const { DayID, EmployeeID, FacilityID}  =   req.body;
    connection.query(`CALL AddNewWorkScheduleDay(
        '${EmployeeID}', 
        '${DayID}',
        '${FacilityID}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.send("Employee Day Added")
        }
    }); 
 });

 app.get('/Employee/:LoginTableID', (req,res) => {
    const LoginID = req.params.LoginTableID;
    connection.query(`  SELECT * FROM Clinic_Main.EmployeeInfoWithLogin WHERE EmployeeLoginID='${LoginID}';`,(err, results) => {
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

 app.get('/AppUpdate', (req,res) => {
    const LoginID = req.params.LoginTableID;
    connection.query(`UPDATE Clinic_Main.Appointment SET StatusID=1 WHERE AppointmentDate<CURDATE();`,(err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send("Updated Appointment Status")
        }
    });
 
 });

 //Update medical history
 app.post('/UpdateMedicalHistory', (req,res) => {
    const { patientID,lastUpdatedBy, immunizationRecord, allergies,
        procedureRecord, medicalCondition}  =   req.body;
    connection.query(`CALL UpdateMedicalHistory(
        '${patientID}',
        '${lastUpdatedBy}',
        '${immunizationRecord}',
        '${allergies}',
        '${procedureRecord}',
        '${medicalCondition}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.send("Medical Record Updated")
        }
    }); 
 });

//Get Medical History
 app.get('/GetMedicalHistory/:userID', (req,res) => {
    const userID = req.params.userID;
    connection.query(`CALL GetMedicalHistory(${userID});`,(err, results) => {
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
//Get Medical HistoryLog
app.get('/GetMedicalHistoryLog/:PatientID', (req,res) => {
    const PatientID = req.params.PatientID;
    connection.query(`CALL GetMedicalHistoryLog(${PatientID});`,(err, results) => {
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

 app.get('/Patient/:LoginTableID', (req,res) => {
    const LoginID = req.params.LoginTableID;
    connection.query(`SELECT * FROM Clinic_Main.PatientInfoWithLogin WHERE PatientLoginID='${LoginID}';`,(err, results) => {
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

 app.get('/AllDoctors', (req,res) => {
    connection.query(`SELECT * FROM Clinic_Main.Employee WHERE RoleID=1 OR RoleID>=4`,(err, results) => {
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

 app.get('/Doctors/:FacilityID/:Specialist', (req,res) => {
    const FacilityID = req.params.FacilityID;
    var Specialist=true;
    if(req.params.Specialist==="0"){Specialist=false;}
    connection.query(`CALL RetrieveDoctorsWorkingAtFacility(${FacilityID},${Specialist})`,(err, results) => {
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
        '${AppDate}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.send("Added Appointment")
        }
    }); 
 });
 app.get('/Diagnosis/:AppointmentID', (req,res) => {
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
 app.get('/Prescriptions/:AppointmentID', (req,res) => {
    const AppointmentID = req.params.AppointmentID;
    connection.query(`call Clinic_Main.GetPrescription(${AppointmentID})`,(err, results) => {
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

 app.post('/AddPrescription', (req,res) => {
    const { AppointmentID, PrescriptionID, DueDate, Refills}  =   req.body;
    connection.query(`CALL AddAPrescription(
        '${AppointmentID}', 
        '${PrescriptionID}',
        '${DueDate}',
        '${Refills}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.send("Added Prescription")
        }
    }); 
 });
 app.post('/AddDiagnosis', (req,res) => {
    const { AppointmentID, Diagnosis}  =   req.body;
    connection.query(`select Clinic_Main.AddDiagnosis(
        '${AppointmentID}', 
        '${Diagnosis}') as ID;`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    }); 
 });
 app.post('/AddSpecialist', (req,res) => {
    const { AppointmentID, Specialist}  =   req.body;
    connection.query(`call AddSpecialist(
        '${AppointmentID}', 
        '${Specialist}');`,(err, results) => {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        else{
            return res.json("successfully Added Specialist")
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
        '${DateOfBirth}', 
        '${CellNumber}', 
        '${AddressStreet}',
        '${AddressCity}', 
        '${AddressState}', 
        '${AddressZip}',
        '${Email}',
        '${SSN}', 
        '${userType}',
        '${raceID}',
        '${username}', 
        '${password}');`,(err, results) => {
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
            userType, LoginTableID, Deductible, Name, ContactNumber}  =   req.body;
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
        '${LoginTableID}',
        '${Deductible}',
        '${Name}',
        '${ContactNumber}');`,(err, results) => {
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