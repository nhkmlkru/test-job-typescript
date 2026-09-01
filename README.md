# Цифровая визитка

Backend-приложение с GraphQL API: профиль, навыки, опыт работы и проекты. После запуска база поднимается, мигрируется и заполняется данными автоматически.

## Стек

TypeScript, Node.js, NestJS, Prisma, GraphQL (Apollo Sandbox), PostgreSQL, Docker.

## Запуск с нуля

Нужны Docker и Docker Compose.

```bash
docker compose up --build
```

Откройте [http://localhost:3000/graphql](http://localhost:3000/graphql) — там Apollo Sandbox.

При старте контейнер приложения:

1. дожидается готовности PostgreSQL;
2. применяет Prisma-миграции;
3. поднимает NestJS;
4. если профиль ещё не создан — записывает его в базу.

Повторный запуск сид не дублирует данные. Чтобы заполнить базу заново:

```bash
docker compose down -v
docker compose up --build
```

## Пример запроса

```graphql
query {
  profile {
    name
    description
    skills {
      name
    }
    experience {
      company
      position
    }
    projects {
      name
    }
  }
}
```

Расширенный запрос:

```graphql
query {
  profile {
    name
    title
    description
    links {
      label
      url
    }
    skills {
      name
      category
    }
    experience {
      company
      companyUrl
      position
      period
      startDate
      endDate
      description
      achievements
    }
    projects {
      name
      description
      repositoryUrl
      technologies
    }
  }
}
```

## Архитектура

Слои разделены по ответственности:

| Слой | Где | Задача |
| --- | --- | --- |
| GraphQL | `src/profile/graphql`, `profile.resolver.ts` | Контракт API и разрешение вложенных полей |
| Application | `profile.service.ts` | Сценарии чтения и маппинг в API-модели |
| Persistence | `profile.repository.ts`, `src/prisma` | Запросы Prisma, без знания GraphQL |
| Seed | `src/profile/seed` | Исходные данные визитки и идемпотентная инициализация |

`Profile` — агрегат: навыки, опыт, проекты и ссылки принадлежат ему.

Вложенные поля GraphQL (`skills`, `experience`, `projects`, `links`) объявлены как field resolvers. Если клиент запросил их в `profile`, сервис подгружает связи одним Prisma-запросом (`include` только для запрошенных полей) и не ходит в базу повторно. Если связи не были загружены заранее, resolver дочитывает коллекцию отдельно.

GraphQL-модели не совпадают один в один с Prisma: даты опыта отдаются как `MM.YYYY` и человекочитаемый `period`, внутренние `id` коллекций в API не светятся.

## Структура

```
src/
  prisma/           Prisma-клиент
  common/           разбор GraphQL selection set, формат дат
  health/           GET / и GET /health
  profile/
    graphql/        ObjectType-модели
    mappers/        Prisma → GraphQL
    seed/           данные и заполнение БД
    profile.resolver.ts
    profile.service.ts
    profile.repository.ts
prisma/
  schema.prisma
  migrations/
```

## Локальный запуск без сборки образа

```bash
docker compose up db -d
copy .env.example .env
npm install
npx prisma migrate deploy
npm run start:dev
```
