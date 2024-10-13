import bcrypt from "bcrypt";
import Teacher ,{Class,ITeacher,IClass} from "../models/teacherModel";


export const  createTeacherService = async(userData:any) => {
    try{
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const isExistClass: IClass |null = await Class.findOne({className:userData.className});
    if(!isExistClass){
        return null;
    }
    const newClass: IClass = await Class.create({
        className: userData.className})
    const newTeacher: ITeacher = await Teacher.create({
            fullName: userData.fullName,
            email: userData.email,
            password: hashedPassword,
            class: newClass._id, 
          });
          newClass.teacher = newTeacher._id;
    await newClass.save();

    return {  class: newClass._id };
}catch (error) {
  throw new Error("cant create teacher and class");
}
}



