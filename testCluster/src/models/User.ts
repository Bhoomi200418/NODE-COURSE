import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String , required: true},
    email_verified: { type: Boolean, required: true, default: false },
    verification_token: { type: Number , required: true },
    verification_token_time: {type: Date , required: true},
    phone: { type: String , required: true},
    password: { type: String , required: true},
    name:  { type: String , required: true},
    type:  { type: String , required: true},
    status:  { type: String , required: true},
    created_at: { type: Date, required: true, default: new Date()},
    updated_at:  { type: Date, required: true, default: new Date()},
});

export default model('users', userSchema);


// The model function is provided by Mongoose and is used to create a model from a schema.

// A model in Mongoose is a class that interacts with a specific MongoDB collection, allowing you to perform CRUD (Create, Read, Update, Delete) operations