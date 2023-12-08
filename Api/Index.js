const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./userSchema');
const Company = require('./Schemas/CompanySchema');
const Cors = require('cors');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser'); //12/6 Two packages added to handle emails


const jwt_secret_key = process.env.SECRET_KEY;




const app = express();
app.use(express.json());
app.use(Cors({
    origin: 'http://localhost:5173',
    credentials:true
}));

// Middleware to parse JSON and url-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





//cookie parser to parse cookies from the request headers
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.get('/test', (req, res) => {
  res.send('Hello World!');
});


//Connecting the MONGODB database 

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log('MongoDB connected');

    

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDB();

async function validatePassowrd(password, hashedPassword){
    if(await bcrypt.compare(password, hashedPassword)){
        return true;
    }
    else{
        return false;
    }
}



app.post('/login', async (req, res) => {

    try{
        const {userName, password} = req.body;
        const foundUser = await User.findOne({userName})
        if(foundUser){
            if(foundUser.password === password){

                jwt.sign({

                    userID: foundUser._id,
                    userName: foundUser.userName, 
                    foundUser: foundUser,
                    role: foundUser.role,


                },jwt_secret_key,{
                    expiresIn: 1200,
                },(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token,{sameSite:'none',secure:true}).status(201).json({
                        id: foundUser._id,
                        userName: foundUser.userName,
                        role: foundUser.role,
                        Token :token
                    })
                    
                })

                
               
                
            }
            else{
                res.status(401).json({message:"Invalid credentials"});
            }
        }
        else{
            res.status(401).json({message:"User not found"});
        }
    }
    catch(error){
        console.log(error);
    }
}
);



//function to authenticate JWT tokens of the HTTP requests from the user
const authenticateToken = (req, res, next) => {
    
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized: Token missing' });
  
    jwt.verify(token, jwt_secret_key, (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' });
      req.user = {
        userId : user.userID,
        userName : user.userName

      };
      next();
    });
   
  };

// Admin endpoint to get the data for the dashboard
app.get ('/admin', authenticateToken, async(req, res) => {
   
    let userID = "";
    let userName = "";
   try{

    userID = req.user.userId;
    userName = req.user.userName;
    
    userID = String(userID).slice(0,4);
    

    
    
    const etCount = await User.countDocuments({role:"Student", department:"ET"});
    const bstCount = await User.countDocuments({role:"Student", department:"BST"});
    const ictCount = await User.countDocuments({role:"Student", department:"ICT"});
    const sentLetters = await User.countDocuments({role:"Student", lett_Status:"sent"});
    const pendingLetters = await User.countDocuments({role:"Student", lett_Status:"not_sent"});

    const active_internships = await User.countDocuments({role:"Student", intern_Status:"active"})
    const  pending_internships = await User.countDocuments({role:"Student", intern_Status:"pending"})
    const  rejected_interships = await User.countDocuments({role:"Student", intern_Status:"rejected"})
    const  without_interships = await User.countDocuments({role:"Student", intern_Status:"no_Intern"})


    //object of the above data
    const responseData = {
        etCount,
        bstCount,
        ictCount,
        sentLetters,
        pendingLetters,
        userID,
        userName,
        active_internships,
        pending_internships,
        rejected_interships,
        without_interships,
    }


    res.json(responseData);
   }catch(error){
       res.status(500).send("This is the error message  ")
   }
   
   
   
   
    
});


//Admin endpoint to get the data for the student list
app.get('/admin/Students',authenticateToken, async(req,res)=>{

    try{
        
        const students = await User.find({role:"Student"},'userName email');
        res.send(students);
    }catch(error){
        res.status(500).send("Internal Server Error")
    }

    
})

//Function to hash the password before saving to the database
async function hashPassword(password){
    const salt_rounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt_rounds);
    return hashedPassword;
};



//Admin endpoint to add a new student
app.post('/admin/Students/Insert',authenticateToken, async(req,res)=>{
    
    const result = await insertUser(req.body);
    if(result){
        res.status(201).send("Student Added Successfully");
    }
    else{
        res.status(500).send("Internal Server Error")
    }
});

//admin endpoint to get data for coordinators
app.get('/admin/Coordinators',authenticateToken, async(req,res)=>{

    try{
        const coordinators = await User.find({ role: { $regex: /admin/i } },'userName email');
        res.send(coordinators);
    }catch(error){
        res.status(500).send("Internal Server Error")
    }

    
})

