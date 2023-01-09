import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/userTokensRepository";




interface IRequest {
  email: string;
  }

class SendForgotPassswordEmailService{
  public async execute({  email}: IRequest): Promise<void>{
    const usersRepository = getCustomRepository(UserRepository);

    const userTokensRepository = getCustomRepository(UserTokensRepository)

    const user = await usersRepository.findByEmail(email);

    if(!user){
throw new AppError('user does not exist.')
    }

    console.log(user)

    const token = await userTokensRepository.generate(user.id);

console.log(token)

  }
}
export default SendForgotPassswordEmailService;



