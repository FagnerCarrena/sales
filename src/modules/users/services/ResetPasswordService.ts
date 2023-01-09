import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import{hash} from 'bcryptjs'
import UserRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/userTokensRepository";
import {isAfter, addHours} from 'date-fns'

interface IRequest {
  token: string;
  password:string;
  }


class ResetPassswordService{
  public async execute({token, password}: IRequest): Promise<void>{
    const usersRepository = getCustomRepository(UserRepository);

    const userTokensRepository = getCustomRepository(UserTokensRepository)

    const userToken = await userTokensRepository.findByToken(token);

    if(!userToken){
throw new AppError('user token does not exist.')
    }

    const  user = await usersRepository.findById(userToken.user_id)


    if(!user){
      throw new AppError('user token does not exist.')
          }

          const takenCreatedAt = userToken.created_at;
          const compareDate = addHours(takenCreatedAt, 2)

          if(isAfter(Date.now(), compareDate)){
throw new AppError('token expired.');
          }
user.password = await hash(password, 8);

await usersRepository.save(user)

  }
}
export default ResetPassswordService;



