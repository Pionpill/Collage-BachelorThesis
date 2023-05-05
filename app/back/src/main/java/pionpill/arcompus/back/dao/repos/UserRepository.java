package pionpill.arcompus.back.dao.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import pionpill.arcompus.back.dao.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
