



export const addGrade = async (req: any, res: Response) => {
    try {
      const userId = req.body.passportId;
      const user: IUser | null = await findStudentById(userId)
      if(!user){
          res.status(404).json({ message: "user not found", success: false });
          return;
      }
      const { grade, subject }: { grade: number; subject: string } = req.body;
  
      if (!grade || !subject) {
        res
          .status(400)
          .json({ message: "Grade and subject are required", success: false });
        return;
      }
      user.grades.push({ grade, subject });
      await user.save();
      res.status(200).json({ data: user, success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error", success: false });
    }
  };
  
  export const removeGrade = async (req: any, res: Response) => {
    try {
      const userId = req.body.passportId;
      const user: IUser | null = await findStudentById(userId)
      if(!user){
          res.status(404).json({ message: "user not found", success: false });
          return;
      }
  
      const { grade, subject }: { grade: number; subject: string } = req.body;
      if (!grade || !subject) {
        res
          .status(400)
          .json({ message: "Grade and subject are required", success: false });
        return;
      }
      await User.updateOne(
        { passportId: userId },
        { $pull: { grades: { grade, subject } } }
      );
      const updatedUser: IUser | null = await User.findOne( {passportId: userId});
  
      res
        .status(200)
        .json({
          data: updatedUser,
          message: "Grade removed successfully",
          success: true,
        });
    } catch (error) {
      res.status(500).json({ message: "Server error", success: false });
    }
  };
  
  export const editGrade = async (req: any, res: Response) => {
      try {
          const userId = req.body.passportId;
          const user: IUser | null = await findStudentById(userId)
          if(!user){
              res.status(404).json({ message: "user not found", success: false });
              return;
          }
    
        const { grade, subject }: { grade: number; subject: string } = req.body;
        if (!grade || !subject) {
          res
            .status(400)
            .json({ message: "Grade and subject are required", success: false });
          return;
        }
  
        await User.updateOne(
          {passportId: userId,"grades.subject": subject  },
          { $set: { "grades.$.grade": grade  } }
        );
        const updatedUser: IUser | null = await findStudentById(userId)
    
        res
          .status(200)
          .json({
            data: updatedUser,
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
          const user: IUser | null = await findStudentById(userId)
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
  
  
    
    
  