import { Injectable } from "@nestjs/common";
import { UsersRepository } from "@/domain/repositories/users/users.repository";
import { User } from "@/domain/models/entity/user.entity";
import { PrismaUserMapper } from "@/data/prisma/users/mappers/users.mapper";
import { PrismaService } from "@/data/prisma.service";


@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(
    private prisma: PrismaService,
  ) {}


    async create(user: User): Promise<User> {
        const userData = PrismaUserMapper.toPrisma(user);
        const createdUser = await this.prisma.user.create({
            data: userData as any
        });
        return PrismaUserMapper.toDomain(createdUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: { email },
        });
        return user ? PrismaUserMapper.toDomain(user) : null;
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user ? PrismaUserMapper.toDomain(user) : null;
    }

    async update(user: User): Promise<User> {
        const userData = PrismaUserMapper.toPrisma(user);
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id.toString() },
            data: userData,
        });
        return PrismaUserMapper.toDomain(updatedUser);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }


  }
