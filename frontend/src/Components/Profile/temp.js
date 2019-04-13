//Update medical history
 app.post('/UpdateMedicalHistory', (req,res) => {
    const { patientID, createdAt, lastUpdatedAt, createdByEmployeeID,
         lastUpdatedBy, immunizationRecord, allergies,
        procedureRecord, medicalCondition}  =   req.body;
    connection.query(`CALL GetMedicalHistory'(
        '${patientID}',
        '${createdAt}',
        '${lastUpdatedAt}',
        '${createdByEmployeeID}',
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
                data: results
            })
        }
    });
});
