package pionpill.arcampus.back.service;

import pionpill.arcampus.back.dto.ModelUploadDTO;
import pionpill.arcampus.back.vo.RespBean;

public interface ModelService {
    public RespBean getModelById(Long id);

    public RespBean getModelControlByModelId(Long modelId);

    public RespBean searchModelsByTitle(String name);

    public RespBean getLatestUpdateModels();

    public RespBean getLatestCreateModels();

    public RespBean getSubscribeModels(Long userId);

    public RespBean getModelLikeCountsById(Long id);

    public RespBean isLikedByUser(Long modelId, long userId);

    public RespBean addModelLike(Long modelId, Long userId);

    public RespBean deleteModelLike(Long modelId, Long userId);

    public RespBean uploadModel(ModelUploadDTO modelUploadDTO);
}
