/* eslint-disable prettier/prettier */
import { Router } from 'express';
import multer from 'multer';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserServices';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

/**
 * Repositories
 * Services
 *
 */

usersRouter.post('/', async (request, response) => {
  try {
  const {name, email, password} = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch('/avatar',ensureAuthenticated,upload.single('avatar'), async (request, response) => {

  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename,
  });

 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 // @ts-expect-error
  delete user.password;

  return response.json(user);

});

export default usersRouter;
