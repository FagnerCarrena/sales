import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UsersRepository";
import User from '../typeorm/entities/User'
import {compare} from 'bcryptjs'


interface IRequest {
email: string;
  password: string;
}


class CreateSessionService{
  public async execute({ email, password}: IRequest): Promise<User>{
    const usersRepository = getCustomRepository(UserRepository);

    const user= await usersRepository.findByEmail(email);

    if(!user){
throw new AppError('incorrect eamil/password combination.', 401)
}

const passwordConfirmed = await compare(password, user.password);

if(!passwordConfirmed){
  throw new AppError('incorrect eamil/password combination.', 401)
  }

return user;

  }
}
export default CreateSessionService;



