import mongoose, { Schema } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import jsonwebtoken from 'jsonwebtoken';

const UserSchema = Schema({
    facebookId: String,
    name: String,
    pictureUrl: String
});

UserSchema.plugin(findOrCreate);


UserSchema.methods.generateJWT = function generateJWT () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jsonwebtoken.sign({
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

UserSchema.methods.toAuthJSON = function toAuthJSON () {
    return {
        _id: this._id,
        token: this.generateJWT(),
    };
};

const User = mongoose.model('Users', UserSchema);

export default {
    User
};
