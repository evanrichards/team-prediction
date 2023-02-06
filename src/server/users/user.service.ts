import { Context } from 'src/server/context';
import { prisma } from 'src/server/prisma';
import { Email, User } from 'src/types/user';

export class UserService {
  async getCurrentUser(email: Email) {
    const resp = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!resp) {
      throw new Error('no user');
    }
    return User.parse({
      ...resp,
      createdAt: resp.createdAt.toISOString(),
      updatedAt: resp.updatedAt.toISOString(),
      lastLogin: resp.lastLogin ? resp.lastLogin.toISOString() : null,
    });
  }
  async list(_ctx: Context) {
    const resp = await prisma.user.findMany();
    return resp.map((user) =>
      User.parse({
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        lastLogin: user.lastLogin ? user.lastLogin.toISOString() : null,
      }),
    );
  }
}
