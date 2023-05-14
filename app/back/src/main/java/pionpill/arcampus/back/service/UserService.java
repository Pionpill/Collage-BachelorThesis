package pionpill.arcampus.back.service;

import pionpill.arcampus.back.dto.LoginDTO;
import pionpill.arcampus.back.dto.RegistryDTO;
import pionpill.arcampus.back.vo.RespBean;

public interface UserService {
    public RespBean login(LoginDTO loginDTO);

    public RespBean registry(RegistryDTO registryDTO);

    public RespBean getUserById(Long userId);

    public RespBean getUserCollections(Long userId);

    public RespBean getUserFollowers(Long userId);

    public RespBean getUserSubscribes(Long userId);

    public RespBean getUserCollectionCounts(Long userId);

    public RespBean getUserFollowerCounts(Long userId);

    public RespBean getUserSubscribeCounts(Long userId);

    public RespBean isModelCollected(long userId, Long modelId);

    public RespBean addUserCollection(Long userId, Long modelId);

    public RespBean deleteUserCollection(Long userId, Long modelId);

    public RespBean banUser(Long id);

    public RespBean changeSignature(Long userId, String signature);

    public RespBean subscribe(Long userId, Long followerId);

    public RespBean unSubscribe(Long userId, Long followerId);

    public RespBean isFollow(Long userId, Long followerId);
}
