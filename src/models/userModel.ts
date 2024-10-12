import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface IUser extends Document {
  confirmPassword?: string;
  createdAt: Date;
  firstName: string;
  password: string;
  lastName: string;
  email: string;
}

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Kindly provide your email address"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Kindly provide a valid Email Address",
    },
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
    select: false,
    minLength: [8, `minimum required length is ({MINLENGTH})`],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm provided password"],
    validate: {
      validator: function (this: IUser, value: string) {
        return value === this.password;
      },
      message: "Password doesn't match",
    },
    minLength: [8, `minimum required length is ({MINLENGTH})`],
  },
  firstName: String,
  lastName: String,
  image: String,
  createdAt: Date,
});

userSchema.pre("save", async function (this: IUser, next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

userSchema.pre("save", async function (this: IUser, next) {
  if (!this.isNew) return next();

  this.createdAt = new Date();
  next();
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  userPassword: string
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
