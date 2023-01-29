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
}
