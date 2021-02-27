/* eslint-disable prettier/prettier */
import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const SessionsRouter = Router();

SessionsRouter.post('/', async (request, response) => {
    const {email, password} = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
     // @ts-expect-error
    delete user.password;

    return response.json({ user, token });

});

export default SessionsRouter;
