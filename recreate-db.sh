#!/bin/bash

psql postgres -c "DROP DATABASE auntie"
psql postgres -c "CREATE DATABASE auntie"
# sequelize db:migrate
npm run fixtures:load
