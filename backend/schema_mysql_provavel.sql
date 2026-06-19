-- schema.sql
-- Script gerado com base nos repositories e controllers fornecidos.
-- Banco alvo: MySQL 8.x / 9.x
-- Atenção: tipos e tamanhos são prováveis, pois o dump original não foi fornecido.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE pessoas (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    dataNasc DATE NOT NULL,
    telefone VARCHAR(20) NOT NULL DEFAULT '',
    email VARCHAR(150) NOT NULL DEFAULT '',
    cep VARCHAR(10) NOT NULL DEFAULT '',
    logradouro VARCHAR(150) NOT NULL DEFAULT '',
    numero VARCHAR(20) NOT NULL DEFAULT '',
    complemento VARCHAR(100) NOT NULL DEFAULT '',
    bairro VARCHAR(100) NOT NULL DEFAULT '',
    cidade VARCHAR(100) NOT NULL DEFAULT '',
    estado VARCHAR(2) NOT NULL DEFAULT '',
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    UNIQUE KEY uk_pessoas_cpf (cpf),
    KEY idx_pessoas_nome (nome),
    KEY idx_pessoas_isDeleted (isDeleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE especies (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    KEY idx_especies_nome (nome),
    KEY idx_especies_isDeleted (isDeleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE racas (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    origem VARCHAR(100) NULL,
    tamanho VARCHAR(50) NULL,
    expectativaVida VARCHAR(50) NULL,
    temperamento VARCHAR(255) NULL,
    pelagem VARCHAR(100) NULL,
    especiesId INT UNSIGNED NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    KEY idx_racas_especiesId (especiesId),
    KEY idx_racas_isDeleted (isDeleted),
    CONSTRAINT fk_racas_especies
        FOREIGN KEY (especiesId) REFERENCES especies(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE animais (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cor VARCHAR(80) NULL,
    dataNasc DATE NULL,
    racasId INT UNSIGNED NOT NULL,
    pessoaId INT UNSIGNED NULL,
    fotoUrl MEDIUMTEXT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    KEY idx_animais_racasId (racasId),
    KEY idx_animais_pessoaId (pessoaId),
    KEY idx_animais_isDeleted (isDeleted),
    CONSTRAINT fk_animais_racas
        FOREIGN KEY (racasId) REFERENCES racas(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_animais_pessoas
        FOREIGN KEY (pessoaId) REFERENCES pessoas(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE veterinarios (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    pessoaId INT UNSIGNED NOT NULL,
    CRMV VARCHAR(30) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    UNIQUE KEY uk_veterinarios_pessoaId (pessoaId),
    UNIQUE KEY uk_veterinarios_CRMV (CRMV),
    KEY idx_veterinarios_isDeleted (isDeleted),
    CONSTRAINT fk_veterinarios_pessoas
        FOREIGN KEY (pessoaId) REFERENCES pessoas(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE atendimentos (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    animalId INT UNSIGNED NOT NULL,
    veterinarioId INT UNSIGNED NULL,
    dataAtendimento DATETIME NOT NULL,
    tipo VARCHAR(80) NOT NULL,
    descricao TEXT NOT NULL,
    custo DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    PRIMARY KEY (id),
    KEY idx_atendimentos_animalId (animalId),
    KEY idx_atendimentos_veterinarioId (veterinarioId),
    KEY idx_atendimentos_dataAtendimento (dataAtendimento),
    CONSTRAINT fk_atendimentos_animais
        FOREIGN KEY (animalId) REFERENCES animais(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_atendimentos_veterinarios
        FOREIGN KEY (veterinarioId) REFERENCES veterinarios(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE adocoes (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    animalId INT UNSIGNED NOT NULL,
    pessoaId INT UNSIGNED NOT NULL,
    dataAdocao DATE NOT NULL,
    termoAssinado BOOLEAN NOT NULL DEFAULT FALSE,
    observacoes TEXT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_adocoes_animalId (animalId),
    KEY idx_adocoes_pessoaId (pessoaId),
    KEY idx_adocoes_dataAdocao (dataAdocao),
    CONSTRAINT fk_adocoes_animais
        FOREIGN KEY (animalId) REFERENCES animais(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_adocoes_pessoas
        FOREIGN KEY (pessoaId) REFERENCES pessoas(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE recursos (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(80) NOT NULL,
    nome VARCHAR(120) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    valor DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    descricao TEXT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    KEY idx_recursos_tipo (tipo),
    KEY idx_recursos_nome (nome),
    KEY idx_recursos_isDeleted (isDeleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE doacoes (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    dataDoacao DATE NOT NULL,
    tipo ENUM('Monetária', 'Monetaria', 'Itens') NOT NULL,
    valor DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    descricao TEXT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    KEY idx_doacoes_tipo (tipo),
    KEY idx_doacoes_dataDoacao (dataDoacao),
    KEY idx_doacoes_isDeleted (isDeleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE pessoas_doacoes (
    pessoaId INT UNSIGNED NOT NULL,
    doacaoId INT UNSIGNED NOT NULL,
    PRIMARY KEY (pessoaId, doacaoId),
    KEY idx_pessoas_doacoes_doacaoId (doacaoId),
    CONSTRAINT fk_pessoas_doacoes_pessoas
        FOREIGN KEY (pessoaId) REFERENCES pessoas(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_pessoas_doacoes_doacoes
        FOREIGN KEY (doacaoId) REFERENCES doacoes(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE doacoes_itens (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    doacaoId INT UNSIGNED NOT NULL,
    recursoId INT UNSIGNED NULL,
    quantidade INT NOT NULL,
    nomeItem VARCHAR(120) NULL,
    valorItem DECIMAL(10,2) NULL,
    PRIMARY KEY (id),
    KEY idx_doacoes_itens_doacaoId (doacaoId),
    KEY idx_doacoes_itens_recursoId (recursoId),
    CONSTRAINT fk_doacoes_itens_doacoes
        FOREIGN KEY (doacaoId) REFERENCES doacoes(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_doacoes_itens_recursos
        FOREIGN KEY (recursoId) REFERENCES recursos(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
