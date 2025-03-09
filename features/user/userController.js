import UserRepository from "./userRepo.js";
import {
  hashPassword,
  conmpareHashPassword,
} from "../passwordhashing/hashPass.js";
import getJWTToken from "../passwordhashing/jwtToken.js";
import sendWelcomeMail from "../nodemail/nodemail.js";
import generateOtp from "../passwordhashing/generateOtp.js";
import sendOtp from "../nodemail/sendOtp.js";
let userRepository = new UserRepository();

export default class UserController {
  constructor() {
    this.body = null;
    this.OTP = null;
    this.email = null;
  }

  async signUp(req, res) {
    try {
      //store body in class(this.body)
      this.body = req.body;

      //generate OTP and store in class(this.OTP)
      this.OTP = generateOtp();

      setTimeout(() => {
        this.OTP = null;
        this.body = null;
        this.email = null;
      }, 1000 * 60 * 10);

      //Send OTP to User for Email confirmation
      await sendOtp(req.body.email, this.OTP);

      res
        .status(200)
        .send({ success: true, msg: "OTP sent to your Registered mail Id " });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        success: false,
        msg: "Something Went wrong pleasetry again later",
      });
    }
  }

  async signUpOtp(req, res) {
    try {
      //get OTP from body
      let { OTP } = req.body;
      let otp = parseInt(OTP);
      //check OTP
      if (otp === this.OTP) {
        let hashedPassword;
        if (this.body.password) {
          hashedPassword = await hashPassword(this.body.password);
        }
        //add User in database
        let addUser = await userRepository.signUp({
          ...this.body,
          password: hashedPassword,
        });

        //send Welcome Email
        await sendWelcomeMail(this.body);

        res.status(201).send({
          success: true,
          msg: "Congratulations! registration successful",
          user: addUser,
        });
      } else {
        res.status(400).send({ success: false, msg: "Incorrect OTP" });
      }
    } catch (err) {
      //  handle error for duplicate email
      console.log(err);
      if (err.code == 11000) {
        return res.status(400).send({
          success: false,
          msg: "Email Id Already Registered please login",
        });
      }
      res.status(400).send({ success: false, msg: err.message });
    }
  }

  async signIn(req, res) {
    try {
      let { email, password } = req.body;

      //get userdata from database
      let userdata = await userRepository.checkUserByEmail(email);
      if (userdata) {
        let comparePassword = await conmpareHashPassword(
          password,
          userdata.password
        );
        if (!comparePassword) {
          return res
            .status(400)
            .send({ success: false, msg: "Incorrect Credential" });
        } else {
          //create JWT Token
          let token = getJWTToken(userdata._id);
          return res.send({ success: true, userdata, token });
        }
      }
      res
        .status(400)
        .send({ success: false, msg: "user does not exist please register" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ success: false, msg: "Something went wrong" });
    }
  }

  async changPassword(req, res) {
    try {
      let newPassword = req.body.newPassword;
      let newHashedPassword = await hashPassword(newPassword);

      //update password in DB
      let changedUser = await userRepository.changePassword(
        req.user._id,
        newHashedPassword
      );

      res
        .status(200)
        .send({ success: true, msg: "Password changed successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        msg: "Something went wrong please try again later",
      });
    }
  }

  async forgetPassword(req, res) {
    try {
      let email = req.body.email;
      let user = await userRepository.checkUserByEmail(email);
      if (user) {
        //send OTP to registered mailId
        this.OTP = generateOtp();
        this.email = email;
        await sendOtp(email, this.OTP);
        setTimeout(() => {
          this.OTP = null;
          this.email = null;
        }, 1000 * 60 * 10);

        res.status(200).send({
          success: true,
          msg: "varification OTP sent to your registered mail Id",
        });
      } else {
        res.status(400).send({
          success: false,
          msg: "User does not exist",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        msg: "Something went wrong please try again later",
      });
    }
  }

  async forgetPasswordOtp(req, res) {
    try {
      let { OTP, password } = req.body;
      let otp = parseInt(OTP);
      //check OTP
      if (otp === this.OTP) {
        //hash password
        let hashedPassword;
        if (password) {
          hashedPassword = await hashPassword(password);
        }
        //change password
        await userRepository.changePasswordByMail(this.email, hashedPassword);
        res
          .status(200)
          .send({ success: true, msg: "Password changed successfully" });
      } else {
        res.status(400).send({ success: false, msg: "Incorrect OTP" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        msg: "Something went wrong please try again later",
      });
    }
  }
}
