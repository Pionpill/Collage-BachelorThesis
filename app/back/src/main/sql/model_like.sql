CREATE DATABASE IF NOT EXISTS arcampus;

USE arcampus;

CREATE TABLE IF NOT EXISTS model_like
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    user_id     BIGINT   NOT NULL COMMENT '用户 id',
    model_id    BIGINT   NOT NULL COMMENT '模型 id',
    create_time DATETIME NOT NULL COMMENT '收藏时间'
);

INSERT INTO model_like(user_id, model_id, create_time) VALUES (201983290194, 1, NOW());
INSERT INTO model_like(user_id, model_id, create_time) VALUES (201983290194, 2, NOW());
INSERT INTO model_like(user_id, model_id, create_time) VALUES (201983290194, 3, NOW());
INSERT INTO model_like(user_id, model_id, create_time) VALUES (201983290194, 4, NOW());
INSERT INTO model_like(user_id, model_id, create_time) VALUES (201983290194, 5, NOW());
INSERT INTO model_like(user_id, model_id, create_time) VALUES (201983290195, 1, NOW());
INSERT INTO model_like(user_id, model_id, create_time) VALUES (201983290195, 3, NOW());
INSERT INTO model_like(user_id, model_id, create_time) VALUES (201983290195, 5, NOW());
INSERT INTO model_like(user_id, model_id, create_time) VALUES (201983290196, 1, NOW());