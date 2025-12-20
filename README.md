# Papyrus

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Разработка (Development)

### Запуск с Docker

Самый простой способ запустить приложение в dev режиме:

```sh
# Собрать Docker образ
docker build -t papyrus-dev .

# Запустить контейнер
docker run -p 3000:3000 -v $(pwd):/app papyrus-dev
```

Или используя docker-compose (рекомендуется):

```sh
docker-compose up
```

Приложение будет доступно по адресу: `http://localhost:3000`

> **Примечание:** Для работы с hot-reload при разработке, убедитесь, что используется volume mount для синхронизации изменений кода.

### Запуск без Docker

Если у вас установлен Node.js и pnpm локально:

```sh
# Установить зависимости
pnpm install

# Запустить dev сервер
pnpm run dev

# или запустить сервер и открыть приложение в браузере
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```sh
pnpm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
