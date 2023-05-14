package pionpill.arcampus.back.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import pionpill.arcampus.back.dao.entity.Model;
import pionpill.arcampus.back.dao.entity.UniversityUser;
import pionpill.arcampus.back.dao.entity.User;
import pionpill.arcampus.back.dao.entity.UserCollection;
import pionpill.arcampus.back.dao.entity.UserFollower;
import pionpill.arcampus.back.dao.repos.ModelRepository;
import pionpill.arcampus.back.dao.repos.UniversityUserRepository;
import pionpill.arcampus.back.dao.repos.UserCollectionRepository;
import pionpill.arcampus.back.dao.repos.UserFollowerRepository;
import pionpill.arcampus.back.dao.repos.UserRepository;
import pionpill.arcampus.back.dto.LoginDTO;
import pionpill.arcampus.back.dto.RegistryDTO;
import pionpill.arcampus.back.service.UserService;
import pionpill.arcampus.back.utils.RSAUtils;
import pionpill.arcampus.back.vo.RespBean;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UniversityUserRepository universityUserRepository;
    @Autowired
    private UserFollowerRepository userFollowerRepository;
    @Autowired
    private UserCollectionRepository userCollectionRepository;
    @Autowired
    private ModelRepository modelRepository;

    @Override
    public RespBean login(LoginDTO loginDTO) {
        User user = null;
        if (loginDTO.getType().equals("email"))
            user = userRepository.findByEmail(loginDTO.getNameOrEmail());
        else
            user = userRepository.findByName(loginDTO.getNameOrEmail());
        if (user == null)
            return RespBean.error("无效的用户名或邮箱");
        if (!user.getPassword().equals(loginDTO.getPassword()))
            return RespBean.error("密码错误");
        if (user.getBan() == true)
            return RespBean.error("用户已被注销，请联系工作人员激活");
        return RespBean.success("登录成功", user.getId());
    }

    @Override
    public RespBean registry(RegistryDTO registryDTO) {
        Long id = registryDTO.getId();
        String name = registryDTO.getName();
        String password = RSAUtils.decrypt(registryDTO.getPassword());
        String permission = registryDTO.getPermission();
        String email = registryDTO.getEmail();
        String avatarUrl = registryDTO.getAvatarUrl();
        System.out.println(password);
        if (hasName(name))
            return RespBean.error("该用户名已被注册，请换一个");
        if (hasEmail(email))
            return RespBean.error("该邮箱已被注册");
        if (userRepository.findById(id).isPresent())
            return RespBean.error("该编号对应的账户已注册");
        // 验证权限
        Optional<UniversityUser> universityUser = universityUserRepository.findById(id);
        System.out.println(permission);
        if (!universityUser.isPresent())
            return RespBean.error("校园系统中不存在此学号/编号");
        else if (!universityUser.get().getIdentity().equals(permission))
            return RespBean.error("权限不匹配");

        // 验证权限组
        Timestamp createTime = new Timestamp(System.currentTimeMillis());
        User newUser = User.builder().id(
                id).name(name)
                .password(password).permission(permission)
                .email(email).avatarUrl(avatarUrl).createTime(createTime).updateTime(createTime).build();
        System.out.println(newUser);
        userRepository.save(newUser);
        return RespBean.success("注册成功!");
    }

    @Override
    public RespBean getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent())
            return RespBean.error("对应id用户不存在");
        else
            return RespBean.success("获取用户信息", user);
    }

    @Override
    public RespBean getUserCollectionCounts(Long userId) {
        Long count = userCollectionRepository.countByUserId(userId);
        return RespBean.success("获取用户收藏信息成功", count);
    }

    @Override
    public RespBean getUserFollowerCounts(Long userId) {
        int count = userFollowerRepository.findAllByUserId(userId).size();
        return RespBean.success("获取用户粉丝信息成功", count);
    }

    @Override
    public RespBean getUserSubscribeCounts(Long userId) {
        int count = userFollowerRepository.findAllByFollowerId(userId).size();
        return RespBean.success("获取用户关注信息成功", count);
    }

    @Override
    public RespBean getUserCollections(Long userId) {
        List<UserCollection> userCollectionsList = userCollectionRepository.findAllByUserId(userId);
        List<Model> modelList = new ArrayList<Model>();
        for (UserCollection userCollection : userCollectionsList) {
            Optional<Model> model = modelRepository.findById(userCollection.getModelId());
            modelList.add(model.get());
        }
        return RespBean.success("获取用户收藏信息成功", modelList);
    }

    @Override
    public RespBean getUserFollowers(Long userId) {
        List<UserFollower> userFollowerList = userFollowerRepository.findAllByUserId(userId);
        List<User> userList = new ArrayList<User>();
        for (UserFollower userFollower : userFollowerList) {
            Optional<User> user = userRepository.findById(userFollower.getFollowerId());
            if (user.isPresent())
                userList.add(user.get());
        }
        return RespBean.success("获取用户粉丝信息成功", userList);
    }

    @Override
    public RespBean getUserSubscribes(Long userId) {
        List<UserFollower> userFollowerList = userFollowerRepository.findAllByFollowerId(userId);
        List<User> userList = new ArrayList<User>();
        for (UserFollower userFollower : userFollowerList) {
            Optional<User> user = userRepository.findById(userFollower.getUserId());
            userList.add(user.get());
        }
        return RespBean.success("获取用户订阅者信息成功", userList);
    }

    private boolean hasName(String name) {
        User user = userRepository.findByName(name);
        return user != null;
    }

    private boolean hasEmail(String email) {
        User user = userRepository.findByName(email);
        return user != null;
    }

    @Override
    public RespBean isModelCollected(long userId, Long modelId) {
        boolean result = userCollectionRepository.existsByUserIdAndModelId(userId, modelId);
        return RespBean.success("判断成功", result);
    }

    @Override
    public RespBean addUserCollection(Long userId, Long modelId) {
        if (userCollectionRepository.existsByUserIdAndModelId(userId, modelId))
            return RespBean.error("记录已存在");
        UserCollection userCollection = UserCollection.builder().userId(userId).modelId(modelId).build();
        userCollectionRepository.save(userCollection);
        return RespBean.success("成功添加收藏", true);
    }

    @Override
    @Transactional
    public RespBean deleteUserCollection(Long userId, Long modelId) {
        if (!userCollectionRepository.existsByUserIdAndModelId(userId, modelId))
            return RespBean.error("记录不存在");
        userCollectionRepository.deleteByUserIdAndModelId(userId, modelId);
        return RespBean.success("成功删除收藏", false);
    }

    @Override
    public RespBean banUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent())
            return RespBean.error("需要注销的账户不存在");
        User user = optionalUser.get();
        user.setBan(true);
        userRepository.save(user);
        return RespBean.success("账户注销成功");
    }

    @Override
    public RespBean changeSignature(Long userId, String signature) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent())
            return RespBean.error("需要修改签名的账户不存在");
        User user = optionalUser.get();
        user.setSignature(signature);
        userRepository.save(user);
        return RespBean.success("用户修改签名成功");
    }

    @Override
    public RespBean subscribe(Long userId, Long followerId) {
        if (userFollowerRepository.existsByUserIdAndFollowerId(userId, followerId))
            return RespBean.error("已订阅");
        UserFollower userFollower = UserFollower.builder().userId(userId).followerId(followerId).build();
        userFollowerRepository.save(userFollower);
        return RespBean.success("订阅成功");
    }

    @Override
    @Transactional
    public RespBean unSubscribe(Long userId, Long followerId) {
        userFollowerRepository.deleteByUserIdAndFollowerId(userId, followerId);
        return RespBean.success("取消订阅成功");
    }

    @Override
    public RespBean isFollow(Long userId, Long followerId) {
        boolean result = userFollowerRepository.existsByUserIdAndFollowerId(userId, followerId);
        return RespBean.success("成功查询关注信息", result);
    }
}
