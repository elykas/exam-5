import mongoose, { model, Schema, Document ,Types} from "mongoose";
import { IClass } from "./teacherModel";
import validator from "validator";

export interface Grade {
  message: string;
  grade: number;
}

export interface IStudent extends Document {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  grades: Grade[];
  class: IClass;
}

const GradeSchema = new Schema<Grade>({
  message: {
    type: String,
    required: [true,"message is required"],
    maxlength: [1000, "Comments cannot exceed 1000 chars"],
    minlength: [1, "comment must not be empty"],
  },
  grade: { type: Number, required: true },
});

const StudentSchema = new Schema<IStudent>({
  fullName: {
    type: String,
    required: [true, "Please add the name"],
    trim: true,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters and numbers"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  grades: [GradeSchema],
  class: { type: Schema.Types.ObjectId, ref: "Class" },
});


export default mongoose.model<IStudent>("Student", StudentSchema);
