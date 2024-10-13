import Student, { IStudent } from "../models/studentModel";
import teacherModel from "../models/teacherModel";


export const findStudentByEmail = async(email:string) =>{
    const user: IStudent | null = await Student.findOne({email: email});
    if (!user) {
      return null;
    }
    return user;
  }

  export const addGradeService = async (data: any, teacherId: any, student: IStudent) => {

    const isSameClass = await checkIfTeacherClass(teacherId,student)

      if(!isSameClass){
        return null;
      }

      student.grades.push(data); 
    await student.save(); 
    return student
    }


    export const editGradeService = async (data: any, teacherId: any, student: IStudent) => {

        const isSameClass = await checkIfTeacherClass(teacherId,student)
    
          if(!isSameClass){
            return null;
          }

          await Student.updateOne(
            {email: student.email },
            { $set: { "grades.$.grade": data.grade } }
          );
        
      return student;
        }    


    const checkIfTeacherClass= async(teacherId:string,student:IStudent)=>{
        const teacher = await teacherModel.findById(teacherId);
      if(!teacher){
        return null;
      }

      if (teacher.class._id !== student.class._id) {
        throw new Error("Teacher does not in this class");
        return
      }
      return true

    }