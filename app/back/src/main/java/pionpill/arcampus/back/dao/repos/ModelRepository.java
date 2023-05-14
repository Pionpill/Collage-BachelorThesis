package pionpill.arcampus.back.dao.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pionpill.arcampus.back.dao.entity.Model;

public interface ModelRepository extends JpaRepository<Model, Long> {
    List<Model> findAllByTitleLike(String title);

    List<Model> findAllByAuthorId(Long authorId);
}
