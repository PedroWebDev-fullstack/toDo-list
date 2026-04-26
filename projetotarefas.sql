CREATE DATABASE IF NOT EXISTS projetotarefas;
USE projetotarefas;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS tarefas (
    id INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    estaFeita TINYINT(1) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_usuario
        FOREIGN KEY (idUsuario)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
