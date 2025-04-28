
import { Prisma, User as PrismaUser } from "@prisma/client";
import { User } from "src/domain/models/user.model";


export class PrismaUserMapper {
    static toDomain(raw: PrismaUser): User {
      return User.create(
        {
          name: raw.name,
          email: raw.email,
          password: raw.password
          // Se quiser, também inclua active, createdAt, updatedAt
        },
        raw.id,  // <-- IMPORTANTE: passar o ID do banco aqui
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