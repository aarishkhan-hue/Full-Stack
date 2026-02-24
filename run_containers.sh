#!/usr/bin/env bash
set -e
# Ensure Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Docker is not running. Starting Docker..."
  # Start Docker Desktop on Windows
  powershell -Command "Start-Process 'Docker Desktop'"
  # Wait for Docker to be ready
  while ! docker info > /dev/null 2>&1; do
    echo "Waiting for Docker..."
    sleep 2
  done
fi

# Use docker-compose to bring up all services
docker-compose -f docker-compose.yml up -d

echo "All containers started."
