package pionpill.arcampus.back.dao.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import pionpill.arcampus.back.dao.entity.ModelLike;

public interface ModelLikeRepository extends JpaRepository<ModelLike, Long> {
    Long countByModelId(Long modelId);

    boolean existsByModelIdAndUserId(Long modelId, Long userId);

    void deleteByModelIdAndUserId(Long modelId, Long userId);
}
