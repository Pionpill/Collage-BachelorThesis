package pionpill.arcompus.back.dao.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue
    private Integer id;
    private String userName;
    private String password;
    private String email;
    private String phone;
    private Integer permission;
}
