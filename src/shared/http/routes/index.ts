import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import {Router} from 'express'
import sessionsRouter from '@modules/users/routes/sessions.routes'

const routes = Router();

routes.use('/products', productsRouter)
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter)




export default routes;
