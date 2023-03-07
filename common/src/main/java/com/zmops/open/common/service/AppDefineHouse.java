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

    private static final Map<String, Job> appDefines = new ConcurrentHashMap<>();
    private static final Map<String, List<ParamDefine>> paramDefines = new ConcurrentHashMap<>();

    public static void flushDefine(Map<String, Job> defines, Map<String, List<ParamDefine>> params) {
        appDefines.clear();
        appDefines.putAll(defines);
        paramDefines.clear();
        paramDefines.putAll(params);
    }

    public static Job getAppDefine(String app) {
        return appDefines.get(app);
    }

    public static List<ParamDefine> getParamDefines(String app) {
        return paramDefines.get(app);
    }

}
