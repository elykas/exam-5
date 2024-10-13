import Teacher,{ITeacher,IClass} from "../models/teacherModel";
import studentModel,{IStudent,Grade} from "../models/studentModel";
import { Request, Response, NextFunction } from "express";
import { addGradeService, findStudentByEmail ,editGradeService} from "../services/gradeService";
import { ResponseStructure } from "../types/response";
import teacherModel from "../models/teacherModel";


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
            .json(new ResponseStructure(false,"grade are required"));
          return;
        }
        res
          .status(200)
          .json(new ResponseStructure(true,"grade updated successfully"));
      } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
      }
    };
  
  

  
    export const getAllUsersGrades = async(req: any, res: Response) => {
      try {
          const teacher = await teacherModel.findById(req.user._id).populate({
            path:"class",
            select:"className"
          })

          if (!teacher) {
            return res.status(404).json(new ResponseStructure(false,"teacher not found"));
          }
          const students = await studentModel.find(
            { class: teacher.class._id }, 
            { grades: 1, _id: 0 } 
          );
          if (students.length === 0) {
               res.status(404).json({ message: "No users found", success: false });
               return
            }
            res.status(200).json(new ResponseStructure(true,"all grades"));
      } catch (error) {
          res.status(500).json({ message: "Server error", success: false });
      }
    }
  
  
  
    export const getClassGradesAverage = async(req: any, res: Response) => {
      try {
        const teacher = await teacherModel.findById(req.user._id).populate({
            path:"class",
            select:"className"
          })

          if (!teacher) {
            return res.status(404).json(new ResponseStructure(false,"teacher not found"));
          }
          const averages = await studentModel.aggregate([
            { $match: { class: teacher.class._id } }, 
            { $unwind: { path: "$grades", preserveNullAndEmptyArrays: true } },
            {
              $group: {
                _id: "$_id", 
                averageGrade: { $avg: "$grades.grade" },
              },
            },
            {
              $project: {
                userId: "$_id", 
                averageGrade: 1,
                _id: 0,
              },
            },
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
  
    
export getGradeByEmail =    async(req: any, res: Response) => {
    try {
        const teacher = await teacherModel.findById(req.user._id).populate({
          path:"class",
          select:"className"
        })

        if (!teacher) {
          return res.status(404).json(new ResponseStructure(false,"teacher not found"));
        }
        const students = await studentModel.find(
          { class: teacher.class._id }, 
          { grades: 1, _id: 0 } 
        );
        if (students.length === 0) {
             res.status(404).json({ message: "No users found", success: false });
             return
          }
          res.status(200).json(new ResponseStructure(true,"all grades"));
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
  }
 
  