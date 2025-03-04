import { Role } from '@prisma/client';

export const User = (Role?: Role) => ({
  select: {
    id: true,
    firstName: true,
    lastName: true,
    phone: true,
    password: false,
    role: true,
    avatar: true,
    createdAt: true,
    updatedAt: true,
    fcmToken: true,
    [Role]: '',
  },
});