// admin expoint to insert a new coordinator
app.post('/admin/Coordinators/Insert',authenticateToken, async(req,res)=>{

    const newCoordinatorData = req.body;
    

    const result = await insertUser(newCoordinatorData);
    if(result){
        res.status(201).send("Coordinator Added Successfully");
    }
    else{
        res.status(500).send("Internal Server Error")
    }

});


//admin endpoint to get data for companies
app.get('/admin/Companies',authenticateToken, async(req,res)=>{

    try{
        const companies = await Company.find({});
        res.send(companies);
    }catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
});

//admin endpoint to insert a new company

//admin endpoint to get data for companies
app.get('/admin/Companies',authenticateToken, async(req,res)=>{

    try{
        const companies = await Company.find({});
        res.send(companies);
    }catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
});

//admin endpoint to insert a new company
app.post('/admin/Company/Insert',authenticateToken, async(req,res)=>{

    const {userName, indexNo, password, role, email, contactNo} = req.body;
    const hashedPassword = await hashPassword(password);
    
    try{
        const newCompany = new User({
            indexNo:indexNo,
            userName:userName,
            password: password,
            role:role,
            email:email,
            contactNo:contactNo,
            
        });
        await newCompany.save();
        res.status(201).send("Company Added Successfully");
    }catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error);
    }

    try{
        const newCompany = new Company({
            indexNo:indexNo,
            userName:userName,
            vacancies:[],
        });
        await newCompany.save();

    }catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error);
    }

})



//function to insert a user to the database
async function insertUser(reqdata){

    const {indexNo, userName, password, role, department, batch, email} = reqdata;
    
    
    
    try{
        const hashedPassword = await hashPassword(password);
        
        const newUser = new User({
            indexNo:indexNo,
            userName:userName,
            password: password,
            role:role,
            department:department,
            batch:batch,
            email:email,
            
        });
        await newUser.save();
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
    

}

//endpoint to fetch data for a single student
app.get('/admin/Students/:id',authenticateToken, async(req,res)=>{
    const name = req.params.id;
    try{
        const student = await User.findOne({userName:name});
        res.send(student);
    }catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
});

//endpoint for student's profile
app.get('/student/:userName',authenticateToken, async(req,res)=>{

    const name = req.params.userName;
    try{
        const student = await User.findOne({userName:name});
        res.send(student);
    }catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
});


//endpoint to retrive vacancy details data for a company
app.get('/company/:userName',authenticateToken, async(req,res)=>{
    const name = req.params.userName;
    try{
        const company = await Company.findOne({userName:name});
        if(!company){
            res.status(404).send("Company Not Found");
        }
        res.send(company);
        

    }catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
});

//endpoint to insert a new vacancy
app.post('/company/:userName',authenticateToken, async(req,res)=>{
    const name = req.params.userName;
    const vacancy = req.body.vacancies;
    try{
        const company = await Company.findOne({userName:name});
        if(!company){
            res.status(404).send("Company Not Found");
        }
        company.vacancies.push(vacancy);
        await company.save();
        res.status(201).send("Vacancy Added Successfully");
        

    }catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
});

//endpoint to get Vacancies in the Student Component
app.get('/admin/student/vacancies',authenticateToken, async(req,res)=>{
    try{
        const companies = await Company.find();
        res.send(companies);
    }catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
});


app.post('/sendEmail', authenticateToken, async(req, res) => {
    
    try{
        const selected_Vacancies = req.body.selected_Vacancies;
        console.log(selected_Vacancies[2][1]);

        const transporter = nodeMailer.createTransport({
            service:'gmail',
            auth:{
                user:'testims481@gmail.com',
                pass:'iehzryzxsodkoqer'
            }
        });

        const mailOptions = {
            from:'testims481@gmail.com',
            to:'pharshana719@gmail.com',
            subject:"Selected Vacancies",
            text:`Selected Vacancies: ${selected_Vacancies}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(info);
        res.status(201).send("Email Sent Successfully");


    }catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error);
    }

});













app.listen(port, () => {
  console.log(`Server is  listening at http://localhost:${port}`);
});


//username - harshanaprabhathsemasinghe
//password - 4xuwRkl87QqfjdHV


/*
Gmail data - 
        account - testims481@gmail.com
        passowrd - iehz ryzx sodk oqer
*/