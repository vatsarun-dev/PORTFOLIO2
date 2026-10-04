import type { Types } from "mongoose";
import userModel, {
  type IUser,
  type UserDocument,
} from "../models/auth.model.js";

export type CreateUserPayload = Partial<IUser> & { email: string };

export default class UserRepo {
  async createUser(payload: CreateUserPayload): Promise<UserDocument> {
    return await userModel.create(payload);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await userModel.findOne({ email });
  }

  async findById(id: string | Types.ObjectId): Promise<UserDocument | null> {
    return await userModel.findById(id);
  }

  async updatePassword(
    id: string | Types.ObjectId,
    password: string,
  ): Promise<UserDocument | null> {
    return await userModel.findByIdAndUpdate(id, { password }, { new: true });
  }
}
