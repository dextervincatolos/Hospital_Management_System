const axios = require('axios');
var sysAdmin = require('../model/admin_model');
var physician_collection = require('../model/physician_model');
var patient_collection = require('../model/patient_model');

// Admin------------------------------------------------------------------------------------------------------------------------

exports.admin_login = (req, res) => {
  res.render('admin/admin_login',{title:"HMS | Administrator Login Page"});   
}

exports.admin_dashboard = async (req, res) => {
  try {
      const role = req.session.role;
      const uid = req.session.uid;
      const username = req.session.username;
      const getadminData = await sysAdmin.findById(uid);
    
      if (!getadminData) {
          return res.status(404).send('No record found');
      }
        //fetch patient statuses
        const new_patient = await patient_collection.countDocuments({ status: 'New Patient' });
        const established_patient = await patient_collection.countDocuments({ status: 'Established Patient' });
        const outpatient = await patient_collection.countDocuments({ status: 'Outpatient' });
        const inpatient = await patient_collection.countDocuments({ status: 'Inpatient' });

        // Count the number of on-duty physicians
        const onDutyCount = await physician_collection.countDocuments({ status: 'on-duty' });
        //Count the number of off-duty physicians
        const offDutyCount = await physician_collection.countDocuments({ status: 'off-duty' });
    
      res.render('admin/admin_dashboard', {title:"HMS | Admin Dashboard",username,getadminData,onDutyCount,offDutyCount,new_patient,established_patient,outpatient,inpatient,role});
  } catch (error) {
      return res.status(500).send(error.message);
  }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.getphysicians = (req, res) => {
  const username = req.session.username;
  const physicianId = req.query.id; // Retrieve the id from the query parameter

  if (physicianId) {
    // If an id is provided, fetch the specific physician's record
    axios.get(`http://localhost:3000/api/physician?id=${physicianId}`)
      .then(function(response) {
        res.render('admin/view_physician', { title: "HMS | Physician Info page", username, physicians:response.data });
      })
      .catch(err => {
        res.send(err);
      });
  } 
}


exports.new_physician = (req, res) => {
      res.render('admin/register_physician',{title:"HMS | Physician Registration Page"});   
}

exports.physicians = (req, res) => {
  const username = req.session.username;
  axios.get('http://localhost:3000/api/physician')
  .then(function(response){
      res.render('admin/admin_view_doctors',{title:"HMS | Physicians Page",username,physicians:response.data});
  }).catch(err=>{
      res.send(err);
  }) 
}


exports.update_physician= (req, res) => {
  axios.get('http://localhost:3000/api/physician',{params:{id:req.query.id}}).then(function(physicianData){
      res.render('admin/update_physician',{title:"HMS | Physician Update Page",user:physicianData.data})
  }).catch(err=>{res.send(err);
  })
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

exports.patient = (req, res) => {
  const username = req.session.username;
  axios.get('http://localhost:3000/api/patients')
  .then(function(response){
      res.render('admin/admin_view_patients',{title:"HMS | Patients Page",username,patients:response.data});
  }).catch(err=>{
      res.send(err);
  }) 
}

exports.getpatient = (req, res) => {
  const username = req.session.username;
  const patientid = req.query.id; // Retrieve the id from the query parameter

  if (patientid) {
    // If an id is provided, fetch the specific physician's record
    axios.get(`http://localhost:3000/api/patients?id=${patientid}`)
      .then(function(response) {
        const physicianId = response.data.physician;
        axios.get(`http://localhost:3000/api/physician?id=${physicianId}`)
            .then(function(physicianResponse) {
              res.render('admin/view_patient', { title: "HMS | Patient Info page", username, patient:response.data,physician:physicianResponse.data});
            });
      })
      .catch(err => {
        res.send(err);
      });
  } 
}


exports.new_patient = async (req, res) => {
  try {
    const doctors = await physician_collection.find(); // Fetch all records from the doctor collection
    res.render('admin/register_patient', { title: "HMS | Register Patient", doctors });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

exports.update_patient = (req, res) => {
  axios.get('http://localhost:3000/api/patients', { params: { id: req.query.id } })
    .then(async function (patientData) {
      try {
        const doctors = await axios.get('http://localhost:3000/api/physician'); // Fetch all doctors
        res.render('admin/update_patient', { title: "HMS | Physician Update Page", patient: patientData.data, doctors: doctors.data });
      } catch (error) {
        res.send(error);
      }
    })
    .catch(err => {
      res.send(err);
    });
}

// Physician ------------------------------------------------------------------------------------------------------------------------

exports.physician_login = (req, res) => {
    res.render('physician_login',{title:"HMS | Physician Login Page"});   
}

exports.physician_dashboard = async (req, res) => {
  try {
    const role = req.session.role;
    const pid = req.session.uid;
    const physician = await physician_collection.findById(pid);
    // Find all patients associated with this physician
    const getpatients = await patient_collection.find({ physician: pid });
    res.render('physician_dashboard',{title:"HMS | Physician Dasboard Page",physician,getpatients,role});   
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Patient ------------------------------------------------------------------------------------------------------------------------

exports.patient_login = (req, res) => {
  res.render('patient_login',{title:"HMS | Patient Login Page"});   
}
exports.patient_dashboard = async (req, res) => {
try {
  const role = req.session.role;
  const pid = req.session.uid;
  const patientData = await patient_collection.findById(pid);
  const physician = await physician_collection.findById(patientData.physician);
  res.render('patient_dashboard', { title: "HMS | Patient Dasboard Page", patientData,physician,role });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
}
// Logout----------------------------------------------------------------------------------------------------------------------------

exports.logout =  (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.clearCookie('sid'); // Clear the session cookie
      res.redirect('/'); // Redirect to the login page after logout
    });
  }