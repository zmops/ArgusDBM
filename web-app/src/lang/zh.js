export default {
  route: {
    dashboard: '概览',
    monitor: '监控',
    warn: '告警',
    warnInfo: '告警消息',
    warnRules: '告警规则',
    notificationRules: '通知规则',
    sysreceiver: '接收人管理',
    targetView: '指标视图',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    theme: '换肤',
    i18n: '国际化',
    profile: '个人中心'
  },
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    docs: '使用手册',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小',
    securitySetting: '修改密码'
  },
  login: {
    title: 'ArgusDBM',
    subtitle: '快捷好用的数据库运维监控',
    formtip: '账号密码登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  buttons: {
    search: '查询',
    add: '新增',
    edit: '修改',
    delete: '删除',
    reset: '重置',
    markup: '标记已处理',
    markdown: '标记未处理',
    clear: '一键清空',
    unionMonitor: '关联监控',
    save: '保存',
    canel: '取消',
    detected:'测试'
  },
  tableView: {
    empty: '暂无数据！',
    status: '启用状态',
    onlineStatus: '在线状态',
    all: '全部',
    enable: '启用',
    disable: '禁用',
    monitoring: '监控名称',
    underMonitoring: '所属监控',
    alarmLevel: '告警级别',
    alarmTime: '告警时间',
    alarmContent: '告警内容',
    ip: 'IP/域名',
    tag: '标签',
    search: '查询',
    reset: '重置',
    add: '添加',
    delete: '删除',
    edit: '编辑',
    online: '在线',
    offline: '离线',
    serial: '序号',
    version: '版本',
    runningTime: '运行时长',
    connected: '已连接会话',
    activity: '活动会话',
    inquire: '查询',
    append: '新增',
    update: '更新',
    submit: '提交',
    rollback: '回滚',
    read: '读取数据',
    write: '写入数据',
    operate: '操作',
    input: '请输入',
    select: '请选择'
  },

  monitor: {
    '': '监控',
    'name': '监控名称',
    'name.tip': '标识监控的名称,名称需要保证唯一性',
    'host': '监控Host',
    'host.tip': '被监控的对端IP或域名',
    'description': '描述备注',
    'description.tip': '更多标识和描述此监控的备注信息',
    'intervals': '采集间隔(秒)',
    'intervals.tip': '监控周期性采集数据间隔时间,单位秒',
    'category': {
      '': '监控类别',
      'service': '应用服务',
      'db': '数据库',
      'os': '操作系统',
      'mid': '中间件',
      'custom': '自定义监控'
    },
    'app': {
      '': '监控类型',
      'website': '网站监测',
      'api': 'HTTP API',
      'http': 'HTTP API',
      'ping': 'PING连通性',
      'port': '端口可用性',
      'mysql': 'Mysql',
      'oracle': 'Oracle',
      'redis': 'Redis',
      'fullsite': '全站监控'
    },
    'status': {
      '': '监控状态',
      'all': '全部状态',
      'available': '正常监控',
      'unavailable': '不可用',
      'unreachable': '不可达',
      'un-manage': '未管理'
    }
  },
  alert: {
    '': '告警',
    'status': {
      '': '状态',
      'all': '全部',
      '0': '未处理',
      '2': '已恢复',
      '3': '已处理'
    },
    'priority': {
      '': '告警级别',
      'all': '全部',
      '0': '紧急告警',
      '1': '严重告警',
      '2': '警告告警'
    },
    'form': {
      'content': {
        '': '告警内容',
        'placeholder': '请输入告警内容'
      }
    }
  },
  warnRules: {
    form: {
      '': '告警规则',
      'field': '指标对象',
      'field.collapse': '一致性 Consistency',
      'field.collapse.tip1': '选中的标签对象',
      'field.collapse.tip2': '所属行其它指标对象',
      'field.collapse.tip3': '${instance} : 所属行实例',
      'field.collapse.tip4': '支持操作符函数 : equals(str1,str2), ==, <, <=,>, >=, !=, ( ), +, -, &&, ||',
      'expr': '阈值触发表达式',
      'expr.placeholder': '根据此表达式计算判断是否触发阈值.示例: responseTime>40',
      'expr.tip': '根据此表达式来计算判断是否触发阈值,表达式环境变量和操作符见上方',
      'priority': '告警级别',
      'priority.tip': '触发阈值的告警级别,从低到高依次为:警告-warning，严重-critical，紧急-emergency',
      'times': '触发次数',
      'times.tip': '设置触发阈值多少次之后才会发送告警',
      'times.collapse': '支持的通知模版环境变量',
      'times.collapse.tip1': '${app} : 监控类型名称',
      'times.collapse.tip2': '${metrics} : 监控指标集合名称',
      'times.collapse.tip3': '${metric} : 监控指标名称',
      'times.collapse.tip4': '监控指标对象值',
      'times.collapse.tip5': '所属行其它指标对象',
      'times.collapse.tip6': '${instance} : 所属行实例值',
      'template': '通知模版',
      'template.placeholder': "请输入告警的通知模版.示例: ${app}.${metrics}.${metric}'s value is too high",
      'template.tip': '告警触发后发送的通知信息模版,模版环境变量见上方',
      'preset': '全局默认',
      'preset.tip': '此告警阈值配置是否应用于全局所有此类型监控',
      'enable': '启用告警',
      'enable.tip': '此告警阈值配置开启生效或关闭'
    },
    table: {
      presetleftText: '是',
      presetrightText: '否'
    },
    dialog: {
      '': '告警定义关联监控'
    },
    rules: {
      'cascadeValues': '请选择指标对象',
      'expr': '请输入阈值触发表达式',
      'priority': '请选择告警级别',
      'times': '请选择触发次数',
      'template': '请输入通知模版'
    }
  },
  notificationRules: {
    form: {
      '': '通知规则',
      'name': '规则名称',
      'name.placeholder': '请输入规则名称',
      'receiverName': '接收人',
      'receiverName.placeholder': '请选择接收人',
      'filterAll': '转发所有告警',
      'tags': '标签过滤',
      'tags.tip': '请选择标签过滤',
      'priorities': '级别过滤',
      'priorities.placeholder': '请选择级别过滤',
      'type': '通知方式',
      'type.placeholder': '请选择通知方式',
      'enable': '是否启用',
      'gmtUpdate': '更新时间'
    },
    table: {
      presetleftText: '是',
      presetrightText: '否'
    },
    rules: {
      'receiverId': '请选择接收人',
      'name': '请输入规则名称'
    }
  },
  sysReceiver: {
    form: {
      '': '接收人管理',
      'name': '接收人名称',
      'name.placeholder': '请输入接收人名称',
      'type': '通知方式',
      'type.placeholder': '请选择通知方式',
      'phone': '电话',
      'phone.placeholder': '请输入电话',
      'email': '邮箱',
      'email.placeholder': '请输入邮箱',
      'wechatId': '企业微信号',
      'wechatId.placeholder': '请输入企业微信号',
      'accessToken': '钉钉号',
      'accessToken.placeholder': '请输入钉钉号',
      'hookUrl': 'Webhook URL',
      'hookUrl.placeholder': '请输入Webhook URL',
      'gmtUpdate': '更新时间'
    },
    rules: {
      'name': '请输入接收人名称',
      'type': '请选择通知方式'
    }
  },
  minitorFormComponent:{
    form: {
      '': '',
      'name': '监控名称',
      'name.placeholder': '标识监控的名称,名称需要保证唯一性',
      'name.tip': '标识监控的名称,名称需要保证唯一性',
      'intervals': '采集间隔(秒)',
      'intervals.tip': '监控周期性采集数据间隔时间,单位秒',
      'detected': '测试连接',
      'detected.tip': '新增监控前是否先探测检查监控可用性',
      'description': '描述备注',
      'description.placeholder': '请输入描述备注',
      'description.tip': '更多标识和描述此监控的备注信息',
      'gmtUpdate': '更新时间'
    },
    rules: {
      'name': '请输入监控名称'
    },
    common:{
      'notempty':'不能为空',
      'monitor':'监控',
      'modify':'修改',
      'add':'新增'
    }
  },
  message: {
    'noselectTips': '请至少选择一行进行操作',
    'markupTips': '是否将选中项标记为已处理？',
    'markdownTips': '是否将选中项标记为未处理？',
    'deleteTips': '是否确认删除数据项？',
    'clearTips': '请确认是否清空所有告警信息！',
    switchLanguageSuccess: '语言切换成功,即将刷新页面'
  }
}
