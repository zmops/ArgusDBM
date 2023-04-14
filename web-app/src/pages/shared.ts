export interface formParamItem {
  field: string;
  hide?: boolean;
  name?: {
    'zh-CN': string;
    'en-US': string;
  };
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export const defaultFormData: {
  detected: boolean;
  monitor: {
    app?: string;
    intervals: number;
    name: string;
    host?: string;
    description: string;
    tags: any[];
  };
  params: formParamItem[];
} = {
  monitor: {
    name: 'localhost',
    intervals: 600,
    tags: [],
    description: ''
  },
  params: [],
  detected: true
};
export const Props = {
  visible: {
    type: Boolean,
    default: false,
  },
  editId: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: '',
  }
};

export const nameRules = [{
  required: true,
  message: '请输入监控名称',
  trigger: ['blur', 'change']
}];

export const reset = (form, formData, defaultForm) => {
  form.resetFields();

  Object.keys(form).forEach((key) => {
    formData[key] = defaultForm[key];
  });
};
