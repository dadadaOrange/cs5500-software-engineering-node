/**
 * @file Implements mongoose schema for users
 */
import mongoose from "mongoose";
import User from "../../models/users/User";

/**
 * @typedef User Represents users in Tuiter
 * @property {string} username The user's username
 * @property {string} password The user's password
 * @property {string} firstName The user's firstName
 * @property {string} lastName The user's lastName
 * @property {string} email The user's email
 * @property {string} profilePhoto The user's profilePhoto
 * @property {string} headerImage The user's headerImage
 * @property {string} biography The user's biography
 * @property {Date} dateOfBirth The user's dateOfBirth
 * @property {String} accountType The user's accountType
 * @property {String} maritalStatus The user's maritalStatus
 * @property {Location} location The user's location
 */
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    location: {
        latitude: Number,
        longitude: Number
    },
}, {collection: "users"});

export default UserSchema;
