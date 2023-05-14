package pionpill.arcampus.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pionpill.arcampus.back.dto.ModelUploadDTO;
import pionpill.arcampus.back.service.ModelService;
import pionpill.arcampus.back.vo.RespBean;

@RestController
public class ModelController {
    @Autowired
    private ModelService modelService;

    @GetMapping("/model")
    public RespBean getModelById(Long id) {
        return modelService.getModelById(id);
    }

    @GetMapping("/model/search")
    public RespBean getModelsByName(String title) {
        return modelService.searchModelsByTitle(title);
    }

    @GetMapping("/model/like/count")
    public RespBean getModelLikeCountsById(Long id) {
        return modelService.getModelLikeCountsById(id);
    }

    @GetMapping("/model/recommend")
    public RespBean getRecommendModels() {
        return modelService.getLatestCreateModels();
    }

    @GetMapping("/model/latest")
    public RespBean getLatestModels() {
        return modelService.getLatestUpdateModels();
    }

    @GetMapping("model/subscribe")
    public RespBean getSubscribeModels(Long userId) {
        return modelService.getSubscribeModels(userId);
    }

    @GetMapping("model/like/judge")
    public RespBean isModelLikedByUser(Long modelId, Long userId) {
        return modelService.isLikedByUser(modelId, userId);
    }

    @GetMapping("model/control")
    public RespBean getModelControlByModelId(Long id) {
        return modelService.getModelControlByModelId(id);
    }

    @GetMapping("model/like/add")
    public RespBean addModelLike(Long modelId, Long userId) {
        return modelService.addModelLike(modelId, userId);
    }

    @GetMapping("model/like/delete")
    public RespBean deleteModelLike(Long modelId, Long userId) {
        return modelService.deleteModelLike(modelId, userId);
    }

    @PostMapping("/model/upload")
    public RespBean upload(@RequestBody ModelUploadDTO modelUploadDTO) {
        return modelService.uploadModel(modelUploadDTO);
    }
}
