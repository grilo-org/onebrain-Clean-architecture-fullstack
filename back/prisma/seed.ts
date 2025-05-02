/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: '123456',
    },
  });

  const customerData = [
    {
      name: 'Cliente 1',
      email: 'cliente1@example.com',
      cpf: '12345678901',
      phone: '11999999999',
      zipCode: '12345678',
      street: 'Rua 1',
      number: '100',
      complement: 'Apto 101',
      city: 'São Paulo',
      state: 'SP',
      createdById: user.id,
    },
    {
      name: 'Cliente 2',
      email: 'cliente2@example.com',
      cpf: '98765432100',
      phone: '11988888888',
      zipCode: '87654321',
      street: 'Rua 2',
      number: '200',
      city: 'Rio de Janeiro',
      state: 'RJ',
      createdById: user.id,
    },
    {
      name: 'Cliente 3',
      email: 'cliente3@example.com',
      cpf: '98765432102',
      phone: '1198888881',
      zipCode: '87654321',
      street: 'Rua 2',
      number: '200',
      city: 'Rio de Janeiro',
      state: 'RJ',
      createdById: user.id,
    },
  ];

  for (const customer of customerData) {
    await prisma.customer.upsert({
      where: { email: customer.email },
      update: customer,
      create: customer,
    });
  }

  console.log('🌱 Seed realizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Seed falhou:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
