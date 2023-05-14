package pionpill.arcampus.back.dto;

import lombok.Data;

@Data
public class RegistryDTO {
  private String name;
  private String permission;
  private String password;
  private Long id;
  private String email;
  private String avatarUrl;
}
