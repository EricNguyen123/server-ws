# Dockerfile
FROM node:20-bullseye-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

# Cài đặt dependencies và NestJS CLI
RUN npm install --legacy-peer-deps
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

# Giai đoạn cuối
FROM node:20-bullseye-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/src ./src

# Cài đặt lại các phụ thuộc trong image cuối và NestJS CLI
RUN npm install --legacy-peer-deps
RUN npm install -g @nestjs/cli

# Tái xây dựng các mô-đun native
RUN npm rebuild bcrypt

# Copy script chạy migrations
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8000

# Sử dụng script làm entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]
