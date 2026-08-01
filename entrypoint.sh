#!/bin/sh

echo "Preparando Ambiente.."

until pg_isready -h db -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
  echo "Aguardando PostgreSQL.."
  sleep 4
done
echo "Banco de dados Pronto!"

echo "Executando Prisma Generate"
npx prisma generate

echo "Executando Migrations.."
if ! npx prisma migrate deploy; then
  echo "Algo falhou na execução das migrations."
  exit 1
fi

echo "Iniciando Aplicação!"
npm run start:dev