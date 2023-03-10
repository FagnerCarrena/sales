import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import multer from 'multer';
import uploadConfi from '@config/upload'
import UserAvatarController from '../controllers/UserAvatarController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UsersController from '../controllers/UsersController';


const usersRouter = Router();

const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfi);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password:Joi.string().required(),
    },
  }),

  usersController.create,
);
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,

);


export default usersRouter;
