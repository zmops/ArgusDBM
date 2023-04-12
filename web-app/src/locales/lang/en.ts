export default {
  lang: 'English',
  route: {
    'dashboard': 'Dashboard',
    'documentation': 'Documentation',
    'monitor': 'monitor',
    'guide': 'Guide',
    'permission': 'Permission',
    'pagePermission': 'Page Permission',
    'rolePermission': 'Role Permission',
    'directivePermission': 'Directive Permission',
    'icons': 'Icons',
    'components': 'Components',
    'tinymce': 'Tinymce',
    'markdown': 'Markdown',
    'jsonEditor': 'JSON Editor',
    'dndList': 'Dnd List',
    'splitPane': 'SplitPane',
    'avatarUpload': 'Avatar Upload',
    'dropzone': 'Dropzone',
    'sticky': 'Sticky',
    'countTo': 'Count To',
    'componentMixin': 'Mixin',
    'backToTop': 'Back To Top',
    'dragDialog': 'Drag Dialog',
    'dragSelect': 'Drag Select',
    'dragKanban': 'Drag Kanban',
    'charts': 'Charts',
    'keyboardChart': 'Keyboard Chart',
    'lineChart': 'Line Chart',
    'mixChart': 'Mix Chart',
    'example': 'Example',
    'nested': 'Nested Routes',
    'menu1': 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    'menu2': 'Menu 2',
    'Table': 'Table',
    'dynamicTable': 'Dynamic Table',
    'dragTable': 'Drag Table',
    'inlineEditTable': 'Inline Edit',
    'complexTable': 'Complex Table',
    'tab': 'Tab',
    'form': 'Form',
    'createArticle': 'Create Article',
    'editArticle': 'Edit Article',
    'articleList': 'Article List',
    'errorPages': 'Error Pages',
    'page401': '401',
    'page404': '404',
    'errorLog': 'Error Log',
    'excel': 'Excel',
    'exportExcel': 'Export Excel',
    'selectExcel': 'Export Selected',
    'mergeHeader': 'Merge Header',
    'uploadExcel': 'Upload Excel',
    'zip': 'Zip',
    'pdf': 'PDF',
    'exportZip': 'Export Zip',
    'theme': 'Theme',
    'clipboardDemo': 'Clipboard',
    'i18n': 'I18n',
    'externalLink': 'External Link',
    'profile': 'Profile'
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
    processingStatus: 'processing status',
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
    select: '请选择',
    mark: {
      processed: 'mark processed',
      unprocessed: 'mark unprocessed',
      clear: 'clear mark'
    }
  },
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    size: 'Global Size',
    docs: 'Docs',
    securitySetting: 'Security Setting'
  },
  login: {
    title: 'Login Form',
    logIn: 'Login',
    username: 'Username',
    password: 'Password',
    any: 'any',
    autoLogin: 'Auto Login',
    forgetPassword: 'Forget Password',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases, using v-permission will have no effect_ For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom_ You can only do this with v-if_',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time_ You can briefly introduce the features of the project_ Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits_ In the process of selecting rich texts, I also took a lot of detours_ The common rich texts on the market have been basically used, and I finally chose Tinymce_ See the more detailed rich text comparison and introduction_',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself_ It is very simple, you can see the detail code in @/components/Dropzone_',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top_',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return_ If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version_'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  example: {
    warning: 'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name_ If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage_ Or do not use keep-alive include to cache all pages directly_ See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock_ Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions_',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips: 'Here we use window_print() to implement the feature of downloading PDF_'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios_ Refer to the documentation for details_'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    langage: 'Langage',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  alert: {
    title: 'warning',
    status: {
      title: 'Status',
      all: 'all',
      0: 'not processed',
      2: 'Restored',
      3: 'Processed'
    },
    priority: {
      title: '告警级别',
      all: '全部',
      0: '紧急告警',
      1: '严重告警',
      2: '警告告警'
    },
    onlineStatus: {
      title: 'online Status',
      all: 'All',
      online: 'Online',
      offline: 'Offline'
    },
    name: 'Name',
    ip: 'IP/Domain',
    tag: 'Tag',
    form: {
      content: {
        title: 'warning content',
        placeholder: 'please enter warning content'
      },
      submit: 'submit',
      reset: 'reset'
    }
  },
  input: {
    placeholder: 'please enter content'
  },

  message: {
    switchLanguageSuccess: 'Switch Language Success'
  }
};
