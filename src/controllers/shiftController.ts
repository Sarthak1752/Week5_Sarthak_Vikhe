import {Request,Response} from 'express';
import Shift from '../models/shift';

const startShift = async(req:Request,res:Response)=>{

    const {id:employeeId} = (req as any).user;

    try{
        const shift = await Shift.create({
            employeeId,
            startTime:new Date(),
        });

        res.status(201).json({message:'Shift Started', shift});

    }catch(error){
        res.status(500).json({message:'Error starting shift',error});
    }

};

const endShift = async (req:Request, res:Response)=>{
    const {id:employeeId} = (req as any).user;

    try{
        const shift = await Shift.findOne({
            where:{employeeId,endTime:null},
        });
        if(!shift){
            return res.status(404).json({message:'Shift Not Found'});
        }

        shift.endTime = new Date();
        shift.actualHours = (shift.endTime.getTime()-shift.startTime.getTime())/3600000;
        await shift.save();

        res.status(200).json({message:'Shift Ended',shift});
    } catch(error){
        res.status(500).json({message:'Error ending the shift',error});
    }
};

export {startShift,endShift};