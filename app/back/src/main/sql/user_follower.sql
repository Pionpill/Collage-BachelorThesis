-- Active: 1662816647653@@127.0.0.1@3306@arcampus

CREATE DATABASE IF NOT EXISTS arcampus;

USE arcampus;

CREATE TABLE
    IF NOT EXISTS user_follower (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
        user_id BIGINT NOT NULL COMMENT '被关注着 id',
        follower_id BIGINT NOT NULL COMMENT '追随者 id',
        create_time DATETIME NOT NULL COMMENT '记录创建时间'
    );

INSERT INTO
    user_follower (
        user_id,
        follower_id,
        create_time
    )
VALUES (
        201983290194,
        201983290195,
        NOW()
    ), (
        201983290194,
        201983290196,
        NOW()
    ), (
        201983290194,
        201983290197,
        NOW()
    ), (
        201983290195,
        201983290194,
        NOW()
    ), (
        201983290196,
        201983290194,
        NOW()
    )