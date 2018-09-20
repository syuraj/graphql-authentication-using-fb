import mongoose, { Schema } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import jsonwebtoken from 'jsonwebtoken';

const UsersSchema = Schema({
    facebookId: String,
    name: String,
    pictureUrl: String
});

UsersSchema.plugin(findOrCreate);


UsersSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jsonwebtoken.sign({
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

UsersSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        token: this.generateJWT(),
    };
};

mongoose.model('Users', UsersSchema);