import mongoose, { Schema } from "mongoose";
import transporter from '../config/nodemailer.js'

const userSchema = new mongoose.Schema({
    email:{
        type : String ,
        required :true,
        unique : true
    },
    password:{
        type : String ,
        required :true
    },
    travelHistory :{
        type:Array,
        default:[]
    },
    name:{
        type : String ,
        required :true
    },
    phoneno:{
        type : String ,
        required :true
    }
})



userSchema.post('save',async (doc) => {
    try{
        console.log("DOC",doc);        

          let info = await transporter.sendMail({
            from:'ghumakad@travels.com',
            to:doc.email,
            subject:"Account created sucessfully",
            html:`<html>
                    <body>
                    <h2>Hello, ${doc.name}!</h2>
                    <p>Welcome to Ghumakad Travels , your personal travel assistant powered by AI!</p>
                    <p>We're excited to help you plan your next adventure. To get started, just click the button below to log in:</p>

                    <p>If you didn’t request this login link, please ignore this email or <a href="mailto:support@ghumakad@travels.com">contact support</a> for assistance.</p>
                    
                    <p>Safe travels,</p>
                    <p>The [AI Travel Website Name] Team</p>
                    </body>
                </html>` ,
          })
          console.log("INFO" , info);
          

    }
    catch(err){
        console.error(err);
         
    }
})

// userSchema.post('findOne',async (doc) => {
//     const date = new Date().toLocaleString();
//     if (doc && doc.$skipEmail) {
//         return;
//     }
//     try{
//         console.log("DOC2",doc);        

//           let info = await transporter.sendMail({
//             from:'ghumakad@travels.com',
//             to:doc.email,
//             subject:"Sign in sucessfully",
//             html:`<html>
//                     <body>
//                     <h2>Hello, ${doc.name}!</h2>
//                      <p>We wanted to notify you that your account was just accessed successfully. Below are the details of the login:</p>
//                     <strong>Login Time:${date}</strong>
//                     <p>If this login was not you, please <a href="mailto:support@yourtravelwebsite.com">contact support</a> immediately to secure your account.</p>
                    
//                     <p>Safe travels,</p>
//                     <p>The GhumakadTravels Team</p>
//                     </body>
//                 </html>` ,
//           })
//           console.log("INFO" , info);
          

//     }
//     catch(err){
//         console.error(err);
         
//     }
// })

const User =  mongoose.model('User', userSchema);

export default User ; 

