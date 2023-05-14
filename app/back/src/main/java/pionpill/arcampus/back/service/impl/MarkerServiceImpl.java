package pionpill.arcampus.back.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pionpill.arcampus.back.dao.entity.Marker;
import pionpill.arcampus.back.dao.entity.MarkerInfo;
import pionpill.arcampus.back.dao.repos.MarkerInfoRepository;
import pionpill.arcampus.back.dao.repos.MarkerRepository;
import pionpill.arcampus.back.service.MarkerService;
import pionpill.arcampus.back.vo.RespBean;

@Service
public class MarkerServiceImpl implements MarkerService {
    @Autowired
    private MarkerRepository markerRepository;

    @Autowired
    private MarkerInfoRepository markerInfoRepository;

    @Override
    public RespBean getCommonMarkers() {
        List<Marker> markersList = markerRepository.findAllByMarkerType("common");
        return RespBean.success("获取识别标记数据", markersList);
    }

    @Override
    public RespBean getMarkersByGeo(Float lon, Float lat) {
        Float len = 0.01f;
        List<Marker> markersList = markerRepository.findAllByLonBetweenAndLatBetween(lon - len, lon + len, lat - len,
                lat + len);
        return RespBean.success("获取识别标记数据", markersList);
    }

    @Override
    public RespBean getMarkerInfoByMarkerId(Long markerId) {
        Optional<Marker> marker = markerRepository.findById(markerId);
        Long infoId = marker.get().getInfoId();
        Optional<MarkerInfo> markerInfo = markerInfoRepository.findById(infoId);
        if (!markerInfo.isPresent())
            return RespBean.error("不存在对应标记信息");
        else
            return RespBean.success("返回对应标记信息", markerInfo.get());

    }
}
