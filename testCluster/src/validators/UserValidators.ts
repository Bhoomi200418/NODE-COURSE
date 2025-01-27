import { body, query } from "express-validator";
import User from "../models/User";
import { nextTick } from "process";
// import { query } from "express";

export class UserValidators {

  static signup() {
    return [
      body('name', 'Name is required').isString(),
      body('phone', 'PhoneNumber is required').isString(),
      body('email', 'Email is required').isEmail()
      .custom((email, {req})=> {
        return User.findOne({
          email: email,
          // type: 'user'
        }).then(user => {
          if (user) {
            
            // throw new Error('User Already Exist');
            throw ('User Already Exist');
            } else {
              return true;
            }
        }).catch(e => {
            throw new Error(e);
        })
       
      }),
      body('password', 'Password is required').isAlphanumeric()
        .isLength({ min: 8, max: 25 })
        .withMessage('Password must be between 8-20 characters'),
      body('type', 'User role type is required').isString(),
      body('status', 'User status is required').isString(),

    ]

  }

  static verifyUserEmail() {
    return [
      body('verification_token', 'Email verification token is required').isNumeric(),
      // body('phone', 'PhoneNumber is required').isString(),
      body('email', 'Email is required').isEmail(),
      // body('password', 'Password is required').isAlphanumeric()
      //   .isLength({ min: 8, max: 25 })
      //   .withMessage('Password must be between 8-20 characters'),
      // body('type', 'User role type is required').isString(),
      // body('status', 'User status is required').isString(),

    ]

  } 

  static verifyUserForResendEmail() {
      return [query('email', 'Email is required').isEmail(),];
  }












      // .custom((value,  {req}) => {
      //     if(req.body.email) return true;
      //     else {
      //         throw new Error('Email is not available for validation');
      //     }
      // } ),
 
}

// UserValidators.signup(): Validation rules for signing up a new user
