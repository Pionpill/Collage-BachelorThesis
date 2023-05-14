package pionpill.arcampus.back.dao.entity;

import java.sql.Timestamp;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table
@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private Long id;
    private String name;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String avatarUrl;
    private String sexual;
    private String permission;
    private String college;
    private String department;
    private String signature;
    private String tags;
    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean ban;
    @CreatedDate
    private Timestamp createTime;
    @CreatedBy
    private Timestamp updateTime;
}
