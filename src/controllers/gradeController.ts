import Teacher,{ITeacher,IClass} from "../models/teacherModel";
import studentModel,{IStudent,Grade} from "../models/studentModel";
import { Request, Response, NextFunction } from "express";
import { addGradeService, findStudentByEmail ,editGradeService} from "../services/gradeService";
import { ResponseStructure } from "../types/response";


export const addGrade = async (req: any, res: Response) => {
    try {
      const userId = req.body.email;
      const user: IStudent | null = await findStudentByEmail(userId)
      if(!user){
          res.status(404).json(new ResponseStructure(false,"student not found"));
          return;
      }
      const { grade, message }: { grade: number; message: string } = req.body;
  
      const addedGrade = await addGradeService(req.body,req.user._id,user)
      
      res.status(200).json(new ResponseStructure(true,addGrade));
    } catch (error) {
      res.status(500).json({ message: "Server error", success: false });
    }
  };
  
  
  export const editGrade = async (req: any, res: Response) => {
      try {
          const userId = req.body.email;
          const student: IStudent | null = await findStudentByEmail(userId)
          if(!student){
              res.status(404).json(new ResponseStructure(false,"student not found"));
              return;
          }

        const updatedGrade = await editGradeService(student,req.user._id,student)

        if (!updatedGrade) {
          res
            .status(400)
            .json({ message: "Grade and subject are required", success: false });
          return;
        }
  
       
        res
          .status(200)
          .json({
            data: updatedGrade,
            message: "Grade updated successfully",
            success: true,
          });
      } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
      }
    };
  
  
    export const getAllUsers = async(req: any, res: Response) => {
      try {
          const users = await User.find();
          if (users.length === 0) {
               res.status(404).json({ message: "No users found", success: false });
               return
            }
            res.status(200).json({ data: users, success: true });
      } catch (error) {
          res.status(500).json({ message: "Server error", success: false });
      }
    }
  
    export const getAllUsersGrades = async(req: any, res: Response) => {
      try {
          const users = await User.find({role:'student'}, { grades: 1, _id: 0 });
  
          if (users.length === 0) {
               res.status(404).json({ message: "No users found", success: false });
               return
            }
            res.status(200).json({ data: users, success: true });
      } catch (error) {
          res.status(500).json({ message: "Server error", success: false });
      }
    }
  
  
  
    export const getAllUsersGradesAverage = async(req: any, res: Response) => {
      try {
          const averages = await User.aggregate([
              { $match: { role: 'student'  }},
              { $unwind: { path: '$grades', preserveNullAndEmptyArrays: true } },
              {
                  $group: {
                      _id: '$_id',  
                      averageGrade: { $avg: '$grades.grade' } 
                  }
              },
              {
                  $project: {
                      userId: '$passportId',
                      averageGrade: 1, 
                      _id: 0 
                  }
              }
          ]);
  
          if (averages.length === 0) {
               res.status(404).json({ message: "No users found", success: false });
               return;
          }
  
          res.status(200).json({ data: averages, success: true });
      } catch (error) {
          res.status(500).json({ message: "Server error", success: false });
      }
    }
  
    
    export const removeStudent = async (req: any, res: Response) => {
        try {
          const userId = req.body.passportId;
          const user: IUser | null = await findStudentByEmail(userId)
          if(!user){
              res.status(404).json({ message: "user not found", success: false });
              return;
          }
    
        await User.deleteOne({ passportId: userId });
        res
          .status(200)
          .json({
            data: user,
            message: "user removed successfully",
            success: true,
          });
      } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
      }
    };
  
  
    
    
  