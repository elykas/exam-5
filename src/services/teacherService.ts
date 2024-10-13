import bcrypt from "bcrypt";
import Teacher ,{Class,ITeacher,IClass} from "../models/teacherModel";



export const createTeacherService = async (userData: any) => {
  try {
    const hashedPassword = bcrypt.hashSync(userData.password, 10);

    const isExistClass: IClass | null = await Class.findOne({ className: userData.class });
    if (isExistClass) {
      return { message: "Class already exists" };
    }

    const isExistTeacher: ITeacher | null = await Teacher.findOne({ email: userData.email });
    if (isExistTeacher) {
      return { message: "Teacher with this email already exists" };
    }

    const newClass: IClass = await Class.create({
      className:userData.class}
    );

    const newTeacher: ITeacher = await Teacher.create({
      fullName: userData.fullName,
      email: userData.email,
      password: hashedPassword,
      class: newClass._id, 
    });

    newClass.teacher = newTeacher._id;
    await newClass.save();

    return { class: newClass._id };
  } catch (error) {
    throw new Error("Unable to create teacher and class");
  }
};




