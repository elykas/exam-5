import bcrypt from "bcrypt";
import Teacher from "../models/teacherModel";
import Student from "../models/studentModel";



export const loginUser = async (email: string, password: string) => {
  let user = await Student.findOne({ email });
  let userType = "student"; 

  if (!user) {
    user = await Teacher.findOne({ email });
    userType = "teacher"; 
  }

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return { user, userType };
};
