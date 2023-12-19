import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$%^&*])[A-Za-z\d!$%^&*]{8,}$/;

// Validator function for the password
const passwordValidator = (password) => {
  return passwordRegex.test(password);
};

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: {
    type: String, required: true,
    validate: {
      validator: passwordValidator,
      message: 'Password does not meet the complexity requirements.'
    }
  },
  // Add the favorites field as an array of ObjectIds referencing 'Movie'
  favorites: [{ type: String }]
});

UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
};

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified
  if (this.isModified('password')) {
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next(); // If password hasn't changed, move to the next middleware
  }
});


export default mongoose.model('User', UserSchema);
