import User from "../models/User";
import { NodeMailer } from "../utils/NodeMailer";
import { Utils } from "../utils/Utils";
export class UserController {
  static async signup(req, res, next) {
    console.log("req: ", req);
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;
    const status = req.body.status;
    const verification_token = Utils.generateVerificationToken();

    const data = {
      email,
      verification_token,
      verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
      phone,
      password,
      name,
      type,
      status,
    };
    try {
      let user = await new User(data).save();
      // send email to user for verification
      await NodeMailer.sendMail({
        to: [user.email],
        subject: 'Email Verification',
        html:`<h1>Your otp is ${verification_token}</h1>`
      });
      res.send(user);
    } catch (e) {
      next(e);
    }
  }
  static async verify(req, res, next) {
    const verification_token = req.body.email;
    const email = req.body.email;
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
          verification_token: verification_token,
          verification_token_time: { $gt: Date.now() },
        },
        {
          email_varified: true,
        },
        {
          new: true,
        }
      );
      if (user) {
        res.send(user);
      } else {
        throw new Error(
          "Email Verification Token Is Expired. Pless try agin..."
        );
      }
    } catch (e) {
      next(e);
    }
  }
  static async resendVerificationEmail(req, res, next){
   
    const verification_token = Utils.generateVerificationToken();
    const email = req.query.email;
    try {
      const user = await User.findOneAndUpdate(
        { email: email, },
        {
            verification_token: verification_token,
            verification_token_time: Date.now()  + new Utils().MAX_TOKEN_TIME,
        },
      );
      if (user) {
        await NodeMailer.sendMail({
            to: [user.email],
            subject: 'Resend Email Verification ',
            html:`<h1>Your otp is ${verification_token}</h1>`
          });
        res.json({ success: true });
      } else {
        throw new Error('User doesn\'t exist');
             }
    } catch(e) {
        next(e);
    }
  }
}