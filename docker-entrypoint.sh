#!/bin/sh
set -e

# Chạy migrations
echo "Running migrations..."
npm run migration:run

# Chạy ứng dụng
echo "Starting application..."
exec node dist/main
