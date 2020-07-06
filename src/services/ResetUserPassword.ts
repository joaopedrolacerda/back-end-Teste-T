import { Request } from 'express';

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Data {
  user_id: string;
  email: string;
  password: string;
  request: Request;
}

class CreateUserService {
  public async execute(
    { user_id, email, password }: Data,
    request: Request,
  ): Promise<User> {
    const usersRepository = getRepository(User);

    const CheckUserExists = await usersRepository.findOne({
      where: { id: user_id },
    });
    if (!CheckUserExists) {
      throw new Error('user not found');
    }

    const hashedPassword = await hash(password, 8);

    // Filtereduser?.password = hashedPassword;
    const userUpdated = await usersRepository.update(
      { id: user_id },
      { password: hashedPassword },
    );

    return CheckUserExists;
  }
}

export default CreateUserService;
