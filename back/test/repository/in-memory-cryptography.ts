import { Injectable } from "@nestjs/common";
import { Encrypter } from "src/domain/repositories/cryptography/encrypter";
import { HashComparer } from "src/domain/repositories/cryptography/hash-comparer";
import { HashGenerator } from "src/domain/repositories/cryptography/hash-generator";

@Injectable()
export class InMemoryEncrypter implements Encrypter {
  items: { payload: Record<string, unknown>; token: string }[] = [];

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    const token = JSON.stringify(payload);
    
    this.items.push({ payload, token });
    
    return token;
  }
}

@Injectable()
export class InMemoryHashGenerator implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return `hashed_${plain}`;
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return hash === `hashed_${plain}`;
  }
}

@Injectable()
export class InMemoryHashComparer implements HashComparer {
  async compare(plain: string, hash: string): Promise<boolean> {
    return hash === `hashed_${plain}`;
  }
} 