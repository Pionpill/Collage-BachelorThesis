package pionpill.arcampus.back.dao.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pionpill.arcampus.back.dao.entity.UserCollection;

public interface UserCollectionRepository extends JpaRepository<UserCollection, Long> {
  List<UserCollection> findAllByUserId(Long id);

  List<UserCollection> findAllByModelId(Long id);

  UserCollection findByUserIdAndModelId(Long userId, Long modelId);

  void deleteByUserIdAndModelId(Long userId, Long modelId);

  Long countByUserId(Long userId);

  Long countByModelId(Long userId);

  boolean existsByUserIdAndModelId(Long userId, Long modelId);
}
