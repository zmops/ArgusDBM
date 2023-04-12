export interface loginParams {
  username?: string;
  password?: string;
  identifier?: string;
  credential?: string;
  type?: string;
}

export interface loginResponse {
  token: string;
  refreshToken: string;
}

export interface userResponse {
  username?: string;
  roles?: string[];
}

export type SummaryStaticResponse = { key: string; count: number }[];

export interface SummaryStaticItem {
  app: string;
  unReachableSize: number;
  size: number;
  unAvailableSize: number;
  category: string;
  availableSize: number;
  unManageSize: number;
  status: string | number;
}

export interface SummaryStatic {
  apps: SummaryStaticItem[];
}

export interface AlertSummary {
  dealNum: number;
  priorityCriticalNum: number;
  priorityEmergencyNum: number;
  priorityWarningNum: number;
  rate: number;
  total: number;
}

export interface ApiAlertDefine {
  cascadeValues: string[];
  app: string;
  template: string;
  creator?: string;
  modifier?: string;
  preset: boolean;
  priority: number;
  gmtCreate?: string;
  times: number;
  field: string;
  metric: string;
  enable: boolean;
  gmtUpdate?: string;
  expr: string;
  id?: number;
}

export interface sysInterface {
  name: string;
  type: number[];
  phone: string;
  email: string;
  wechatId?: string;
  accessToken?: string;
  hookUrl?: string;
  tgBotToken?: string;
  tgUserId?: string;
  id?: string;
  slackWebHookUrl?: string;
  discordChannelId?: string;
  discordBotToken?: string;
}
