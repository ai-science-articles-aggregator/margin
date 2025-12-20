# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы конфигурации пакетов
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Устанавливаем зависимости
RUN pnpm install

# Копируем исходный код
COPY . .

# Открываем порт для dev сервера (по умолчанию Vite использует 5173)
EXPOSE 5173

# Запускаем dev сервер
CMD ["pnpm", "run", "dev", "--", "--host"]
