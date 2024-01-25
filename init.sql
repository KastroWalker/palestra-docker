CREATE DATABASE IF NOT EXISTS `docker_tutorial_api`;

\c docker_tutorial_api

CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);