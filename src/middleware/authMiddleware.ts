import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import credentials from '../common/credentials';

dotenv.config();

const authMiddlerware = (req :Request,res:Response,next:NextFunction)=>{
    const token : any = req.headers.authorization?.split(' ')[1];

    if(!token){
        res.status(404).json({error:'unauthorized'})
    }

    try{
        const decoded = jwt.verify(token,credentials.secret_Key.JWT_KEY as string);
        (req as any).user = decoded;
        next();
    } catch(error){
        return res.status(401).json({message:'Invalid token'});
    }
}

export default authMiddlerware;
