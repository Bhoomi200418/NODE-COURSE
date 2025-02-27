import * as dotenv from "dotenv";

export class Utils {

    public MAX_TOKEN_TIME =  (5 * 60 *1000);

    static generateVerificationToken(digit: number = 6) {
        const digits = '0123456789';
        let otp = '';
        for(let i = 0; i < digit; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return parseInt(otp);
        }
        static dotenvConfigs() {
            dotenv.config({ path: ".env" });
          }  
}

// The util s class provided contains a utility method for generating a numeric verification token and a property for defining the maximum token validity time.