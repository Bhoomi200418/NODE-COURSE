import { Router } from "express";
import { UserController } from "../controllers/UserController";
// import { body, validationResult } from 'express-validator';
import { UserValidators } from "../validators/UserValidators";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();

    }

    getRoutes() {
        this.router.get('/send/verification/email', UserValidators.verifyUserForResendEmail(), UserController.resendVerificationEmail);
    }
       

    postRoutes() {
        this.router.post('/signup', UserValidators.signup(),GlobalMiddleWare.checkError, UserController.signup);
    }

    patchRoutes() {
        this.router.patch('/verify', UserValidators.verifyUserEmail(),GlobalMiddleWare.checkError, UserController.verify);
    }

    putRoutes() {}

    deleteRoutes() {}    
}

export default new UserRouter().router


// This code defines an Express Router for handling routes related to user operations in a Node.js application
// The router object is initialized and specific routes are defined in separate methods (getRoutes, postRoutes)
