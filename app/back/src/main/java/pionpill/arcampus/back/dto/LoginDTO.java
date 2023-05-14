package pionpill.arcampus.back.dto;

import lombok.Data;

@Data
public class LoginDTO {
  private String nameOrEmail;
  private String type;
  private String password;
}
