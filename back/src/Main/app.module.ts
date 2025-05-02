import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from 'src/infra/auth/auth.module';
import { envSchema } from 'src/infra/env/env';
import { EnvService } from 'src/infra/env/env.service';
import { CustomersModule } from 'src/presentation/customers/customers.module';
import { UsersModule } from 'src/presentation/users/users.module';


@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 60,
    }),
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [EnvService],
})
export class AppModule {}
