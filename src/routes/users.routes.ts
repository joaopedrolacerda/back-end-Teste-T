import { Router } from 'express';

import CreateUserService from '../services/CreateUserServices';
import ResetUserPassword from '../services/ResetUserPassword';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// : Rota receber a requisição, chamar outro arquivo, devolver uma resposta
const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.put('/update/:user_id', async (request, response) => {
  try {
    const { user_id } = request.params;
    const { email, password } = request.body;

    const resetUserPassword = new ResetUserPassword();

    const user = await resetUserPassword.execute({
      user_id,
      email,
      password,
    });
    // const createUser = new CreateUserService();

    // const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(422).json({ error: err.message });
  }
});

export default usersRouter;
