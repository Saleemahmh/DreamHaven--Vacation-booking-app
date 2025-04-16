const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const User = require('../models/User')

/* Configuration Multer for file upload */

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, "public/uploads/") //Store uploaded files in the 'uploads' folder
    },
    filename: function(req,file,cb){
        cb(null, file.originalname) //use same name as the file name
    }
})

const upload = multer({storage})


/*user register */

router.post("/register", upload.single('profileImage'),async(req,res) => {
    try{
        /* Take all information from the form */
        const {firstName,lastName,email,password} = req.body;
        /* the uploaded file is available as req.file */

        const profileImage = req.file
        if(!profileImage){
            return res.status(400).send("no file uplaoded")
        }

        /*path to the uploaded profile photo*/

        const profileImagePath = profileImage.path

        /*check if user exists*/

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message:"User already exists!"})
        }
        /* hash the password */

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)

        /*create a new user */

        const newUser  = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            profileImagePath,
        });

        /* save the new user */

        await newUser.save()
        /* send success if the process is successful */
        
        res.status(200).json({message: "User is registered successfully",user: newUser})
    }catch (err){
        console.log(err)
        res.status(500).json({message: "Registeration failed!!!!",error: err.message})
    }
})

/* User Login */

router.post("/login", async(req,res) =>{
    try{
    /*take the information from the form*/
const {email,password} = req.body
/* check both data with registered data*/
const user = await User.findOne({email})
if(!user){
    return res.status(409).json({message:"User doesn't exists!"})
}
/* compare the password with hash password*/

const isMatch = await bcrypt.compare(password, user.password)
if (!isMatch){
    return res.status(400).json({message:"Invalid Credentials"})
}
/* Generate Jwt token */
const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
delete user.password

res.status(200).json({token,user})
}catch(err){
    console.log(err)
    res.status(500).json({error: err.message})
}
})

module.exports  = router