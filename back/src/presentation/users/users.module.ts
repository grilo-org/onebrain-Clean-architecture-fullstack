import { Module } from "@nestjs/common";
import { DataModule } from "@/data/data.module";
import { CreateUserController } from "@/presentation/users/controller/create-user.controller";
import { AuthenticationController } from "@/presentation/users/controller/authentication.controller";
import { AuthenticationUseCase, CreateUserUseCase } from "@/domain/usecases/users";
import { CryptographyModule } from "@/infra/cryptography/cryptography.module";

@Module({
  imports: [DataModule, CryptographyModule],
  controllers: [
    CreateUserController,
    AuthenticationController
  ],
  providers: [
    AuthenticationUseCase,
    CreateUserUseCase,
  ],
  
})
export class UsersModule {}