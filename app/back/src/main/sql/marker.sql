CREATE DATABASE IF NOT EXISTS arcampus;

USE arcampus;

CREATE TABLE IF NOT EXISTS marker
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键',
    marker_type ENUM ('common','area')  NOT NULL COMMENT '标记类型',
    file_type   ENUM ('pattern', 'nft') NOT NULL COMMENT '文件类型',
    file_url    VARCHAR(255)            NOT NULL COMMENT '文件对应 URL',
    info_id     BIGINT COMMENT '需要显示的标记信息，对应标记信息表 id',
    model_id    BIGINT COMMENT '需要显示的模型 id, 对应模型表 id',
    author_id   BIGINT COMMENT '作者 id, 对应用户表 id',
    lat         FLOAT COMMENT '地理经度位置',
    lon         FLOAT COMMENT '地理纬度位置',
    create_time DATETIME                NOT NULL COMMENT '用户创建时的时间',
    update_time DATETIME                NOT NULL COMMENT '用户信息更新的时间'
);

INSERT INTO marker (marker_type, file_type, file_url, info_id, author_id, create_time, update_time)
VALUES ('common', 'pattern', 'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/patt/hiro.patt',
        1, 201983290194, NOW(), NOW()),
       ('common', 'nft', 'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/patt/trex-image-big',
        2, 201983290194, NOW(), NOW())