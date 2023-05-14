package pionpill.arcampus.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import pionpill.arcampus.back.service.MarkerService;
import pionpill.arcampus.back.vo.RespBean;

@RestController
public class MarkerController {
    @Autowired
    private MarkerService markerService;

    @GetMapping("/marker/geo")
    public RespBean getMarkersByGeo(Float lon, Float lat) {
        return markerService.getMarkersByGeo(lon, lat);
    }

    @GetMapping("/marker/common")
    public RespBean getCommonMarkers() {
        return markerService.getCommonMarkers();
    }

    @GetMapping("/marker/info")
    public RespBean getMarkerInfo(Long markerId) {
        return markerService.getMarkerInfoByMarkerId(markerId);
    }
}
