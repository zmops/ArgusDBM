package com.zmops.open.common.service;

import com.zmops.open.common.entity.job.Job;
import com.zmops.open.common.entity.manager.ParamDefine;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author tom
 * @date 2023/3/2 15:36
 */
public class AppDefineHouse {

    private static final Map<String, Job> APP_DEFINES = new ConcurrentHashMap<>();
    private static final Map<String, List<ParamDefine>> PARAM_DEFINES = new ConcurrentHashMap<>();

    public static void flushDefine(Map<String, Job> defines, Map<String, List<ParamDefine>> params) {
        APP_DEFINES.clear();
        APP_DEFINES.putAll(defines);
        PARAM_DEFINES.clear();
        PARAM_DEFINES.putAll(params);
    }

    public static Job getAppDefine(String app) {
        return APP_DEFINES.get(app);
    }

    public static List<ParamDefine> getParamDefines(String app) {
        return PARAM_DEFINES.get(app);
    }

}
