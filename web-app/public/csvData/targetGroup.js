const data = 'cb.mysql,connections,cb.mysql.connections,Connections,连接,"mysql.connection.max_connections\n' +
  'mysql.connection.connections\n' +
  'mysql.connection.max_used_connections",,,5,https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_max_connections\n' +
  'cb.mysql,aborted_connections,cb.mysql.aborted_connections,Aborted Connections,中止的连接,"mysql.connection.aborted_clients\n' +
  'mysql.connection.aborted_connects",**中止的连接**\\n\\n当给定主机连接到MySQL时，连接在中间中断（例如，由于凭证错误），MySQL会将该信息保留在系统表中（自5.6起，该表在performance_schema中公开）。\\n\\n如果没有成功连接的失败请求数量达到max_connect_errors的值，mysqld会认为有问题并阻止主机继续连接。\\n\\n要再次允许来自该主机的连接，需要执行``FLUSH HOSTS``语句。,"**Aborted Connections**\\n\\nWhen a given host connects to MySQL and the connection is interrupted in the middle (for example due to bad credentials), MySQL keeps that info in a system table (since 5.6 this table is exposed in performance_schema).\\n\\nIf the amount of failed requests without a successful connection reaches the value of max_connect_errors, mysqld assumes that something is wrong and blocks the host from further connection.\\n\\nTo allow connections from that host again, you need to issue the ``FLUSH HOSTS`` statement.",,\n' +
  'cb.mysql,thread_activity,cb.mysql.thread_activity,Client Thread Activity,客户端线程活动,"mysql.thread.threads_connected\n' +
  'mysql.thread.threads_running",,"**MySQL Active Threads**\\n\\nThreads Connected is the number of open connections, while Threads Running is the number of threads not sleeping.",,\n' +
  'cb.mysql,thread_cache,cb.mysql.thread_cache,Thread Cache,线程缓存,"mysql.thread.threads_created\n' +
  'mysql.thread.threads_cached\n' +
  'mysql.thread.thread_cache_size",,"**MySQL Thread Cache**\\n\\nThe thread_cache_size variable sets how many threads the server should cache to reuse. When a client disconnects, the client\'s threads are put in the cache if the cache is not full. It is autosized in MySQL 5.6.8 and above (capped to 100). Requests for threads are satisfied by reusing threads taken from the cache if possible, and only when the cache is empty is a new thread created.",,\n' +
  'cb.mysql,handlers,cb.mysql.handlers,Handlers,句柄,"mysql.handler.handler_commit\n' +
  'mysql.handler.handler_prepare\n' +
  'mysql.handler.handler_rollback\n' +
  'mysql.handler.handler_read_next\n' +
  'mysql.handler.handler_read_rnd_next\n' +
  'mysql.handler.handler_write\n' +
  'mysql.handler.handler_external_lock\n' +
  'mysql.handler.handler_read_key\n' +
  'mysql.handler.handler_update\n' +
  'mysql.handler.handler_delete\n' +
  'mysql.handler.handler_read_first\n' +
  'mysql.handler.handler_read_rnd",,"**MySQL Handlers**\\n\\nHandler statistics are internal statistics on how MySQL is selecting, updating, inserting, and modifying rows, tables, and indexes.\\n\\nThis is in fact the layer between the Storage Engine and MySQL.",,\n' +
  'cb.mysql,handlers_no_trans,cb.mysql.handlers_no_trans,Handlers,非事务句柄,"mysql.handler.handler_read_next\n' +
  'mysql.handler.handler_read_rnd_next\n' +
  'mysql.handler.handler_write\n' +
  'mysql.handler.handler_external_lock\n' +
  'mysql.handler.handler_read_key\n' +
  'mysql.handler.handler_update\n' +
  'mysql.handler.handler_delete\n' +
  'mysql.handler.handler_read_first\n' +
  'mysql.handler.handler_read_rnd",,"**MySQL Handlers**\\n\\nHandler statistics are internal statistics on how MySQL is selecting, updating, inserting, and modifying rows, tables, and indexes.\\n\\nThis is in fact the layer between the Storage Engine and MySQL.\\n\\n* `read_rnd_next` is incremented when the server performs a full table scan and this is a counter you don\'t really want to see with a high value.\\n* `read_key` is incremented when a read is done with an index.\\n* `read_next` is incremented when the storage engine is asked to \'read the next index entry\'. A high value means a lot of index scans are being done.",,\n' +
  'cb.mysql,handlers_trans,cb.mysql.handlers_trans,Transaction Handlers,事务句柄,"mysql.handler.handler_commit\n' +
  'mysql.handler.handler_prepare\n' +
  'mysql.handler.handler_rollback",,,,\n' +
  'cb.mysql,com_counters,cb.mysql.com_counters,Command Counters,命令计数器,"mysql.command.com_stmt_execute\n' +
  'mysql.command.com_update\n' +
  'mysql.command.com_begin\n' +
  'mysql.command.com_delete\n' +
  'mysql.command.com_insert\n' +
  'mysql.command.com_commit\n' +
  'mysql.command.com_select\n' +
  'mysql.command.com_admin_commands\n' +
  'mysql.command.com_show_status\n' +
  'mysql.command.com_show_slave_status\n' +
  'mysql.command.com_set_option",,"**Top Command Counters**\\n\\nThe Com_{{xxx}} statement counter variables indicate the number of times each xxx statement has been executed. There is one status variable for each type of statement. For example, Com_delete and Com_update count [``DELETE``](https://dev.mysql.com/doc/refman/5.7/en/delete.html) and [``UPDATE``](https://dev.mysql.com/doc/refman/5.7/en/update.html) statements, respectively. Com_delete_multi and Com_update_multi are similar but apply to [``DELETE``](https://dev.mysql.com/doc/refman/5.7/en/delete.html) and [``UPDATE``](https://dev.mysql.com/doc/refman/5.7/en/update.html) statements that use multiple-table syntax.",,\n' +
  'cb.mysql,net_traffic,cb.mysql.net_traffic,Network Traffic,网络流量,"mysql.net.net_outbound\n' +
  'mysql.net.net_inbound",,**MySQL Network Traffic**\\n\\nHere we can see how much network traffic is generated by MySQL. Outbound is network traffic sent from MySQL and Inbound is network traffic MySQL has received.,,\n' +
  'cb.mysql,tmp_obj,cb.mysql.tmp_obj,Temporary Objects,临时对象,"mysql.tmp.created_tmp_tables\n' +
  'mysql.tmp.created_tmp_disk_tables\n' +
  'mysql.tmp.created_tmp_files",,,,\n' +
  'cb.mysql,select_types,cb.mysql.select_types,Select Types,Select类型,"mysql.select_type.select_full_join\n' +
  'mysql.select_type.select_full_range_join\n' +
  'mysql.select_type.select_range\n' +
  'mysql.select_type.select_range_check\n' +
  'mysql.select_type.select_scan",,"**MySQL Select Types**\\n\\nAs with most relational databases, selecting based on indexes is more efficient than scanning an entire table\'s data. Here we see the counters for selects not done with indexes.",,\n' +
  'cb.mysql,sorts,cb.mysql.sorts,Sorts,排序,"mysql.sort.sort_rows\n' +
  'mysql.sort.sort_range\n' +
  'mysql.sort.sort_merge_passes\n' +
  'mysql.sort.sort_scan",,"**MySQL Sorts**\\n\\nDue to a query\'s structure, order, or other requirements, MySQL sorts the rows before returning them. For example, if a table is ordered 1 to 10 but you want the results reversed, MySQL then has to sort the rows to return 10 to 1.\\n\\nThis graph also shows when sorts had to scan a whole table or a given range of a table in order to return the results and which could not have been sorted via an index.",,\n' +
  'cb.mysql,table_locks,cb.mysql.table_locks,Table Locks,表锁,"mysql.table_lock.table_locks_immediate\n' +
  'mysql.table_lock.table_locks_waited",,"**Table Locks**\\n\\nMySQL takes a number of different locks for varying reasons. In this graph we see how many Table level locks MySQL has requested from the storage engine. In the case of InnoDB, many times the locks could actually be row locks as it only takes table level locks in a few specific cases.\\n\\nIt is most useful to compare Locks Immediate and Locks Waited. If Locks waited is rising, it means you have lock contention. Otherwise, Locks Immediate rising and falling is normal activity.",,\n' +
  'cb.mysql,query_cache_memory,cb.mysql.query_cache_memory,Query Cache Memory,查询缓存内存,"mysql.query_cache.free_memory\n' +
  'mysql.query_cache.query_cache_size",,"**MySQL Query Cache Memory**\\n\\nThe query cache has huge scalability problems in that only one thread can do an operation in the query cache at the same time. This serialization is true not only for SELECTs, but also for INSERT/UPDATE/DELETE.\\n\\nThis also means that the larger the `query_cache_size` is set to, the slower those operations become. In concurrent environments, the MySQL Query Cache quickly becomes a contention point, decreasing performance. MariaDB and AWS Aurora have done work to try and eliminate the query cache contention in their flavors of MySQL, while MySQL 8.0 has eliminated the query cache feature.\\n\\nThe recommended settings for most environments is to set:\\n  ``query_cache_type=0``\\n  ``query_cache_size=0``\\n\\nNote that while you can dynamically change these values, to completely remove the contention point you have to restart the database.",,\n' +
  'cb.mysql,query_cache_activity,cb.mysql.query_cache_activity,Query Cache Activity,查询缓存活动,"mysql.query_cache.hits\n' +
  'mysql.query_cache.inserts\n' +
  'mysql.query_cache.not_cached\n' +
  'mysql.query_cache.prunes\n' +
  'mysql.query_cache.queries_in_cache",,"**MySQL Query Cache Activity**\\n\\nThe query cache has huge scalability problems in that only one thread can do an operation in the query cache at the same time. This serialization is true not only for SELECTs, but also for INSERT/UPDATE/DELETE.\\n\\nThis also means that the larger the `query_cache_size` is set to, the slower those operations become. In concurrent environments, the MySQL Query Cache quickly becomes a contention point, decreasing performance. MariaDB and AWS Aurora have done work to try and eliminate the query cache contention in their flavors of MySQL, while MySQL 8.0 has eliminated the query cache feature.\\n\\nThe recommended settings for most environments is to set:\\n``query_cache_type=0``\\n``query_cache_size=0``\\n\\nNote that while you can dynamically change these values, to completely remove the contention point you have to restart the database.",,\n' +
  'cb.pgsql,tuples,cb.pgsql.tuples,Tuples,行操作频率,"pgsql.tuple.fetched\n' +
  'pgsql.tuple.returned\n' +
  'pgsql.tuple.inserted\n' +
  'pgsql.tuple.updated\n' +
  'pgsql.tuple.deleted",,,,\n' +
  'cb.pgsql,tuples_read_by_queries,cb.pgsql.tuples_read_by_queries,Tuples Read by Queries,Queries读取行频率,"pgsql.tuple.rows_returned_by_queries\n' +
  'pgsql.tuple.rows_fetched_by_queries",,,,\n' +
  'cb.pgsql,tuples_change_by_queries,cb.pgsql.tuples_change_by_queries,Tuples Changes by Queries,Queries变更行频率,"pgsql.tuple.rows_inserted_by_queries\n' +
  'pgsql.tuple.rows_updated_by_queries\n' +
  'pgsql.tuple.rows_deleted_by_queries",,,,\n' +
  'cb.pgsql,transactions,cb.pgsql.transactions,Transactions,事务,"pgsql.transaction.commits\n' +
  'pgsql.transaction.rollbacks",,,,\n' +
  'cb.pgsql,conflicts_deadlocks,cb.pgsql.conflicts_deadlocks,Conflicts/Deadlocks,冲突与死锁,"pgsql.lock.deadlocks\n' +
  'pgsql.lock.conflicts",,,,\n' +
  'cb.pgsql,buffers,cb.pgsql.buffers,Buffers,缓冲区,"pgsql.buffer.allocated\n' +
  'pgsql.buffer.fsync_calls_by_backend\n' +
  'pgsql.buffer.written_directly_by_backend\n' +
  'pgsql.buffer.written_by_background_writer\n' +
  'pgsql.buffer.written_during_checkpoints",,,,\n' +
  'cb.pgsql,canceled_queries,cb.pgsql.canceled_queries,Canceled Queries,取消的Queries,"pgsql.conflicts.pinned_buffers\n' +
  'pgsql.conflicts.deadlocks\n' +
  'pgsql.conflicts.lock_timeouts\n' +
  'pgsql.conflicts.old_snapshots\n' +
  'pgsql.conflicts.dropped_tablespaces",基于 pg_stat_database_conflicts 视图。,Based on pg_stat_database_conflicts view,,\n' +
  'cb.pgsql,checkpoint_stats,cb.pgsql.checkpoint_stats,Checkpoint stats,检查点统计,"pgsql.checkpoint.files_synchronization_to_disk\n' +
  'pgsql.checkpoint.written_files_to_disk",,,,\n' +
  'cb.oracle,cache_hit_ratio,cb.oracle.cache_hit_ratio,Cache hit ratio,缓存命中率,"oracle.cache_hit_ratio.lib_cache_hit_ratio\n' +
  'oracle.cache_hit_ratio.buffer_cache_hit_ratio",,,,'

export default data
