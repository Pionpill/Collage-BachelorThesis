CREATE DATABASE IF NOT EXISTS arcampus;

USE arcampus;

CREATE TABLE
    IF NOT EXISTS model (
        id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '模型 id',
        author_id BIGINT COMMENT '作者id',
        control_id BIGINT COMMENT '模型控制参数对应控制表主键',
        cover_url VARCHAR(255) NOT NULL UNIQUE COMMENT '模型封面图',
        title VARCHAR(20) NOT NULL UNIQUE COMMENT '模型标题',
        abstract VARCHAR(255) NOT NULL COMMENT '模型介绍',
        model_url VARCHAR(255) NOT NULL UNIQUE COMMENT '模型存储地址',
        create_time DATETIME NOT NULL COMMENT '用户创建时的时间',
        update_time DATETIME NOT NULL COMMENT '用户信息更新的时间'
    );

INSERT INTO
    model (
        cover_url,
        author_id,
        title,
        abstract,
        model_url,
        control_id,
        create_time,
        update_time
    )
VALUES (
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_shoe.png',
        201983290194,
        'Nike Air 跑鞋',
        'Max Air 是 Nike 首款采用可视化 Air 技术的鞋款产品。Nike 传奇设计师汀克·哈特菲尔德从巴黎蓬皮杜中心前卫的开放式建筑中汲取设计灵感，在鞋底处切出一个小窗口，并因此创造出 Air Max。这款鞋一经推出便引起了轰动，全凭一己之力掀起了制鞋业的一场革命。',
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/air_zoom.glb',
        null,
        NOW(),
        NOW()
    ), (
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_mac.png',
        201983290195,
        '苹果 Mac 笔记本',
        'Macintosh（简称Mac）是苹果公司自1984年起开发的个人消费型计算机，包含如：iMac、Mac mini、Macbook Air、Macbook Pro、Macbook、Mac Pro等计算机。使用独立的macOS系统，最新的macOS系列基于NeXT系统开发，不支持兼容。是一套完备而独立的操作系统。',
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/mac-draco.glb',
        null,
        NOW(),
        NOW()
    ), (
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_robot.png',
        201983290196,
        '机器人',
        '机器人（Robot）是一种能够半自主或全自主工作的智能机器。机器人能够通过编程和自动控制来执行诸如作业或移动等任务。历史上最早的机器人见于隋炀帝命工匠按照柳抃形象所营造的木偶机器人，施有机关，有坐、起、拜、伏等能力。机器人具有感知、决策、执行等基本特征，可以辅助甚至替代人类完成危险、繁重、复杂的工作，提高工作效率与质量，服务人类生活，扩大或延伸人的活动及能力范围。',
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/s2wt_kamdo_industrial_divinities-transformed.glb',
        null,
        NOW(),
        NOW()
    ), (
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_chair.png',
        201983290197,
        'Minecraft 风格的椅子',
        '这是一个体素模型，Minecraft 风格的椅子，可能是用 BlockBench 或其他三维软件创作的',
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/bench_minecraft.glb',
        null,
        NOW(),
        NOW()
    ), (
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_maple.png',
        201983290194,
        '枫树模型',
        '这是一个枫树模型，这个模型很大，3M 左右，并且多变形很多，可以用来测试手机性能。',
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/japanese_maple.glb',
        null,
        NOW(),
        NOW()
    ), (
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/images/model_light.png',
        201983290195,
        '灯',
        '这是一个灯模型',
        'https://pionpill-1316521854.cos.ap-shanghai.myqcloud.com/bacheior_thesis/model/scifi_light_05.glb',
        null,
        NOW(),
        NOW()
    )