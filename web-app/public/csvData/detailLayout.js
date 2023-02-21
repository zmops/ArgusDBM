const data = 'mysql,基本信息,单指标,mysql.status.uptime,Single,,0,0,6,3,,,,5,,\n' +
  'mysql,基本信息,单指标,mysql.basic.version,Single,,0,6,6,3,,,,5,,\n' +
  'mysql,基本信息,单指标,mysql.performance.qps,SingleGraph,,0,12,6,3,,,,,,\n' +
  'mysql,基本信息,单指标,mysql.innodb.innodb_buffer_pool_size,SingleGraph,,0,18,6,3,,,,,,\n' +
  'mysql,基本信息,单指标,mysql.handler.handler_used_ratio,SingleGraph,,3,0,6,3,,,,,,\n' +
  'mysql,基本信息,单指标,mysql.table_cache.table_open_cache_miss_ratio,SingleGraph,,3,6,6,3,,,,,,\n' +
  'mysql,基本信息,单指标,mysql.table_cache.table_open_cache_size,SingleGraph,,3,12,6,3,,,,,,\n' +
  'mysql,基本信息,单指标,mysql.table_cache.table_definition_cache_size,SingleGraph,,3,18,6,3,,,,,,\n' +
  'mysql,基本信息,指标组合,cb.mysql.connections,Graph,,6,0,12,8,,,,,,\n' +
  'mysql,基本信息,指标组合,cb.mysql.thread_activity,Graph,,6,12,12,8,,,,,,\n' +
  'mysql,基本信息,指标组合,cb.mysql.handlers,Graph,堆叠,14,0,12,8,,,,,,\n' +
  'mysql,基本信息,指标组合,cb.mysql.com_counters,Graph,堆叠,14,12,12,8,,,,,,\n' +
  'mysql,基本信息,单指标,mysql.process_state.num,Graph,堆叠,22,0,12,8,,,,,,\n' +
  'mysql,基本信息,指标组合,cb.mysql.net_traffic,Graph,堆叠,22,12,12,8,,,,,,\n' +
  'mysql,连接&线程,指标组合,cb.mysql.connections,Graph,,0,0,24,8,连接,,,,,\n' +
  'mysql,连接&线程,指标组合,cb.mysql.aborted_connections,Graph,,8,0,24,8,中止的连接,,,,,\n' +
  'mysql,连接&线程,指标组合,cb.mysql.thread_activity,Graph,,16,0,24,8,客户端线程活动,,,,,\n' +
  'mysql,连接&线程,指标组合,cb.mysql.thread_cache,Graph,,24,0,24,8,线程缓存,,,,,\n' +
  'mysql,查询性能,单指标,mysql.performance.current_qps,Graph,,0,0,24,8,当前QPS,,,,,\n' +
  'mysql,查询性能,指标组合,cb.mysql.tmp_obj,Graph,,8,0,12,8,临时对象,,,,,\n' +
  'mysql,查询性能,单指标,mysql.performance.slow_queries,Graph,,8,12,12,8,慢查询,,,,,\n' +
  'mysql,查询性能,指标组合,cb.mysql.select_types,Graph,,16,0,12,8,Select类型,,,,,\n' +
  'mysql,查询性能,指标组合,cb.mysql.sorts,Graph,,16,12,12,8,排序,,,,,\n' +
  'mysql,查询性能,指标组合,cb.mysql.table_locks,Graph,,24,0,12,8,表锁,,,,,\n' +
  'mysql,查询性能,单指标,mysql.performance.questions,Graph,,24,12,12,8,Questions,,,,,\n' +
  'mysql,查询性能,指标组合,cb.mysql.query_cache_memory,Graph,,32,0,12,8,查询缓存内存,,,,,\n' +
  'mysql,查询性能,指标组合,cb.mysql.query_cache_activity,Graph,,32,12,12,8,查询缓存活动,,,,,\n' +
  'mysql,查询性能,单指标,mysql.performance.slow_sql,TableView,,40,0,24,8,慢SQL,,,,,\n' +
  'mysql,命令&句柄&进程,指标组合,cb.mysql.com_counters,Graph,堆叠,0,0,24,8,命令计数器,,,,,\n' +
  'mysql,命令&句柄&进程,指标组合,cb.mysql.handlers_no_trans,Graph,堆叠,8,0,24,8,非事务句柄,,,,,\n' +
  'mysql,命令&句柄&进程,指标组合,cb.mysql.handlers_trans,Graph,堆叠,16,0,24,8,事务句柄,,,,,\n' +
  'mysql,命令&句柄&进程,单指标,mysql.process_state.num,Graph,堆叠,24,0,24,8,进程状态,,,,,'

export default data
