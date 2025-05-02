import { Module } from "@nestjs/common";
import { DataModule } from "@/data/data.module";
import { CreateCustomerController } from "@/presentation/customers/controller/create-customers.controller";
import { CreateCustomerUseCase } from "@/domain/usecases/customers/create-customers";
import { UpdateCustomerUseCase } from "@/domain/usecases/customers/update-customers";
import { UpdateCustomerController } from "@/presentation/customers/controller/update-customers.controller";
import { FetchCustomersController } from "@/presentation/customers/controller/customers.controller";
import { FetchCustomersUseCase } from "@/domain/usecases/customers/fetch-customers";
import { DeleteCustomerController } from "@/presentation/customers/controller/delete-customers.controller";
import { DeleteCustomerUseCase } from "@/domain/usecases/customers/delete-customers";
import { FetchCustomersIdController } from "@/presentation/customers/controller/customers-id.controller";
import { FetchCustomerIdUseCase } from "@/domain/usecases/customers/fetch-customer-id";

@Module({
  imports: [DataModule],
  controllers: [
    CreateCustomerController,
    UpdateCustomerController,
    FetchCustomersController,
    DeleteCustomerController,
    FetchCustomersIdController
  ],
  providers: [
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    FetchCustomersUseCase,
    DeleteCustomerUseCase,
    FetchCustomerIdUseCase
  ],
})
export class CustomersModule {}