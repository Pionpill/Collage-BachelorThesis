CREATE DATABASE IF NOT EXISTS arcampus;

USE arcampus;

CREATE TABLE
    IF NOT EXISTS marker_info (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
        cover_url VARCHAR(255) NOT NULL COMMENT '封面图',
        title VARCHAR(20) NOT NULL COMMENT '名称',
        abstract_info VARCHAR(50) NOT NULL COMMENT '简介',
        detail_info VARCHAR(255) COMMENT '详细信息',
        author_id BIGINT COMMENT '作者id',
        location VARCHAR(20) COMMENT '地点',
        create_time DATETIME NOT NULL COMMENT '用户创建时的时间',
        update_time DATETIME NOT NULL COMMENT '用户信息更新的时间'
    );

INSERT INTO marker_info
VALUES (
        1,
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/marker_hiro.png',
        '测试标记',
        '这是一个测试标记',
        '这是一个测试标记，用于测试 ar.js 提供的标记追踪功能。需要获取 patt 标记格式，具体转换方式见 ar.js 文档。',
        201983290194,
        null,
        NOW(),
        NOW()
    ), (
        2,
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/marker_trex-image-big.jpg',
        '测试图像',
        '这是一个测试图像',
        '这是一个测试图像，用于测试 ar.js 提供的图像识别功能。需要将图像转换为 nft 文件，具体转换方式见 ar.js 文档。',
        201983290194,
        null,
        NOW(),
        NOW()
    )