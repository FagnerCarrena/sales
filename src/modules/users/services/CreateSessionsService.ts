import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UsersRepository";
import User from '../typeorm/entities/User'
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'
import authConfig from '@config/auth'


interface IRequest {
  email: string;
  password: string;
}

interface IResponse{
  user: User;
  token: string;
}


class CreateSessionService{
  public async execute({ email, password}: IRequest): Promise<IResponse>{
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findByEmail(email);

    if(!user){
throw new AppError('incorrect eamil/password combination.', 401)
}

const passwordConfirmed = await compare(password, user.password);

if(!passwordConfirmed){
  throw new AppError('incorrect eamil/password combination.', 401)
  }

  const token = sign({}, authConfig.jwt.secret, {
    subject: user.id,
    expiresIn: authConfig.jwt.expiresIn,
  })

return {
  user,
token,
} ;

  }
}
export default CreateSessionService;



