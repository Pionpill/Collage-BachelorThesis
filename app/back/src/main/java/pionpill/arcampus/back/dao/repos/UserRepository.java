package pionpill.arcampus.back.dao.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import pionpill.arcampus.back.dao.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(String name);

    User findByEmail(String email);
}
