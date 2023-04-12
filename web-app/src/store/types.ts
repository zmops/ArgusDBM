import type { RouteRecordRaw } from 'vue-router';
import type { CallbackDataParams } from 'echarts/types/dist/shared';

export interface TagProps {
  title: string;
  name: string;
  fullPath: string;
  query?: any;
  ignoreCache?: boolean;
}

export interface TabBarState {
  tagList: TagProps[];
  cacheTabList: Set<string>;
}

export interface routerState {
  routes: RouteRecordRaw[];
  addRoutes: RouteRecordRaw[];
}

export interface ToolTipFormatterParams extends CallbackDataParams {
  axisDim: string;
  axisIndex: number;
  axisType: string;
  axisId: string;
  axisValue: string;
  axisValueLabel: string;
}
