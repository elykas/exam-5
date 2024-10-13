import mongoose, { model,Schema,Document,Types } from "mongoose";
import validator from "validator";


export interface IClass extends Document{
    _id:Types.ObjectId,
    className:string,
    teacher:Types.ObjectId,
    students:Types.ObjectId[];
}


export interface ITeacher extends Document {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    class: IClass;
  }


  const ClassSchema = new Schema<IClass>({
    className:{
        type:String,
        required: [true, "className is required"],

    },
    teacher:{
        type:Schema.Types.ObjectId,
        required:[true,"teacher is required"],ref:"Student"
    },
    students:[{
        type:Schema.Types.ObjectId,ref: "Student"
    }]
  })

  const TeacherSchema = new Schema<ITeacher>({
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
    class: { type: Schema.Types.ObjectId, ref: "Class" },
  });
  export default mongoose.model<ITeacher>("Teacher", TeacherSchema);
  export const Class = mongoose.model<IClass>("Class", ClassSchema);