"use strict";
// import { Request, Response, NextFunction } from 'express';
// import Activity from '../models/activity';
// export const logActivity = (activityType: string) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const userId = req.user.id;
//             await Activity.create({
//                 user_id: userId,
//                 activity_type: activityType,
//                 timestamp: new Date(),
//             });
//             next();
//         } catch (error) {
//             res.status(500).json({ message: 'Failed to log activity', error });
//         }
//     };
// };
