# WG Social MVP

Production-oriented MVP социальной платформы для гемблинг-аудитории в монорепозитории.

## Архитектура

- `client/` — Next.js 14 App Router + TypeScript + TailwindCSS.
- `server/` — Express + Prisma + PostgreSQL + JWT + Socket.io.
- `docker-compose.yml` — локальный PostgreSQL.

## Ключевые модули backend

- `controllers/` — HTTP orchestration.
- `services/` — бизнес-логика.
- `routes/` — REST API endpoints.
- `dtos/` — Zod DTO валидация.
- `middlewares/` — auth, role, premium guard, anti-spam, error handling.
- `sockets/` — realtime события для сообщений/лайков/стримов.

## Prisma модели

- `User`, `Follow`
- `Post`, `Comment`, `Like`, `Repost`
- `Bonus` (FREE/PREMIUM)
- `Stream`
- `Conversation`, `Message`

## REST API структура

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/feed?sort=new|popular&cursor=<id>`
- `POST /api/feed`
- `POST /api/feed/:postId/comments`
- `POST /api/feed/:postId/likes`
- `POST /api/feed/:postId/reposts`
- `GET /api/users/me`
- `PATCH /api/users/me`
- `GET /api/users/:userId`
- `POST /api/users/:userId/follow`
- `GET /api/bonuses`
- `GET /api/bonuses/premium`
- `POST /api/bonuses` (ADMIN)
- `GET /api/streams`
- `POST /api/streams`
- `POST /api/messages`
- `GET /api/messages/:conversationId`

## Socket.io события

- client -> server:
  - `messages:join`
  - `messages:send`
  - `post:liked`
  - `stream:viewersUpdate`
- server -> client:
  - `messages:new`
  - `post:likesUpdated`
  - `stream:updated`

## Premium подписка

- Флаг `User.isPremium` (заглушка оплаты: обновляется через серверную логику/админ-инструмент).
- `premiumMiddleware` ограничивает premium-контент.

## Запуск локально

1. Поднять базу:
   ```bash
   docker compose up -d
   ```
2. Установить зависимости:
   ```bash
   npm install
   ```
3. Подготовить env:
   - `cp server/.env.example server/.env`
   - `cp client/.env.example client/.env.local`
4. Prisma:
   ```bash
   npm run prisma:generate -w server
   npm run prisma:migrate -w server -- --name init
   npm run prisma:seed -w server
   ```
5. Запуск:
   ```bash
   npm run dev
   ```

## Docker

- `client/Dockerfile` — production сборка фронта.
- `server/Dockerfile` — production сборка API.
