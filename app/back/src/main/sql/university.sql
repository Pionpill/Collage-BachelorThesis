CREATE DATABASE IF NOT EXISTS arcampus;

USE arcampus;

CREATE TABLE IF NOT EXISTS university
(
    id          BIGINT PRIMARY KEY COMMENT '学号或职工编号',
    identity    ENUM ('student', 'teacher', 'staff') NOT NULL COMMENT '人员身份',
    real_name   VARCHAR(20)                          NOT NULL COMMENT '真实姓名',
    id_number   CHAR(18) UNIQUE                      NOT NULL COMMENT '身份证号',
    create_time DATETIME                             NOT NULL COMMENT '用户创建时的时间',
    update_time DATETIME                             NOT NULL COMMENT '用户信息更新的时间'
);

INSERT INTO university
VALUES (201983290194, 'student', '吴鼎', '429000200004166734', NOW(), NOW()),
       (201983290195, 'student', '北岸', '429000200004166735', NOW(), NOW()),
       (201983290196, 'student', '小鸡炖蘑菇', '429000200004166736', NOW(), NOW()),
       (201983290197, 'student', '小葱拌豆腐', '429000200004166737', NOW(), NOW()),
       (201983290001, 'student', '张三', '123000200000000001', NOW(), NOW()),
       (201983290002, 'teacher', '李四', '123000200000000002', NOW(), NOW()),
       (201983290003, 'staff', '王五', '123000200000000003', NOW(), NOW());