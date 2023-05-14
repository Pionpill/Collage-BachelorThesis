CREATE DATABASE IF NOT EXISTS arcampus;

USE arcampus;

CREATE TABLE IF NOT EXISTS user_collection
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    user_id     BIGINT   NOT NULL COMMENT '用户 id',
    model_id    BIGINT   NOT NULL COMMENT '模型 id',
    create_time DATETIME NOT NULL COMMENT '收藏时间'
);

INSERT INTO user_collection(user_id, model_id, create_time)
VALUES (201983290194, 1, NOW()),
       (201983290194, 2, NOW()),
       (201983290194, 3, NOW())