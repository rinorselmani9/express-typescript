import {Request, Response, Router} from 'express';
const router = Router();
import UserModel from '../models/DB/user.model';
import { User } from '../lib/types';

/* GET users listing. */
router.get('/', async(req: Request, res: Response) => {
  const user = await UserModel.create({email:"rinor@gmail.com", first_name:"Rinor",last_name:"Selmani",password:"123456"})
  res.send(user)
});

export default router
