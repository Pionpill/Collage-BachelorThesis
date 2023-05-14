package pionpill.arcampus.back.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import pionpill.arcampus.back.dao.entity.Model;
import pionpill.arcampus.back.dao.entity.ModelControl;
import pionpill.arcampus.back.dao.entity.ModelLike;
import pionpill.arcampus.back.dao.entity.UserFollower;
import pionpill.arcampus.back.dao.repos.ModelControlRepository;
import pionpill.arcampus.back.dao.repos.ModelLikeRepository;
import pionpill.arcampus.back.dao.repos.ModelRepository;
import pionpill.arcampus.back.dao.repos.UserFollowerRepository;
import pionpill.arcampus.back.dto.ModelUploadDTO;
import pionpill.arcampus.back.service.ModelService;
import pionpill.arcampus.back.vo.RespBean;

@Service
public class ModelServiceImpl implements ModelService {
    @Autowired
    private ModelRepository modelRepository;
    @Autowired
    private UserFollowerRepository userFollowerRepository;
    @Autowired
    private ModelLikeRepository modelLikeRepository;

    @Autowired
    private ModelControlRepository modelControlRepository;

    @Override
    public RespBean getModelById(Long id) {
        Optional<Model> model = modelRepository.findById(id);
        if (!model.isPresent())
            return RespBean.error("对应id模型不存在");
        else
            return RespBean.success("获取模型信息", model.get());
    }

    @Override
    public RespBean getModelControlByModelId(Long id) {
        Optional<Model> model = modelRepository.findById(id);
        if (!model.isPresent())
            return RespBean.error("对应id模型不存在");
        Long controlId = model.get().getControlId();
        if (controlId == null)
            return RespBean.success("该模型不存在控制参数");
        Optional<ModelControl> modelControl = modelControlRepository.findById(controlId);
        if (!modelControl.isPresent())
            return RespBean.error("对应id模型控制不存在");
        else
            return RespBean.success("获取模型信息", modelControl.get());
    }

    @Override
    public RespBean searchModelsByTitle(String title) {
        List<Model> modelList = modelRepository.findAllByTitleLike("%" + title + "%");
        if (modelList.size() == 0)
            return RespBean.error("未匹配到对应名称的模型");
        else
            return RespBean.success("匹配到模型", modelList);
    }

    @Override
    public RespBean getLatestUpdateModels() {
        Sort sort = Sort.by(Sort.Direction.DESC, "updateTime");
        List<Model> modelList = modelRepository.findAll(sort);
        if (modelList.size() == 0)
            return RespBean.error("无任何模型");
        else
            return RespBean.success("获取最新上传的模型", modelList);
    }

    @Override
    public RespBean getLatestCreateModels() {
        Sort sort = Sort.by(Sort.Direction.DESC, "createTime");
        List<Model> modelList = modelRepository.findAll(sort);
        if (modelList.size() == 0)
            return RespBean.error("无任何模型");
        else
            return RespBean.success("获取最新上传的模型", modelList);
    }

    @Override
    public RespBean getSubscribeModels(Long userId) {
        List<UserFollower> userFollowerList = userFollowerRepository.findAllByFollowerId(userId);
        List<Model> models = new ArrayList<Model>();
        for (UserFollower userFollower : userFollowerList) {
            List<Model> partModels = modelRepository.findAllByAuthorId(userFollower.getUserId());
            models.addAll(partModels);
        }
        return RespBean.success("获取订阅模型", models);
    }

    @Override
    public RespBean getModelLikeCountsById(Long id) {
        Long count = modelLikeRepository.countByModelId(id);
        return RespBean.success("获取模型喜欢数成功", count);
    }

    @Override
    public RespBean isLikedByUser(Long modelId, long userId) {
        boolean result = modelLikeRepository.existsByModelIdAndUserId(modelId, userId);
        return RespBean.success("判断成功", result);
    }

    @Override
    public RespBean addModelLike(Long modelId, Long userId) {
        if (modelLikeRepository.existsByModelIdAndUserId(modelId, userId))
            return RespBean.error("记录已存在");
        ModelLike modelLike = ModelLike.builder().userId(userId).modelId(modelId).build();
        modelLikeRepository.save(modelLike);
        return RespBean.success("成功添加喜欢", true);
    }

    @Override
    @Transactional
    public RespBean deleteModelLike(Long modelId, Long userId) {
        if (!modelLikeRepository.existsByModelIdAndUserId(modelId, userId))
            return RespBean.error("记录不存在");
        modelLikeRepository.deleteByModelIdAndUserId(modelId, userId);
        return RespBean.success("成功删除喜欢", false);
    }

    @Override
    public RespBean uploadModel(ModelUploadDTO dto) {
        Long modelControlId = null;
        if (dto.hasControl()) {
            ModelControl newModelControl = ModelControl.builder().autoRotateSpeed(dto.getAutoRotateSpeed())
                    .background(dto.getBackground()).preset(dto.getPreset()).blur(dto.getBlur()).speed(dto.getSpeed())
                    .rotationIntensity(dto.getRotationIntensity()).floatIntensity(dto.getFloatIntensity()).build();
            newModelControl = modelControlRepository.save(newModelControl);
            modelControlId = newModelControl.getId();
        }
        Model newModel = Model.builder().modelUrl(dto.getModelUrl()).coverUrl(dto.getCoverUrl())
                .title(dto.getTitle())
                .abstractInfo(dto.getInfo()).authorId(dto.getAuthorId()).controlId(modelControlId).build();
        modelRepository.save(newModel);
        return RespBean.success("成功上传模型");
    }
}
