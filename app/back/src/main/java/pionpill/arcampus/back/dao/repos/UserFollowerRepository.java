package pionpill.arcampus.back.dao.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pionpill.arcampus.back.dao.entity.UserFollower;

public interface UserFollowerRepository extends JpaRepository<UserFollower, Long> {
    List<UserFollower> findAllByUserId(Long id);

    List<UserFollower> findAllByFollowerId(Long id);

    void deleteByUserIdAndFollowerId(Long userId, Long followerId);

    boolean existsByUserIdAndFollowerId(Long userId, Long followerId);
}
