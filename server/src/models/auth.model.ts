import { Schema, model, type Model, type HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name?: string;
  email: string;
  avatar?: string;
  authProvider: "local" | "google";
  password?: string;
  mobile?: number;
  refreshToken?: string;
}

export interface IUserMethods {
  comparePassword(password: string): boolean;
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

export type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  avatar: {
    type: String,
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  password: {
    type: String,
    required: function (this: IUser) {
      return this.authProvider === "local";
    },
  },

  mobile: {
    type: Number,
    required: function (this: IUser) {
      return this.authProvider === "local";
    },
  },

  refreshToken: {
    type: String,
  },
});

userSchema.pre("save", function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (password: string): boolean {
  if (!this.password) return false;
  return bcrypt.compareSync(password, this.password);
};

const userModel = model<IUser, UserModel>("userModel", userSchema);

export default userModel;
