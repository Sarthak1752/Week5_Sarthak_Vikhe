import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import Employee from '../models/employee';
import {generateToken} from '../utils/jwt';

//REGISTRATION

const register = async (req:Request, res:Response)=>{
    const {name,email,password,assignedShiftHours,role} = req.body;
    
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const employee = await Employee.create({
            name,
            email,
            password:hashedPassword,
            assignedShiftHours,
            role,
        });

        res.status(201).json({ message:'Employee registered successfully',employee});

    }catch(error){
        res.status(500).json({message:'Error registering employee', error });
    }
};


//LOGIN
const login = async (req:Request, res: Response)=>{
    const {email, password} = req.body;

    try{
        const employee = await Employee.findOne({where:{email}});
        if(!employee){
            return res.status(404).json({message:'Employee Not Found'});
        }
        const Match = await bcrypt.compare(password, employee.password);
        if(!Match){
            return res.status(400).json({message:'Incoreect Username or Password'});
        }
        
        const token = generateToken(employee);

        res.status(200).json({message:'Login Successful','Token':token});
    }catch(error){
        res.status(500).json({message:'Error while Logging in',error});

    }
};

export{register , login};