CREATE DATABASE IF NOT EXISTS arcampus;

USE arcampus;

CREATE TABLE
    IF NOT EXISTS model_control (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '模型 id',
        auto_rotate_speed INT COMMENT '模型自动旋转速度',
        background BOOLEAN COMMENT '模型是否需要环境背景',
        preset ENUM (
            'sunset',
            'dawn',
            'night',
            'warehouse',
            'forest',
            'apartment',
            'studio',
            'city',
            'park',
            'lobby'
        ) COMMENT '模型环境背景',
        blur FLOAT COMMENT '背景模糊程度',
        speed FLOAT COMMENT '模型浮动速度',
        rotation_intensity float COMMENT '浮动时自旋速度',
        float_intensity float COMMENT '浮动强度',
        create_time DATETIME NOT NULL COMMENT '用户创建时的时间',
        update_time DATETIME NOT NULL COMMENT '用户信息更新的时间'
    );