import UserModel from "../models/model.js";
import bcrypt from "bcrypt"; //===========for hash password
import jwt from "jsonwebtoken";
import Usermodel from "../models/model.js";

class UserController {
  /*-----------------------------------------------------
                 User registratin
    -------------------------------------------------------- */
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, term } = req.body; //input from html body just_like form
    const user = await UserModel.findOne({ email: email });
    if (user) {
      //--------------------if user already registered
      res.send({
        status: "failed",
        message: "Email already available",
      });
    } else {
      //----------------------if user already___________NOT_______registered
      if (name && email && password && password_confirmation && term) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(5); // for more storng hashing give high number
            const hashPassword = await bcrypt.hash(password, salt); // for hash password
            const doc = new UserModel({
              //--------------take input from body
              name: name,
              email: email,
              password: hashPassword,
              term: term,
            });
            await doc.save(); //------------------SAVE IN DATABASE
            const saved_user = await Usermodel.findOne({ email: email });
            /*_______________________________________*/

            // GENERATE JWT TOKEN

            const TOKEN = jwt.sign(
              { userID: saved_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.send({
              status: "success",
              message: "registration successfull",
              token: TOKEN,
            });
            /* _________________________________________*/
          } catch (err) {
            console.log(err); //============only for debug help
          }
        } else {
          res.send({
            status: "failed",
            message: "passoword and confirm_pssword not match",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "All field are required",
        });
      }
    }
  };
  /*-----------------------------------------------------
                 User Log_in
    -------------------------------------------------------- */
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body; //take ____email,and password
      if (email && password) {
        //----check user give input or Not
        const user = await UserModel.findOne({ email: email }); //----- match email in database
        if (user != null) {
          //------if user find
          const isMatch = await bcrypt.compare(password, user.password); //----match user password with hash password
          if (user.email === email && isMatch) {
            //----if user email and password ____match
            const TOKEN = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.send({
              status: "success",
              message: "Login success",
              token: TOKEN,
            });
          } else {
            //----if user email and password __________NOT_____match
            res.send({
              status: "failed",
              message: "you are not registered",
            });
          }
        } else {
          //---------if user not find
          res.send({
            status: "failed",
            message: "Email Not registered",
          });
        }
      } else {
        //-------if user not input
        res.send({
          status: "failed",
          message: "All field required",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}
export default UserController;
