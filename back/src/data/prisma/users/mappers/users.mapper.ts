
import { Prisma, User as PrismaUser } from "@prisma/client";
import { User } from "@/domain/models/entity/user.entity";


export class PrismaUserMapper {
    static toDomain(raw: PrismaUser): User {
      return User.create(
        {
          name: raw.name,
          email: raw.email,
          password: raw.password
        },
        raw.id,  
      );
    }

  static toPrisma(
    raw: User,
  ): Prisma.UserUpdateInput {
    return {
      id: raw.id.toString(),
      name: raw.name,
      email: raw.email,
      password: raw.password,
      active: raw.active,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }
}