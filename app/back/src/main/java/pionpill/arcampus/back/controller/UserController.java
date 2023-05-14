package pionpill.arcampus.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pionpill.arcampus.back.dto.LoginDTO;
import pionpill.arcampus.back.dto.RegistryDTO;
import pionpill.arcampus.back.service.UserService;
import pionpill.arcampus.back.vo.RespBean;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public RespBean login(@RequestBody LoginDTO loginDTO) {
        return userService.login(loginDTO);
    }

    @PostMapping("/registry")
    public RespBean registry(@RequestBody RegistryDTO registryDTO) {
        return userService.registry(registryDTO);
    }

    @GetMapping("/user")
    public RespBean getUserById(Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/user/ban")
    public RespBean banUser(Long id) {
        return userService.banUser(id);
    }

    @GetMapping("/user/collection")
    public RespBean getUserCollections(Long id) {
        return userService.getUserCollections(id);
    }

    @GetMapping("/user/collection/count")
    public RespBean getUserCollectionCounts(Long id) {
        return userService.getUserCollectionCounts(id);
    }

    @GetMapping("/user/follower")
    public RespBean getUserFollowers(Long id) {
        return userService.getUserFollowers(id);
    }

    @GetMapping("/user/follower/judge")
    public RespBean isFollow(Long userId, Long followerId) {
        return userService.isFollow(userId, followerId);
    }

    @GetMapping("/user/follower/count")
    public RespBean getUserFollowerCounts(Long id) {
        return userService.getUserFollowerCounts(id);
    }

    @GetMapping("/user/subscribe")
    public RespBean getUserSubscribes(Long id) {
        return userService.getUserSubscribes(id);
    }

    @GetMapping("/user/follower/subscribe")
    public RespBean subscribe(Long userId, Long followerId) {
        return userService.subscribe(userId, followerId);
    }

    @GetMapping("/user/follower/unSubscribe")
    public RespBean unSubscribe(Long userId, Long followerId) {
        return userService.unSubscribe(userId, followerId);
    }

    @GetMapping("/user/subscribe/count")
    public RespBean getUserSubscribeCounts(Long id) {
        return userService.getUserSubscribeCounts(id);
    }

    @GetMapping("user/collection/judge")
    public RespBean isModelCollectedByUser(Long userId, Long modelId) {
        return userService.isModelCollected(userId, modelId);
    }

    @GetMapping("user/collection/add")
    public RespBean addUserCollection(Long userId, Long modelId) {
        return userService.addUserCollection(userId, modelId);
    }

    @GetMapping("user/collection/delete")
    public RespBean deleteUserCollection(Long userId, Long modelId) {
        return userService.deleteUserCollection(userId, modelId);
    }

    @GetMapping("user/signature")
    public RespBean changeSignature(Long userId, String signature) {
        return userService.changeSignature(userId, signature);
    }
}
