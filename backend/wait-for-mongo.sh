#!/bin/sh
set -e

echo "Waiting for MongoDB to be ready..."
while ! nc -z mongodb 27017; do
  echo "MongoDB is not ready. Retrying in 2 seconds..."
  sleep 2
done

echo "MongoDB is ready! Starting the backend..."
exec "$@"