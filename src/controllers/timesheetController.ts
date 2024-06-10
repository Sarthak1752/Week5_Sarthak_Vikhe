import {Request, Response} from 'express';
import Timesheet from '../models/timesheet';

const creatTimesheet = async (req:Request, res: Response)=>{
    const {id:employeeId} = (req as any).user;
    const {shiftId,projectName,taskName,fromDate,toDate} = req.body;

    try{
        const timesheet = await Timesheet.create({
            employeeId,
            shiftId,
            projectName,
            taskName,
            fromDate,
            toDate,
        });
        res.status(201).json({message:'Timesheet entry created',timesheet});
    }catch(error){
        res.status(501).json({message:'Error Occured while creating Timesheet', error});
    }
};

export {creatTimesheet};