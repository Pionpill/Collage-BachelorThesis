package pionpill.arcampus.back.dto;

import lombok.Data;

@Data
public class ModelUploadDTO {
    private String modelUrl;
    private String coverUrl;
    private String title;
    private String info;

    private Float autoRotateSpeed;
    private Boolean background;
    private String preset;
    private Float blur;
    private Float speed;
    private Float rotationIntensity;
    private Float floatIntensity;
    private Long authorId;

    public boolean hasControl() {
        return autoRotateSpeed != null || background != null || preset != null || blur != null || speed != null
                || rotationIntensity != null || floatIntensity != null;
    }
}
