/* eslint-disable prettier/prettier */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../erros/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepositry = getRepository(User);

    const checkUserExists = await usersRepositry.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepositry.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepositry.save(user);

    return user;
  }
}

export default CreateUserService;
