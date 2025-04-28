import { User, UserProps } from 'src/domain/models/user.model'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaUserMapper } from 'src/infra/database/prisma/users/mappers/users.mapper'
import { Prisma } from '@prisma/client'

export function makeUser(override: Partial<UserProps> = {}) {
  const { active, ...restOfOverride } = override;
  
  const user = User.create({
    name: 'Ativo',
    email: 'teste@teste.com',
    password: '12345678901',
    ...restOfOverride,
  });
  
  if (active !== undefined) {
    user.setActive(active);
  }
  
  return user;
}

@Injectable()
export class UsersFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUsers(
    data: Partial<UserProps> = {},
  ): Promise<User> {
    const user = makeUser(data)

    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user) as Prisma.UserCreateInput,
    })

    return user
  }
}