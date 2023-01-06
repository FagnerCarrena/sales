import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UsersRepository";
import path from 'path'
import uploadConfig from "@config/upload";
import fs from 'fs'
import User from '../typeorm/entities/User'



interface IRequest {
  user_id: string
  avatarFilename: string;

}


class UpdateUserAvatarService{
  public async execute({user_id, avatarFilename}: IRequest): Promise<User>{
    const usersRepository = getCustomRepository(UserRepository);

const user = await usersRepository.findById(user_id)

if(!user){
throw new AppError('User not found.')
}

if(user.avatar){
const userAvatarfilePath = path.join(uploadConfig.directory, user.avatar);
const userAvatarfileExists = await fs.promises.stat(userAvatarfilePath);

if(userAvatarfileExists){
await fs.promises.unlink(userAvatarfilePath);
}

}

user.avatar = avatarFilename;

await usersRepository.save(user);

return user;



  }
}
export default UpdateUserAvatarService;



