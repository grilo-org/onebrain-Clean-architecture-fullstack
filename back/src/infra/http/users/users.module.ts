import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/infra/database/database.module";
import { CreateUserController } from "./controller/create-user.controller";
import { AuthenticationController } from "./controller";
import { AuthenticationUseCase, CreateUserUseCase } from "src/domain/usecases/users";
import { CryptographyModule } from "src/infra/cryptography/cryptography.module";

@Module({
  imports: [DataBaseModule, CryptographyModule],
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