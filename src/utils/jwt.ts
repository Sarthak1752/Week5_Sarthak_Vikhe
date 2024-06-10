import jwt from 'jsonwebtoken';

import credentials from '../common/credentials';


const generateToken = (user :any) => {
    const payload = {
        id : user.id,
        email : user.email,
        role : user.role,
    };
    return jwt.sign(payload,credentials.secret_Key.JWT_KEY,{expiresIn :'2h'});
};
export {generateToken};