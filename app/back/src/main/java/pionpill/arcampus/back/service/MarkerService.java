package pionpill.arcampus.back.service;

import pionpill.arcampus.back.vo.RespBean;

public interface MarkerService {
    public RespBean getCommonMarkers();

    public RespBean getMarkersByGeo(Float lon, Float lat);

    public RespBean getMarkerInfoByMarkerId(Long markerId);
}
