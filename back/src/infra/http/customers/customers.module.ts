import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CreateCustomerUseCase } from 'src/domain/usecases/customers/create-customers';
import { DeleteCustomerUseCase } from 'src/domain/usecases/customers/delete-customers';
import { FetchCustomerIdUseCase } from 'src/domain/usecases/customers/fetch-customer-id';
import { FetchCustomersUseCase } from 'src/domain/usecases/customers/fetch-customers';
import { UpdateCustomerUseCase } from 'src/domain/usecases/customers/update-customers';
import { DataBaseModule } from 'src/infra/database/database.module';
import { CreateCustomerController } from './controller/create-customers.controller';
import { FetchCustomersIdController } from './controller/customers-id.controller';
import { FetchCustomersController } from './controller/customers.controller';
import { DeleteCustomerController } from './controller/delete-customers.controller';
import { UpdateCustomerController } from './controller/update-customers.controller';

@Module({
  imports: [CacheModule.register(), DataBaseModule],
  controllers: [
    CreateCustomerController,
    UpdateCustomerController,
    FetchCustomersController,
    DeleteCustomerController,
    FetchCustomersIdController,
  ],
  providers: [
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    FetchCustomersUseCase,
    DeleteCustomerUseCase,
    FetchCustomerIdUseCase,
  ],
  exports: [FetchCustomersUseCase],
})
export class CustomersModule {}
