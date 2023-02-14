package com.zmops.open.manager.pojo.dto;

import com.zmops.open.common.entity.manager.ParamDefine;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * @author tom
 * @date 2023/2/14 17:54
 */
@Data
@Builder
@Schema(description = "用户信息实体")
public class UserInfo {
    private String username;

    private List<String> roles;

}
