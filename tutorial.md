# Baixando a imagem do postgres

docker pull postgres

# Iniciando o container do postgres

docker run -e POSTGRES_PASSWORD=postgress -p 5433:5432 postgres

# Listando os containers ativos

docker ps

# Acessando o container do postgres

docker exec -it <id-do-container> bash

# Acessando o postgres

psql -U postgres

# Listando os bancos de dados

\l

# Criando um banco de dados

CREATE DATABASE docker_tutorial_api;

# Listando os bancos de dados

\l

# Setando o banco de dados

\c docker_tutorial_api

# Criando a tabela de produtos

CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

# Listando as tabelas

\dt

# Inserindo um produto

curl -X POST \
  <http://localhost:3000/products> \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Produto Novo",
    "price": 29.99
  }'

# Listando produtos

curl <http://localhost:3000/products>

# Criando a imagem docker

docker build -t docker-tutorial-api .

# Rodando essa imagem

docker run -p 3000:3000 docker-tutorial-api

# Criar uma network para conectar o banco de dados com a aplicação

docker network create my-network

# Criar um volume para o banco de dados

docker volume create my-volume

# Rodando o container do banco de dados

docker run -e POSTGRES_PASSWORD=postgress -p 5433:5432 --volume my-volume:/var/lib/postgresql/data postgres
