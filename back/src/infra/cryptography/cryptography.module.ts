import { Module } from '@nestjs/common'

import { Encrypter } from 'src/domain/repositories/cryptography/encrypter'
import { HashComparer } from 'src/domain/repositories/cryptography/hash-comparer'
import { HashGenerator } from 'src/domain/repositories/cryptography/hash-generator'

import { JwtEncrypter } from './jwt-encrypter'
import { BcryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    { 
      provide: Encrypter,
      useClass: JwtEncrypter
    },
    { provide: HashGenerator,
      useClass: BcryptHasher
    },
    { provide: HashComparer,
      useClass: BcryptHasher
    },
  ],
  exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule {}