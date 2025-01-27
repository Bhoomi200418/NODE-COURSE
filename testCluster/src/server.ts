import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { getEnvironmentVariable } from './environments/environment';
import UserRouter from './routers/UserRouter';
import * as bodyParser from 'body-parser';


export class Server {

    public app: express.Application = express();

    constructor(){
        this.setConfigs();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigs() {
        this.connectMongoDB();
        this.allowCors();
        this.configureBodyParser();
        
        }
    connectMongoDB() {
    
    mongoose.connect(getEnvironmentVariable().db_uri)
    .then(() => {
        console.log('connected to mongodb. ');
    });

        }

        configureBodyParser(){
            this.app.use(bodyParser.urlencoded({
                extended: true
            }));
            // this.app.use(bodyParser.json());
        }

        allowCors() {
            this.app.use(cors());
        }

    setRoutes() { this.app.use('/api/user', UserRouter); }

    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            });
        });
    }
    handleErrors() {
        this.app.use((error,req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(404).json({
                message: error.message ||'Somethings went wrong. Please try again!',
                status_code: errorStatus
            });
        });
    }
    }


