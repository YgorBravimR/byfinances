# BYPLO

## How to run:

```bash
pnpm install

docker-compose up -d

pnpm prisma migrate dev

pnpm seed

pnpm prisma studio

pnpm start:dev
```

# Initial setup script:


```bash
pnpm install && docker-compose up -d && pnpm prisma migrate dev && pnpm seed && pnpm prisma studio && pnpm start:dev
```
