import { ApiMonitorSummary, getMonitors } from '@/service/api';
import { formatter2Number } from '@/utils';

export const Monitors = (params, tableData, total)=>{
  getMonitors(params).then((res) => {
    if (res.data) {
      total.value = res.data.totalElements;
      tableData.value = res.data.content;

    }
  });
};

export const getMonitorSummary = (params, tableData)=>{

  ApiMonitorSummary(params).then((res) => {
    if (res.code !== 0 || !res.data) {
      return;
    }

    const metrics = res.data.content.map((i) => {
      const { metrics } = i;
      const obj = {};
      Object.keys(metrics).forEach((key) => {
        obj[key.replace('.', '_')] = formatter2Number(metrics[key]) ;
      }
      );
      return obj;
    });

    if (res.data) {
      tableData.value = tableData.value.map((item: Object, index) => {
        return {
          ...item,
          ...metrics[index] || {}
        };
      });
    }
  }
  );
};
