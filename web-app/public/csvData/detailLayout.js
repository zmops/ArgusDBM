const data = 'mysql,基本信息,单指标,mysql.status.uptime,Single,,0,0,6,3,,,,5\n' +
  'mysql,基本信息,单指标,mysql.basic.version,Single,,0,6,6,3,,,,5\n' +
  'mysql,基本信息,单指标,mysql.performance.qps,SingleGraph,,0,12,6,3,,,,\n' +
  'mysql,基本信息,单指标,mysql.basic.innodb_buffer_pool_size,SingleGraph,,0,18,6,3,,,,\n' +
  'mysql,基本信息,单指标,mysql.connection.max_used_connections,SingleGraph,,3,0,6,3,,,,\n' +
  'mysql,基本信息,单指标,mysql.performance.questions,SingleGraph,,3,6,6,3,,,,\n' +
  'mysql,基本信息,单指标,mysql.table_cache.table_open_cache_miss_ratio,SingleGraph,,3,12,6,3,,,,\n' +
  'mysql,基本信息,单指标,mysql.basic.table_open_cache,SingleGraph,,3,18,6,3,,,,\n' +
  'mysql,基本信息,指标组合,cb.mysql.connections,Graph,,6,0,12,8,,,,\n' +
  'mysql,基本信息,指标组合,cb.mysql.thread_activity,Graph,,6,12,12,8,,,,\n' +
  'mysql,基本信息,指标组合,cb.mysql.handlers,Graph,堆叠,14,0,12,8,,,,\n' +
  'mysql,基本信息,指标组合,cb.mysql.com_counters,Graph,堆叠,14,12,12,8,,,,\n' +
  'mysql,基本信息,单指标,mysql.process_state.num,Graph,堆叠,22,0,24,8,,,,\n' +
  'mysql,连接&线程,指标组合,cb.mysql.connections,Graph,,0,0,24,8,连接,,,\n' +
  'mysql,连接&线程,指标组合,cb.mysql.aborted_connections,Graph,,8,0,24,8,中止的连接,,,\n' +
  'mysql,连接&线程,指标组合,cb.mysql.thread_activity,Graph,,16,0,24,8,客户端线程活动,,,\n' +
  'mysql,连接&线程,指标组合,cb.mysql.thread_cache,Graph,,24,0,24,8,线程缓存,,,\n' +
  'mysql,查询性能,单指标,mysql.performance.current_qps,Graph,,0,0,24,8,当前QPS,,,\n' +
  'mysql,查询性能,指标组合,cb.mysql.tmp_obj,Graph,,8,0,24,8,临时对象,,,\n' +
  'mysql,查询性能,指标组合,cb.mysql.select_types,Graph,,16,0,12,8,Select类型,,,\n' +
  'mysql,查询性能,指标组合,cb.mysql.sorts,Graph,,16,12,12,8,排序,,,\n' +
  'mysql,查询性能,指标组合,cb.mysql.table_locks,Graph,,24,0,12,8,表锁,,,\n' +
  'mysql,查询性能,单指标,mysql.performance.questions,Graph,,24,12,12,8,Questions,,,\n' +
  'mysql,查询性能,单指标,mysql.slow_sql.sql_text,TableView,,32,0,24,8,慢SQL,,,\n' +
  'mysql,命令&句柄&进程,指标组合,cb.mysql.com_counters,Graph,堆叠,0,0,24,8,命令计数器,,,\n' +
  'mysql,命令&句柄&进程,指标组合,cb.mysql.handlers_no_trans,Graph,堆叠,8,0,24,8,非事务句柄,,,\n' +
  'mysql,命令&句柄&进程,指标组合,cb.mysql.handlers_trans,Graph,堆叠,16,0,24,8,事务句柄,,,\n' +
  'mysql,命令&句柄&进程,单指标,mysql.process_state.num,Graph,堆叠,24,0,24,8,进程状态,,,\n' +
  'pgsql,基本信息,单指标,pgsql.status.uptime,Single,,0,0,6,3,,,,\n' +
  'pgsql,基本信息,单指标,pgsql.basic.version,Single,,0,6,6,3,,,,\n' +
  'pgsql,基本信息,单指标,pgsql.resource_config.shared_buffers,SingleGraph,,0,12,6,3,,,,\n' +
  'pgsql,基本信息,单指标,pgsql.resource_config.work_mem,SingleGraph,,0,18,6,3,,,,\n' +
  'pgsql,基本信息,单指标,pgsql.resource_config.state,SingleGraph,,3,0,6,3,,,,\n' +
  'pgsql,基本信息,单指标,pgsql.resource_config.max_connections,SingleGraph,,3,6,6,3,,,,\n' +
  'pgsql,基本信息,单指标,pgsql.resource_config.effective_cache_size,SingleGraph,,3,12,6,3,,,,\n' +
  'pgsql,基本信息,单指标,pgsql.resource_config.wal_buffers,SingleGraph,,3,18,6,3,,,,\n' +
  'pgsql,基本信息,单指标,pgsql.connection_state.num,Graph,,6,0,12,8,,,,\n' +
  'pgsql,基本信息,指标组合,cb.pgsql.tuples,Graph,,6,12,12,8,,,,\n' +
  'pgsql,基本信息,指标组合,cb.pgsql.transactions,Graph,,14,0,12,8,,,,\n' +
  'pgsql,基本信息,单指标,pgsql.transaction_state.duration,Graph,,14,12,12,8,,,,\n' +
  'pgsql,基本信息,单指标,pgsql.temp_file.num,Graph,,22,0,12,8,,,,\n' +
  'pgsql,基本信息,单指标,pgsql.temp_file.size,Graph,,22,12,12,8,,,,\n' +
  'pgsql,行查询,指标组合,cb.pgsql.tuples,Graph,,0,0,24,8,,,,\n' +
  'pgsql,行查询,指标组合,cb.pgsql.tuples_read_by_queries,Graph,,8,0,24,8,,,,\n' +
  'pgsql,行查询,指标组合,cb.pgsql.tuples_change_by_queries,Graph,,16,0,24,8,,,,\n' +
  'pgsql,行查询,单指标,pgsql.connection_db.active,Graph,堆叠,24,0,24,6,库活动连接数,,,\n' +
  'pgsql,锁与性能,指标组合,cb.pgsql.conflicts_deadlocks,Graph,,0,0,12,8,,,,\n' +
  'pgsql,锁与性能,单指标,pgsql.lock_num.num,Graph,,0,12,12,8,,,,\n' +
  'pgsql,锁与性能,单指标,pgsql.operation.read,Graph,,8,0,12,8,,,,\n' +
  'pgsql,锁与性能,单指标,pgsql.operation.write,Graph,,8,12,12,8,,,,\n' +
  'pgsql,锁与性能,指标组合,cb.pgsql.buffers,Graph,,16,0,12,8,,,,\n' +
  'pgsql,锁与性能,指标组合,cb.pgsql.canceled_queries,Graph,,16,12,12,8,,,,\n' +
  'pgsql,锁与性能,单指标,pgsql.cache_hit_ratio.ratio,Graph,,24,0,12,8,,,,\n' +
  'pgsql,锁与性能,指标组合,cb.pgsql.checkpoint_stats,Graph,,24,12,12,8,,,,\n' +
  'pgsql,锁与性能,单指标,pgsql.slow_sql.sql_text,TableView,,32,0,24,8,,,,\n' +
  'pgsql,临时文件,单指标,pgsql.temp_file.num,Graph,,0,0,24,8,,,,\n' +
  'pgsql,临时文件,单指标,pgsql.temp_file.size,Graph,,8,0,24,8,,,,\n' +
  'pgsql,临时文件,单指标,pgsql.temp_file.activity,Graph,,16,0,24,8,,,,\n' +
  'pgsql,临时文件,单指标,pgsql.temp_file.util,Graph,,24,0,24,8,,,,\n' +
  'oracle,基本信息,单指标,oracle.status.uptime,Single,,0,0,6,3,,,,\n' +
  'oracle,基本信息,单指标,oracle.basic.version,Single,,0,6,6,3,,,,\n' +
  'oracle,基本信息,单指标,oracle.process.process_count,SingleGraph,,0,12,6,3,,,,\n' +
  'oracle,基本信息,单指标,oracle.transaction.commits,SingleGraph,,0,18,6,3,,,,\n' +
  'oracle,基本信息,单指标,oracle.session.total_sessions,SingleGraph,,3,0,6,3,,,,\n' +
  'oracle,基本信息,单指标,oracle.session.active_sessions,SingleGraph,,3,6,6,3,,,,\n' +
  'oracle,基本信息,单指标,oracle.execute.executes,SingleGraph,,3,12,6,3,,,,\n' +
  'oracle,基本信息,单指标,oracle.transaction.rollbacks,SingleGraph,,3,18,6,3,,,,\n' +
  'oracle,基本信息,单指标,oracle.performance.qps,Graph,,6,0,12,8,,,,\n' +
  'oracle,基本信息,单指标,oracle.performance.tps,Graph,,6,12,12,8,,,,\n' +
  'oracle,基本信息,单指标,oracle.performance.mbps,Graph,,14,0,12,8,,,,\n' +
  'oracle,基本信息,单指标,oracle.performance.sql_resp_time,Graph,,14,12,12,8,,,,\n' +
  'oracle,基本信息,指标组合,cb.oracle.cache_hit_ratio,Graph,,22,0,12,8,,,,\n' +
  'oracle,基本信息,单指标,oracle.res_util.res_util,Graph,,22,12,12,8,,,,\n' +
  'oracle,基本信息,单指标,oracle.perf_collector.total_collection,Single,,30,0,6,3,,,,\n' +
  'oracle,基本信息,单指标,oracle.perf_collector.final_collection_time,SingleGraph,,30,6,6,3,,,,\n' +
  'oracle,表空间,单指标,oracle.tablespace.name,TableView,,0,0,24,20,,,,\n' +
  'oracle,等待时间,单指标,oracle.wait.concurrent_wait_time,Graph,,0,0,12,8,,,,\n' +
  'oracle,等待时间,单指标,oracle.wait.commit_wait_time,Graph,,0,12,12,8,,,,\n' +
  'oracle,等待时间,单指标,oracle.wait.app_wait_time,Graph,,8,0,12,8,,,,\n' +
  'oracle,等待时间,单指标,oracle.wait.network_wait_time,Graph,,8,12,12,8,,,,\n' +
  'oracle,等待时间,单指标,oracle.wait.system_io_wait_time,Graph,,16,0,12,8,,,,\n' +
  'oracle,等待时间,单指标,oracle.wait.user_io_wait_time,Graph,,16,12,12,8,,,,\n' +
  'oracle,等待时间,单指标,oracle.wait.configure_wait_time,Graph,,24,0,12,8,,,,\n' +
  'oracle,等待时间,单指标,oracle.wait.scheduler_wait_time,Graph,,24,12,12,8,,,,'

export default data
