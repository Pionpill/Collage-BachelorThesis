CREATE DATABASE IF NOT EXISTS arcampus;

USE arcampus;

CREATE TABLE
    IF NOT EXISTS user (
        id BIGINT PRIMARY KEY COMMENT '对应校园用户表id，即学号或职工编号',
        name VARCHAR(20) UNIQUE NOT NULL COMMENT '用户昵称',
        email VARCHAR(50) NOT NULL UNIQUE COMMENT '邮箱',
        password VARCHAR(20) NOT NULL COMMENT '密码',
        avatar_url VARCHAR(255) COMMENT '用户头像',
        sexual ENUM (
            'male',
            'female',
            'secret',
            'undefined'
        ) DEFAULT 'undefined' COMMENT '用户性别',
        permission ENUM (
            'student',
            'teacher',
            'admin',
            'visitor'
        ) NOT NULL COMMENT '用户所属权限组',
        college VARCHAR(255) COMMENT '用户所属学院',
        department VARCHAR(255) COMMENT '用户所属部门/专业',
        signature VARCHAR(255) COMMENT '用户签名',
        tags VARCHAR(255) COMMENT '用户身份标签',
        ban Boolean DEFAULT(false) COMMENT '用户是否被注销',
        create_time DATETIME NOT NULL COMMENT '用户创建时的时间',
        update_time DATETIME NOT NULL COMMENT '用户信息更新的时间'
    );

INSERT INTO user
VALUES (
        201983290194,
        '吴鼎',
        '673486387@qq.com',
        '673486387!',
        'https://avatars.githubusercontent.com/u/70939356?s=128&v=',
        'male',
        'admin',
        '软件学院',
        '软件工程',
        '这是一条用户签名',
        '大四',
        false,
        NOW(),
        NOW()
    ), (
        201983290195,
        '北岸',
        '123456789@exmaple.com',
        '673486387!',
        'https://q2.qlogo.cn/headimg_dl?dst_uin=673486387&spec=100',
        'male',
        'admin',
        '软件学院',
        '软件工程',
        '北岸就是北岸',
        '大四',
        false,
        NOW(),
        NOW()
    ), (
        201983290196,
        '小鸡炖蘑菇',
        '123456788@exmaple.com',
        '673486387!',
        'https://q2.qlogo.cn/headimg_dl?dst_uin=673486387&spec=100',
        'male',
        'admin',
        '软件学院',
        '软件工程',
        '小鸡炖蘑菇就是小鸡炖蘑菇',
        '大四',
        false,
        NOW(),
        NOW()
    ), (
        201983290197,
        '小葱拌豆腐',
        '123456787@exmaple.com',
        '673486387!',
        'https://q2.qlogo.cn/headimg_dl?dst_uin=673486387&spec=100',
        'male',
        'admin',
        '软件学院',
        '软件工程',
        '小葱拌豆腐就是小葱拌豆腐',
        '大四',
        false,
        NOW(),
        NOW()
    ), (
        201983290001,
        '学生',
        '123456786@exmaple.com',
        '673486387!',
        'https://avatars.githubusercontent.com/u/70939356?s=128&v=',
        'female',
        'student',
        '软件学院',
        '软件工程',
        '这是一个并不存在的测试学生用户',
        null,
        false,
        NOW(),
        NOW()
    ), (
        201983290002,
        '教师',
        '123456785@exmaple.com',
        '673486387!',
        'https://avatars.githubusercontent.com/u/70939356?s=128&v=',
        'secret',
        'teacher',
        '软件学院',
        '软件工程',
        '这是一个并不存在的测试教师用户',
        null,
        false,
        NOW(),
        NOW()
    );