import bcrypt from "bcrypt";
import Student, { IStudent } from "../models/studentModel";
import Teacher ,{Class,ITeacher,IClass} from "../models/teacherModel";


export const  createStudentService = async(userData:any) => {
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const existClass: IClass |null = await Class.findOne({className:userData.className});
    if(!existClass){
        return null;
    }
    const newStudent: IStudent = await Student.create({
        fullName: userData.fullName,
        email: userData.email,
        password: hashedPassword,
        class: existClass._id, 
        grades:[]
      });
      existClass.students.push(newStudent._id);
      existClass.save();
    return await Student.create(newUser);
    
}