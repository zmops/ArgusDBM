const data = "mysql,status,,uptime,mysql.status.uptime,Uptime,运行时长,number,s,,MySQL服务进程自上次重启以来的运行时长。,The amount of time since the last restart of the MySQL server process.,\"          {\n" +
  "            \"\"color\"\": \"\"rgba(245, 54, 54, 0.9)\"\",\n" +
  "            \"\"value\"\": null\n" +
  "          },\n" +
  "          {\n" +
  "            \"\"color\"\": \"\"rgba(237, 129, 40, 0.89)\"\",\n" +
  "            \"\"value\"\": 300\n" +
  "          },\n" +
  "          {\n" +
  "            \"\"color\"\": \"\"rgba(50, 172, 45, 0.97)\"\",\n" +
  "            \"\"value\"\": 3600\n" +
  "          }\",5,,\n" +
  "mysql,basic,,version,mysql.basic.version,Version,版本号,string,,,,,,5,,\n" +
  "mysql,performance,,qps,mysql.performance.qps,Current QPS,当前QPS,float,次/s,,当前QPS\\n\\n基于MySQL命令 SHOW STATUS 的结果，是最近一小段时间内平均每秒执行的语句数量。与 questions 指标不同，本指标的统计范围包含存储程序执行的语句。它并不包含 COM_PING 和 COM_STATISTICS 命令。,\"Current QPS\\n\\nBased on the queries reported by MySQL's SHOW STATUS command, it is the number of statements executed by the server within the last second. This variable includes statements executed within stored programs, unlike the Questions variable. It does not count COM_PING or COM_STATISTICS commands.\n" +
  "\",\"          {\n" +
  "            \"\"color\"\": \"\"rgba(245, 54, 54, 0.9)\"\",\n" +
  "            \"\"value\"\": null\n" +
  "          },\n" +
  "          {\n" +
  "            \"\"color\"\": \"\"rgba(237, 129, 40, 0.89)\"\",\n" +
  "            \"\"value\"\": 35\n" +
  "          },\n" +
  "          {\n" +
  "            \"\"color\"\": \"\"rgba(50, 172, 45, 0.97)\"\",\n" +
  "            \"\"value\"\": 75\n" +
  "          }\",5,\"https://dev.mysql.com/doc/refman/5.7/en/server-status-variables.html#statvar_Queries\n" +
  "\n" +
  "https://segmentfault.com/a/1190000040620512\",\n" +
  "mysql,performance,,questions,mysql.performance.questions,Questions,Questions,,,,**MySQL Questions**\\n\\n服务器执行的语句数。这只包括客户端发送到服务器的语句，而不包括存储程序中执行的语句，这与QPS计算中使用的查询不同。 \\n\\n此变量不计算以下命令：\\n* ``COM_PING``\\n* ``COM_STATISTICS``\\n* ``COM_STMT_PREPARE``\\n* ``COM_STMT_CLOSE``\\n* ``COM_STMT_RESET``,\"**MySQL Questions**\\n\\nThe number of statements executed by the server. This includes only statements sent to the server by clients and not statements executed within stored programs, unlike the Queries used in the QPS calculation. \\n\\nThis variable does not count the following commands:\\n* ``COM_PING``\\n* ``COM_STATISTICS``\\n* ``COM_STMT_PREPARE``\\n* ``COM_STMT_CLOSE``\\n* ``COM_STMT_RESET``\",,,,\n" +
  "mysql,performance,,slow_queries,mysql.performance.slow_queries,Slow Queries,慢查询,,,,**慢查询**\\n\\n慢查询定义为比long_query_time设置慢的查询。例如，如果将long_query_time设置为3，则超过3秒的所有查询为慢查询。,\"**MySQL Slow Queries**\\n\\nSlow queries are defined as queries being slower than the long_query_time setting. For example, if you have long_query_time set to 3, all queries that take longer than 3 seconds to complete will show on this graph.\",,,,\n" +
  "mysql,performance,,slow_sql,mysql.performance.slow_sql,Slow SQL,慢SQL,,,,,,,,\"https://www.percona.com/blog/mysql-101-how-to-find-and-tune-a-slow-sql-query/\n" +
  "\n" +
  "https://pmmdemo.percona.com/graph/d/pmm-qan/pmm-query-analytics\",\n" +
  "mysql,slow_sql,,sql_text,mysql.slow_sql.sql_text,Slow SQL Text,慢SQL语句,string,,,,,,,\"https://www.percona.com/blog/mysql-101-how-to-find-and-tune-a-slow-sql-query/\n" +
  "\n" +
  "https://pmmdemo.percona.com/graph/d/pmm-qan/pmm-query-analytics\",需要开启慢SQL功能，配置将慢SQL输出到数据库表 https://www.cnblogs.com/chenfool/p/mysql-man-cha-xun-mansql-ji-lu-he-diao-zheng.html\n" +
  "mysql,slow_sql,,start_time,mysql.slow_sql.start_time,Start time,慢SQL开始时间,,,,,,,,\"https://www.percona.com/blog/mysql-101-how-to-find-and-tune-a-slow-sql-query/\n" +
  "\n" +
  "https://pmmdemo.percona.com/graph/d/pmm-qan/pmm-query-analytics\",\n" +
  "mysql,slow_sql,,db,mysql.slow_sql.db,DB,慢SQL所属库,string,,,,,,,\"https://www.percona.com/blog/mysql-101-how-to-find-and-tune-a-slow-sql-query/\n" +
  "\n" +
  "https://pmmdemo.percona.com/graph/d/pmm-qan/pmm-query-analytics\",\n" +
  "mysql,slow_sql,,query_time,mysql.slow_sql.query_time,Query time,慢SQL耗时,,,,,,,,\"https://www.percona.com/blog/mysql-101-how-to-find-and-tune-a-slow-sql-query/\n" +
  "\n" +
  "https://pmmdemo.percona.com/graph/d/pmm-qan/pmm-query-analytics\",\n" +
  "mysql,basic,,innodb_buffer_pool_size,mysql.basic.innodb_buffer_pool_size,InnoDB Buffer Pool Size,InnoDB缓存池大小,int,KB,,InnoDB 维护着名为缓存池的存储区域，用于在内存中缓存数据和索引。了解 InnoDB 缓存池的工作原理，并利用它将频繁访问的数据保存在内存中，是MySQL调优工作最重要的方面之一。调优的目标是将使用中的数据保存在内存中。在大多数情况下，它应该占专用数据库主机上可用内存的60%-90%之间，但这一比例取决于许多因素。,\"InnoDB Buffer Pool Size\\n\\nInnoDB maintains a storage area called the buffer pool for caching data and indexes in memory. Knowing how the InnoDB buffer pool works, and taking advantage of it to keep frequently accessed data in memory, is one of the most important aspects of MySQL tuning. The goal is to keep the working set in memory. In most cases, this should be between 60%-90% of available memory on a dedicated database host, but depends on many factors.\",\"          {\n" +
  "            \"\"color\"\": \"\"rgba(50, 172, 45, 0.97)\"\",\n" +
  "            \"\"value\"\": null\n" +
  "          },\n" +
  "          {\n" +
  "            \"\"color\"\": \"\"rgba(237, 129, 40, 0.89)\"\",\n" +
  "            \"\"value\"\": 90\n" +
  "          },\n" +
  "          {\n" +
  "            \"\"color\"\": \"\"rgba(245, 54, 54, 0.9)\"\",\n" +
  "            \"\"value\"\": 95\n" +
  "          }\",5,https://www.percona.com/blog/80-ram-tune-innodb_buffer_pool_size/,\n" +
  "mysql,handler,,handler_used_ratio,mysql.handler.handler_used_ratio,Handler Used Ratio,句柄使用率,float,%,,,,,3,,File Handler 缩写为 Handler 没有歧义吧？没有\n" +
  "mysql,handler,,handler_commit,mysql.handler.handler_commit,Handler Commit,句柄Commit,float,次/s,,,,,,https://dev.mysql.com/doc/refman/5.7/en/server-status-variables.html#statvar_Handler_commit,\n" +
  "mysql,handler,,handler_prepare,mysql.handler.handler_prepare,Handler Prepare,句柄Prepare,float,次/s,,,,,,,\n" +
  "mysql,handler,,handler_rollback,mysql.handler.handler_rollback,Handler Rollback,句柄Rollback,float,次/s,,,,,,,\n" +
  "mysql,handler,,handler_read_next,mysql.handler.handler_read_next,Handler Read Next,句柄Read Next,float,次/s,,当存储引擎被要求“读取下一个索引项”时，`read_next` 将递增。高值表示正在进行大量索引扫描。,`read_next` is incremented when the storage engine is asked to 'read the next index entry'. A high value means a lot of index scans are being done.,,,,\n" +
  "mysql,handler,,handler_read_rnd_next,mysql.handler.handler_read_rnd_next,Handler Read Rnd Next,句柄Read Rnd Next,float,次/s,,当服务执行全表扫描时，`read_rnd_next` 将递增。这个值不应该很高。,`read_rnd_next` is incremented when the server performs a full table scan and this is a counter you don't really want to see with a high value.,,,,\n" +
  "mysql,handler,,handler_write,mysql.handler.handler_write,Handler Write,句柄Write,float,次/s,,,,,,,\n" +
  "mysql,handler,,handler_external_lock,mysql.handler.handler_external_lock,Handler External Lock,句柄External Lock,float,次/s,,,,,,,\n" +
  "mysql,handler,,handler_read_key,mysql.handler.handler_read_key,Handler Read Key,句柄Read Key,float,次/s,,当对索引进行读取时，`read_key` 递增。,`read_key` is incremented when a read is done with an index.,,,,\n" +
  "mysql,handler,,handler_update,mysql.handler.handler_update,Handler Update,句柄Update,float,次/s,,,,,,,\n" +
  "mysql,handler,,handler_delete,mysql.handler.handler_delete,Handler Delete,句柄Delete,float,次/s,,,,,,,\n" +
  "mysql,handler,,handler_read_first,mysql.handler.handler_read_first,Handler Read First,句柄Read First,float,次/s,,,,,,,\n" +
  "mysql,handler,,handler_read_rnd,mysql.handler.handler_read_rnd,Handler Read Rnd,句柄Read Rnd,float,次/s,,,,,,,\n" +
  "mysql,basic,,max_connections,mysql.basic.max_connections,Max Connection,最大连接数,int,,,最大连接数是同时允许的最大客户端连接数。默认情况下，该值为151。增加该值会增加mysqld所需的文件描述符的数量。如果所需数量的描述符不可用，服务器将降低“最大连接数”的值。\\n\\nmysqld实际上允许Max Connections+1个客户端进行连接。额外的连接保留给具有SUPER权限的帐户（如root）使用。,\"Max Connections is the maximum permitted number of simultaneous client connections. By default, this is 151. Increasing this value increases the number of file descriptors that mysqld requires. If the required number of descriptors are not available, the server reduces the value of Max Connections.\\n\\nmysqld actually permits Max Connections + 1 clients to connect. The extra connection is reserved for use by accounts that have the SUPER privilege, such as root.\",,,,\n" +
  "mysql,connection,,connections,mysql.connection.connections,Connection,连接次数,int,,,连接次数是连接MySQL服务器的尝试次数（无论成功与否）。,Connections is the number of connection attempts (successful or not) to the MySQL server.,,,,\n" +
  "mysql,connection,,max_used_connections,mysql.connection.max_used_connections,Max Used Connection,最大使用连接数,int,,,最大使用连接数是自服务器启动以来同时使用的最大连接数。,Max Used Connections is the maximum number of connections that have been in use simultaneously since the server started.,,,,\n" +
  "mysql,connection,,aborted_clients,mysql.connection.aborted_clients,Aborted Clients (timeout),中止的客户端(超时),,,,,,,,,\n" +
  "mysql,connection,,aborted_connects,mysql.connection.aborted_connects,Aborted Connects (attempts),中止的连接(尝试),,,,,,,,,\n" +
  "mysql,table_cache,,table_open_cache_miss_ratio,mysql.table_cache.table_open_cache_miss_ratio,Table Open Cache Miss Ratio,表高速缓存未命中率,,%,,,,,5,,\n" +
  "mysql,basic,,table_open_cache,mysql.basic.table_open_cache,Table Open Cache Size,表高速缓存上限,int,个,,*表高速缓存上限* 表示服务器在任何一个表缓存实例中可以保持打开的最大表数。,Table Open Cache Size indicates the maximum number of tables the server can keep open in any one table cache instance.,,5,https://sqlconjuror.com/mariadb-mysql-table-open-cache-table-definition-cache/,\n" +
  "mysql,table_cache,,table_definition_cache_size,mysql.table_cache.table_definition_cache_size,Table Definition Cache Size,表定义缓存数,int,个 ,,*表定义缓存数* 显示可存储的表定义（SHOW CREATE Table \\G）的数量。这是为了加快表的打开速度，并且每个表只有一个条目。如果DB实例中有大量表（>400），则应考虑增加此参数。\\n\\n介于400和2000之间的值适用于table_definition_cache。请注意，更大的表定义缓存也意味着数据库使用更多的RAM。,Table Definition Cache Size shows the number of table definitions (SHOW CREATE TABLE \\G) that can be stored. This is to speed up opening of tables and only one entry per table. You should consider increasing this parameter if you have large number of tables (>400) in your DB instance.\\n\\nValues between 400 and 2000 are good for table_definition_cache. Do take note that a bigger table definition cache also means that your database uses more RAM.,,5,https://sqlconjuror.com/mariadb-mysql-table-open-cache-table-definition-cache/,\n" +
  "mysql,thread,,threads_connected,mysql.thread.threads_connected,Threads Connected,连接线程数,int,,,*连接线程数* 是打开的连接数。,Threads Connected is the number of open connections.,,,,\n" +
  "mysql,thread,,threads_running,mysql.thread.threads_running,Threads Running,运行线程数,int,,,*运行线程数* 是未休眠的线程数。,Threads Running is the number of threads not sleeping.,,,,\n" +
  "mysql,thread,,threads_created,mysql.thread.threads_created,Threads Created,创建线程数,int,,,*创建线程数* 是为处理连接而创建的线程数。,*Threads_created*: The number of threads created to handle connections.,,,,\n" +
  "mysql,thread,,threads_cached,mysql.thread.threads_cached,Threads Cached,已缓存线程数,int,,,*已缓存线程数* 是线程缓存中的线程数。,*Threads_cached*: The number of threads in the thread cache.,,,,\n" +
  "mysql,basic,,thread_cache_size,mysql.basic.thread_cache_size,Thread Cache Size,线程缓存上限,int,,,*线程缓存上限* 变量设置服务器应缓存多少线程以供重用。当客户端断开连接时，如果缓存未满，则将客户端的线程放入缓存中。它在MySQL 5.6.8及以上版本中自动调整大小（上限为100）。如果可能，通过重用从缓存中获取的线程来满足线程请求，并且只有当缓存为空时才创建新线程。,\"The thread_cache_size variable sets how many threads the server should cache to reuse. When a client disconnects, the client's threads are put in the cache if the cache is not full. It is autosized in MySQL 5.6.8 and above (capped to 100). Requests for threads are satisfied by reusing threads taken from the cache if possible, and only when the cache is empty is a new thread created.\",,,,\n" +
  "mysql,command,,com_stmt_execute,mysql.command.com_stmt_execute,Command Statement Execute,命令执行数(无论成败),float,次/s,,,,,,,\n" +
  "mysql,command,,com_update,mysql.command.com_update,Command update,update成功执行数,float,次/s,,,,,,,\n" +
  "mysql,command,,com_begin,mysql.command.com_begin,Command begin,begin成功执行数,float,次/s,,,,,,,\n" +
  "mysql,command,,com_delete,mysql.command.com_delete,Command delete,delete成功执行数,float,次/s,,,,,,,\n" +
  "mysql,command,,com_insert,mysql.command.com_insert,Command insert,insert成功执行数,float,次/s,,,,,,,\n" +
  "mysql,command,,com_commit,mysql.command.com_commit,Command commit,commit成功执行数,float,次/s,,,,,,,\n" +
  "mysql,command,,com_select,mysql.command.com_select,Command select,select成功执行数,float,次/s,,,,,,,\n" +
  "mysql,command,,com_admin_commands,mysql.command.com_admin_commands,admin commands,admin命令成功执行数,float,次/s,,,,,,,\n" +
  "mysql,command,,com_show_status,mysql.command.com_show_status,Command show status,show status成功执行数,float,次/s,,,,,,,\n" +
  "mysql,command,,com_show_slave_status,mysql.command.com_show_slave_status,Command show slave status,show slave status成功执行数,float,次/s,,,,,,,\n" +
  "mysql,command,,com_set_option,mysql.command.com_set_option,Command set option,set option成功执行数,float,次/s,,,,,,,\n" +
  "mysql,process_state,,state,mysql.process_state.state,state name,线程状态名称,,,,,\"**Process States**\\n\\nAn action, event, or state that indicates what the thread is doing.\\n\\nMost states correspond to very quick operations. If a thread stays in a given state for many seconds, there might be a problem that needs to be investigated.\n" +
  "\n" +
  "*Process idle*: The size of threads whose corresponding session is idle.\n" +
  "*Process updating*: The thread is searching for rows to update and is updating them.\n" +
  "*Process executing*: The thread has begun executing a statement.\n" +
  "*Process sending data*: The thread is reading and processing rows for a SELECT statement, and sending data to the client. Because operations occurring during this state tend to perform large amounts of disk access (reads), it is often the longest-running state over the lifetime of a given query.\n" +
  "*Process opening tables*: The thread is trying to open a table. This is should be very fast procedure, unless something prevents opening. For example, an ALTER TABLE or a LOCK TABLE statement can prevent opening a table until the statement is finished. It is also worth checking that your table_open_cache value is large enough.\n" +
  "*Process closing tables*: The thread is flushing the changed table data to disk and closing the used tables. This should be a fast operation. If not, verify that you do not have a full disk and that the disk is not in very heavy use.\n" +
  "*Process waiting for lock*: The server is waiting to acquire a THR_LOCK lock or a lock from the metadata locking subsystem, where lock_type indicates the type of lock.\n" +
  "\n" +
  "This state indicates a wait for a THR_LOCK:\n" +
  "\n" +
  "Waiting for table level lock\n" +
  "\n" +
  "These states indicate a wait for a metadata lock:\n" +
  "\n" +
  "Waiting for event metadata lock\n" +
  "\n" +
  "Waiting for global read lock\n" +
  "\n" +
  "Waiting for schema metadata lock\n" +
  "\n" +
  "Waiting for stored function metadata lock\n" +
  "\n" +
  "Waiting for stored procedure metadata lock\n" +
  "\n" +
  "Waiting for table metadata lock\n" +
  "\n" +
  "Waiting for trigger metadata lock\n" +
  "*Process freeing items*: The thread has executed a command. Some freeing of items done during this state involves the query cache. This state is usually followed by cleaning up.\n" +
  "*Process end*: This occurs at the end but before the cleanup of ALTER TABLE, CREATE VIEW, DELETE, INSERT, SELECT, or UPDATE statements.\n" +
  "\n" +
  "For the end state, the following operations could be happening:\n" +
  "\n" +
  "Removing query cache entries after data in a table is changed\n" +
  "\n" +
  "Writing an event to the binary log\n" +
  "\n" +
  "Freeing memory buffers, including for blobs\n" +
  "*Process checking permissions*: The thread is checking whether the server has the required privileges to execute the statement.\n" +
  "*Process statistics*: The server is calculating statistics to develop a query execution plan. If a thread is in this state for a long time, the server is probably disk-bound performing other work.\n" +
  "*Process login*: The initial state for a connection thread until the client has been authenticated successfully.\n" +
  "*Process preparing*: This state occurs during query optimization.\n" +
  "*Process init*: This occurs before the initialization of ALTER TABLE, DELETE, INSERT, SELECT, or UPDATE statements. Actions taken by the server in this state include flushing the binary log, the InnoDB log, and some query cache cleanup operations.\n" +
  "*Process cleaning up*: The thread has processed one command and is preparing to free memory and reset certain state variables.\",,,\"https://dev.mysql.com/doc/refman/5.7/en/show-processlist.html\n" +
  "\n" +
  "https://dev.mysql.com/doc/refman/5.7/en/general-thread-states.html\",\n" +
  "mysql,process_state,,num,mysql.process_state.num,state number,线程状态数量,,,,**线程状态** \\n\\n表示线程正在执行的操作、事件或状态。\\n\\n大多数状态对应于非常快的操作。如果线程在给定状态下停留了很多秒，则可能存在需要调查的问题。,\"**Process States**\\n\\nAn action, event, or state that indicates what the thread is doing.\\n\\nMost states correspond to very quick operations. If a thread stays in a given state for many seconds, there might be a problem that needs to be investigated.\n" +
  "\n" +
  "*Process idle*: The size of threads whose corresponding session is idle.\n" +
  "*Process updating*: The thread is searching for rows to update and is updating them.\n" +
  "*Process executing*: The thread has begun executing a statement.\n" +
  "*Process sending data*: The thread is reading and processing rows for a SELECT statement, and sending data to the client. Because operations occurring during this state tend to perform large amounts of disk access (reads), it is often the longest-running state over the lifetime of a given query.\n" +
  "*Process opening tables*: The thread is trying to open a table. This is should be very fast procedure, unless something prevents opening. For example, an ALTER TABLE or a LOCK TABLE statement can prevent opening a table until the statement is finished. It is also worth checking that your table_open_cache value is large enough.\n" +
  "*Process closing tables*: The thread is flushing the changed table data to disk and closing the used tables. This should be a fast operation. If not, verify that you do not have a full disk and that the disk is not in very heavy use.\n" +
  "*Process waiting for lock*: The server is waiting to acquire a THR_LOCK lock or a lock from the metadata locking subsystem, where lock_type indicates the type of lock.\n" +
  "\n" +
  "This state indicates a wait for a THR_LOCK:\n" +
  "\n" +
  "Waiting for table level lock\n" +
  "\n" +
  "These states indicate a wait for a metadata lock:\n" +
  "\n" +
  "Waiting for event metadata lock\n" +
  "\n" +
  "Waiting for global read lock\n" +
  "\n" +
  "Waiting for schema metadata lock\n" +
  "\n" +
  "Waiting for stored function metadata lock\n" +
  "\n" +
  "Waiting for stored procedure metadata lock\n" +
  "\n" +
  "Waiting for table metadata lock\n" +
  "\n" +
  "Waiting for trigger metadata lock\n" +
  "*Process freeing items*: The thread has executed a command. Some freeing of items done during this state involves the query cache. This state is usually followed by cleaning up.\n" +
  "*Process end*: This occurs at the end but before the cleanup of ALTER TABLE, CREATE VIEW, DELETE, INSERT, SELECT, or UPDATE statements.\n" +
  "\n" +
  "For the end state, the following operations could be happening:\n" +
  "\n" +
  "Removing query cache entries after data in a table is changed\n" +
  "\n" +
  "Writing an event to the binary log\n" +
  "\n" +
  "Freeing memory buffers, including for blobs\n" +
  "*Process checking permissions*: The thread is checking whether the server has the required privileges to execute the statement.\n" +
  "*Process statistics*: The server is calculating statistics to develop a query execution plan. If a thread is in this state for a long time, the server is probably disk-bound performing other work.\n" +
  "*Process login*: The initial state for a connection thread until the client has been authenticated successfully.\n" +
  "*Process preparing*: This state occurs during query optimization.\n" +
  "*Process init*: This occurs before the initialization of ALTER TABLE, DELETE, INSERT, SELECT, or UPDATE statements. Actions taken by the server in this state include flushing the binary log, the InnoDB log, and some query cache cleanup operations.\n" +
  "*Process cleaning up*: The thread has processed one command and is preparing to free memory and reset certain state variables.\",,,\"https://dev.mysql.com/doc/refman/5.7/en/show-processlist.html\n" +
  "\n" +
  "https://dev.mysql.com/doc/refman/5.7/en/general-thread-states.html\",\n" +
  "mysql,net,,net_outbound,mysql.net.net_outbound,Network outbound,网络出速率,float,B/s,,,,,,,\n" +
  "mysql,net,,net_inbound,mysql.net.net_inbound,Network inbound,网络入速率,float,B/s,,,,,,,\n" +
  "mysql,tmp,,created_tmp_tables,mysql.tmp.created_tmp_tables,Created Tmp Tables,临时表创建频率,float,次/s,,*临时表创建频率* 是在执行语句时创建的内部临时表频率。,Created Tmp Tables is the number of internal temporary tables created by the server while executing statements.,,,,\n" +
  "mysql,tmp,,created_tmp_disk_tables,mysql.tmp.created_tmp_disk_tables,Created Tmp Disk Tables,磁盘临时表创建频率,float,次/s,,*磁盘临时表创建频率* 是在执行语句时创建的内部磁盘临时表频率。,Created Tmp Disk Tables is the number of internal on-disk temporary tables created by the server while executing statements.,,,,\n" +
  "mysql,tmp,,created_tmp_files,mysql.tmp.created_tmp_files,Created Tmp Files,临时文件创建频率,float,次/s,,*临时文件创建频率* 是mysqld创建的临时文件频率。,Created Tmp Files is the number of temporary files mysqld has created.,,,,\n" +
  "mysql,select_type,,select_full_join,mysql.select_type.select_full_join,Select Full Join,Select Full Join,float,次/s,,***Select Full Join*** 是索引中未连接的连接数，这通常会对性能产生巨大影响。,\"***Select Full Join*** is the number of joins that are not joined on an index, this is usually a huge performance hit.\",,,,\n" +
  "mysql,select_type,,select_full_range_join,mysql.select_type.select_full_range_join,Select Full Range Join,Select Full Range Join,float,次/s,,,,,,,\n" +
  "mysql,select_type,,select_range,mysql.select_type.select_range,Select Range,Select Range,float,次/s,,***Select Range*** 是使用范围扫描的查询数，这意味着MySQL扫描了给定范围内的所有行。,\"***Select Range*** is how many queries used a range scan, which means MySQL scanned all rows in a given range.\",,,,\n" +
  "mysql,select_type,,select_range_check,mysql.select_type.select_range_check,Select Range Check,Select Range Check,float,次/s,,,,,,,\n" +
  "mysql,select_type,,select_scan,mysql.select_type.select_scan,Select Scan,Select Scan,float,次/s,,***Select Scan*** 是导致完整表扫描的查询数，其中必须读取表中的所有数据并丢弃或返回。,\"***Select Scan*** is how many queries caused full table scans, in which all the data in the table had to be read and either discarded or returned.\",,,,\n" +
  "mysql,sort,,sort_rows,mysql.sort.sort_rows,Sort Rows,Sort Rows,float,次/s,,,,,,,\n" +
  "mysql,sort,,sort_range,mysql.sort.sort_range,Sort Range,Sort Range,float,次/s,,,,,,,\n" +
  "mysql,sort,,sort_merge_passes,mysql.sort.sort_merge_passes,Sort Merge Passes,Sort Merge Passes,float,次/s,,,,,,,\n" +
  "mysql,sort,,sort_scan,mysql.sort.sort_scan,Sort Scan,Sort Scan,float,次/s,,,,,,,\n" +
  "mysql,table_lock,,table_locks_immediate,mysql.table_lock.table_locks_immediate,Table Locks Immediate,表锁Immediate,float,次/s,,,,,,,\n" +
  "mysql,table_lock,,table_locks_waited,mysql.table_lock.table_locks_waited,Table Locks Waited,表锁Waited,float,次/s,,,,,,,\n" +
  "mysql,query_cache,,free_memory,mysql.query_cache.free_memory,Free Memory,可用查询缓存,int,KB,,,,,,,8.0开始已不存在。\n" +
  "mysql,query_cache,,query_cache_size,mysql.query_cache.query_cache_size,Query Cache Size,查询缓存大小,int,B,,,,,,,8.0开始已不存在。\n" +
  "mysql,query_cache,,hits,mysql.query_cache.hits,Hits,Hits,float,,,,,,,,8.0开始已不存在。\n" +
  "mysql,query_cache,,inserts,mysql.query_cache.inserts,Inserts,Inserts,float,,,,,,,,8.0开始已不存在。\n" +
  "mysql,query_cache,,not_cached,mysql.query_cache.not_cached,Not Cached,Not Cached,float,,,,,,,,8.0开始已不存在。\n" +
  "mysql,query_cache,,prunes,mysql.query_cache.prunes,Prunes,Prunes,float,,,,,,,,8.0开始已不存在。\n" +
  "mysql,query_cache,,queries_in_cache,mysql.query_cache.queries_in_cache,Queries in Cache,缓存中的查询数,float,,,,,,,,8.0开始已不存在。\n" +
  "postgresql,status,,uptime,postgresql.status.uptime,Uptime,运行时长,string,,,,,,,,\n" +
  "postgresql,basic,,version,postgresql.basic.version,Version,版本号,string,,,,,,,,\n" +
  "postgresql,resource_config,,shared_buffers,postgresql.resource_config.shared_buffers,Shared Buffers,共享内存缓存,int,B,,*共享内存缓存* 是定义数据库服务器用于共享内存缓冲区的内存量。默认值为128MB。建议调整为RAM的25%，但通常不超过40%。,\"Defines the amount of memory the database server uses for shared memory buffers.  Default is 128MB.  Guidance on tuning is 25% of RAM, but generally doesn't exceed 40%.\",,,https://www.postgresql.org/docs/current/static/runtime-config-resource.html#GUC-SHARED-BUFFERS,\n" +
  "postgresql,resource_config,,work_mem,postgresql.resource_config.work_mem,Memory Size for each Sort,排序内存,int,B,,*work_mem* 定义写入临时磁盘文件之前分配给内部排序操作和哈希表的内存量。默认值为4MB。,The parameter work_mem defines the amount of memory assigned for internal sort operations and hash tables before writing to temporary disk files.  The default is 4MB.,,,https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-WORK-MEM,\n" +
  "postgresql,resource_config,,autovacuum,postgresql.resource_config.autovacuum,Autovacuum,自动清理状态,bool,,,*自动清理状态* 定义是否启用自动清理。通常，解决方案是更频繁地清理，而不是更少地清理。,\"Whether autovacuum process is enabled or not.  Generally the solution is to vacuum more often, not less.\",,,https://www.postgresql.org/docs/current/routine-vacuuming.html#AUTOVACUUM,\n" +
  "postgresql,resource_config,,max_connections,postgresql.resource_config.max_connections,Max Connections,最大连接数,int,,,*最大连接数* 是允许的最大客户端连接数。请小心更改此值，因为有一些内存资源是按每个客户端分配的，因此将max_connections设置得更高通常会增加PostgreSQL的总体内存使用量。,\"The maximum number of client connections allowed.  Change this value with care as there are some memory resources that are allocated on a per-client basis, so setting max_connections higher will generally increase overall PostgreSQL memory usage.\",,,https://www.postgresql.org/docs/current/runtime-config-connection.html#GUC-MAX-CONNECTIONS,\n" +
  "postgresql,resource_config,,effective_cache_size,postgresql.resource_config.effective_cache_size,Disk Cache Size,磁盘缓存大小,int,B,,*磁盘缓存大小* effective_cache_size变量可调整磁盘缓存所需的RAM数量。通常，添加Linux free+cached 是个好主意。查询计划器使用该值来确定计划是否适合内存，如果定义得太低，可能会导致某些计划拒绝某些索引。,\"PostgreSQL's effective_cache_size variable tunes how much RAM you expect to be available for disk caching.  Generally adding Linux free+cached will give you a good idea.  This value is used by the query planner whether plans will fit in memory, and when defined too low, can lead to some plans rejecting certain indexes.\",,,https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-EFFECTIVE-CACHE-SIZE,\n" +
  "postgresql,resource_config,,wal_buffers,postgresql.resource_config.wal_buffers,Disk-Page Buffers,磁盘分页缓存大小,int,B,,*磁盘分页缓存大小* wal_buffers定义了用于缓存预写日志项的内存量。通常，该值很小（shared_buffers值的3%），但可能需要针对负载过重的服务器进行修改。,\"The setting wal_buffers defines how much memory is used for caching the write-ahead log entries. Generally this value is small (3% of shared_buffers value), but it may need to be modified for heavily loaded servers.\",,,\"https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-WAL-BUFFERS\n" +
  "\n" +
  "https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-SHARED-BUFFERS\",\n" +
  "postgresql,connection,,total,postgresql.connection.total,Total connections,连接总数,int,,,,,,,https://www.postgresql.org/docs/current/runtime-config-connection.html#GUC-MAX-CONNECTIONS,\n" +
  "postgresql,connection_state,,state,postgresql.connection_state.state,Connection State,连接状态,string,,,\"包括 idle、active、idle in transaction、idle in transaction (aborted)、\n" +
  "fastpath function call、disabled。\",,,,,\n" +
  "postgresql,connection_state,,num,postgresql.connection_state.num,Connection Number,连接数量,int,,,,,,,,\n" +
  "postgresql,connection_db,,db_name,postgresql.connection_db.db_name,DB name,库名称,string,,,,,,,,\n" +
  "postgresql,connection_db,,active,postgresql.connection_db.active,Active connections,库活动连接数,int,,,,,,,,\n" +
  "postgresql,tuple,,fetched,postgresql.tuple.fetched,Fetched,Fetched,,,,,,,,,\n" +
  "postgresql,tuple,,returned,postgresql.tuple.returned,Returned,Returned,,,,,,,,,\n" +
  "postgresql,tuple,,inserted,postgresql.tuple.inserted,Inserted,Inserted,,,,,,,,,\n" +
  "postgresql,tuple,,updated,postgresql.tuple.updated,Updated,Updated,,,,,,,,,\n" +
  "postgresql,tuple,,deleted,postgresql.tuple.deleted,Deleted,Deleted,,,,,,,,,\n" +
  "postgresql,tuple,,rows_returned_by_queries,postgresql.tuple.rows_returned_by_queries,Rows returned by queries,查询返回行频率,float,次/s,,,,,,,\n" +
  "postgresql,tuple,,rows_fetched_by_queries,postgresql.tuple.rows_fetched_by_queries,Rows fetched by queries,查询获取行频率,float,次/s,,,,,,,\n" +
  "postgresql,tuple,,rows_inserted_by_queries,postgresql.tuple.rows_inserted_by_queries,Rows inserted by queries,查询新增行频率,float,次/s,,,,,,,相关于 pg_stat_database_tup\n" +
  "postgresql,tuple,,rows_updated_by_queries,postgresql.tuple.rows_updated_by_queries,Rows updated by queries,查询更新行频率,float,次/s,,,,,,,相关于 pg_stat_database_tup\n" +
  "postgresql,tuple,,rows_deleted_by_queries,postgresql.tuple.rows_deleted_by_queries,Rows deleted by queries,查询删除行频率,float,次/s,,,,,,,相关于 pg_stat_database_tup\n" +
  "postgresql,transaction,,commits,postgresql.transaction.commits,Transactions Commits,事务提交次数,float,次,select sum(xact_commit) from pg_stat_database;,,,,,https://www.postgresql.org/docs/current/tutorial-transactions.html,相关于 pg_stat_database_xact_commit\n" +
  "postgresql,transaction,,rollbacks,postgresql.transaction.rollbacks,Transactions Rollbacks,事务回滚次数,float,次,select sum(xact_rollback) from pg_stat_database;,,,,,https://www.postgresql.org/docs/current/tutorial-transactions.html,相关于 pg_stat_database_xact_commit\n" +
  "postgresql,transaction_state,,state,postgresql.transaction_state.state,Transactions State,事务状态,,,,\"事务状态包括idle in transaction、idle in transaction (aborted)、\n" +
  "idle、fastpath function call、disabled、active。\",,,,https://www.postgresql.org/docs/current/tutorial-transactions.html,相关于 pg_stat_activity_max_tx_duration\n" +
  "postgresql,transaction_state,,duration,postgresql.transaction_state.duration,Transactions Duration,事务耗时,,s,,,,,,https://www.postgresql.org/docs/current/tutorial-transactions.html,相关于 pg_stat_activity_max_tx_duration\n" +
  "postgresql,temp_file,,db_name,postgresql.temp_file.db_name,Temp Files DB Name,临时文件所属库名称,string,,,,,,,,\n" +
  "postgresql,temp_file,,num,postgresql.temp_file.num,Temp Files Number,临时文件累计创建数,float,,,,\"Cumulative number of temporary files created by queries in this database since service start. All temporary files are counted, regardless of why the temporary file was created (e.g., sorting or hashing), and regardless of the log_temp_files setting.\",,,,\n" +
  "postgresql,temp_file,,size,postgresql.temp_file.size,Temp Files Size,临时文件累计写入大小,float,B,,,\"Cumulative amount of data written to temporary files by queries in this database since service start. All temporary files are counted, regardless of why the temporary file was created, and regardless of the log_temp_files setting.\",,,,\n" +
  "postgresql,temp_file,,activity,postgresql.temp_file.activity,Temp Files Activity,临时文件创建频率,float,次/s,,,\"Number of temporary files created by queries in this database. All temporary files are counted, regardless of why the temporary file was created (e.g., sorting or hashing), and regardless of the log_temp_files setting.\",,,,\n" +
  "postgresql,temp_file,,util,postgresql.temp_file.util,Temp Files Utilization,临时文件写入速率,float,B/s,,,\"Total amount of data written to temporary files by queries in this database. All temporary files are counted, regardless of why the temporary file was created, and regardless of the log_temp_files setting.\",,,,\n" +
  "postgresql,lock,,deadlocks,postgresql.lock.deadlocks,Deadlocks,死锁次数,int,次,,,,,,,\n" +
  "postgresql,lock,,conflicts,postgresql.lock.conflicts,Conflicts,冲突次数,int,次,,,,,,,\n" +
  "postgresql,lock,,db_name,postgresql.lock.db_name,Locks DB Name,锁所属库名称,,,,,,,,,\n" +
  "postgresql,lock_num,,mode,postgresql.lock_num.mode,Locks Mode,锁模式,,,,\"锁模式包括accesssharelock、sireadlock、shareupdateexclusivelock、sharerowexclusivelock、sharelock 、rowsharelock、rowexclusivelock、exclusivelock、\n" +
  "accessexclusivelock。\",,,,,\n" +
  "postgresql,lock_num,,num,postgresql.lock_num.num,Locks Number,锁数量,int,,,,,,,,\n" +
  "postgresql,operation,,db_name,postgresql.operation.db_name,Blocks Operations DB Name,Blocks操作所属库名称,,,,,,,,,\n" +
  "postgresql,operation,,read,postgresql.operation.read,Operations Read,Blocks操作读频率,float,,,,,,,,\n" +
  "postgresql,operation,,write,postgresql.operation.write,Operations Write,Blocks操作写频率,float,,,,,,,,\n" +
  "postgresql,buffer,,allocated,postgresql.buffer.allocated,Allocated,缓冲区Allocated频率,int,,,,,,,,\n" +
  "postgresql,buffer,,fsync_calls_by_backend,postgresql.buffer.fsync_calls_by_backend,Fsync calls by a backend,缓冲区Fsync calls by a backend频率,int,,,,,,,,\n" +
  "postgresql,buffer,,written_directly_by_backend,postgresql.buffer.written_directly_by_backend,Written directly by a backend,缓冲区Written directly by a backend频率,int,,,,,,,,\n" +
  "postgresql,buffer,,written_by_background_writer,postgresql.buffer.written_by_background_writer,Written by the background writer,缓冲区Written by the background writer频率,int,,,,,,,,\n" +
  "postgresql,buffer,,written_during_checkpoints,postgresql.buffer.written_during_checkpoints,Written during checkpoints,缓冲区Written during checkpoints频率,int,,,,,,,,\n" +
  "postgresql,conflicts,,db_name,postgresql.conflicts.db_name,DB Name,库名称,string,,,,,,,,\n" +
  "postgresql,conflicts,,bufferpin,postgresql.conflicts.bufferpin,Pinned buffers,因固定缓冲区取消查询数,float,,,此库中由于固定缓冲区而取消的查询数。,Number of queries in this database that have been canceled due to pinned buffers.,,,,相关于 pg_stat_database_conflicts_confl_bufferpin\n" +
  "postgresql,conflicts,,deadlock,postgresql.conflicts.deadlock,Deadlocks,因死锁取消查询数,float,,,此库中由于死锁而取消的查询数。,Number of queries in this database that have been canceled due to deadlocks.,,,,相关于 pg_stat_database_conflicts_confl_bufferpin\n" +
  "postgresql,conflicts,,lock,postgresql.conflicts.lock,Lock timeouts,因锁超时取消查询数,float,,,此库中由于锁超时而取消的查询数。,Number of queries in this database that have been canceled due to lock timeouts.,,,,相关于 pg_stat_database_conflicts_confl_bufferpin\n" +
  "postgresql,conflicts,,snapshot,postgresql.conflicts.snapshot,Old snapshots,因旧快照取消查询数,float,,,此库中由于旧快照而取消的查询数。,Number of queries in this database that have been canceled due to old snapshots.,,,,相关于 pg_stat_database_conflicts_confl_bufferpin\n" +
  "postgresql,conflicts,,tablespace,postgresql.conflicts.tablespace,Dropped tablespaces,因删除表空间取消查询数,float,,,此库中由于删除掉的表空间而取消的查询数。,Number of queries in this database that have been canceled due to dropped tablespaces.,,,,相关于 pg_stat_database_conflicts_confl_bufferpin\n" +
  "postgresql,cache_hit_ratio,,db_name,postgresql.cache_hit_ratio.db_name,Cache Hit Ratio DB Name,缓存命中率所属库名称,string,,,,,,,,\n" +
  "postgresql,cache_hit_ratio,,ratio,postgresql.cache_hit_ratio.ratio,Cache Hit Ratio,缓存命中率,,,,,,,,,\n" +
  "postgresql,checkpoint,,checkpoint_sync_time,postgresql.checkpoint.checkpoint_sync_time,Files Synchronization to disk,文件同步到磁盘时间,,ms,,,,,,,相关于 pg_stat_bgwriter_checkpoint_sync_time\n" +
  "postgresql,checkpoint,,checkpoint_write_time,postgresql.checkpoint.checkpoint_write_time,Written Files to disk,文件写到磁盘时间,,ms,,,,,,,相关于 pg_stat_bgwriter_checkpoint_write_time\n" +
  "postgresql,slow_sql,,sql_text,postgresql.slow_sql.sql_text,SQL Text,慢SQL,string,,,需要提前配置并启用 pg_stat_statements。,,,,https://virtual-dba.com/blog/postgresql-performance-identifying-hot-and-slow-queries/,相关于 pg_stat_statements\n" +
  "postgresql,slow_sql,,calls,postgresql.slow_sql.calls,Calls,执行次数,int,,,,,,,,相关于 pg_stat_statements\n" +
  "postgresql,slow_sql,,total_time,postgresql.slow_sql.total_time,Total time,总耗时,float,ms,,,,,,,相关于 pg_stat_statements\n" +
  "postgresql,slow_sql,,avg_time,postgresql.slow_sql.avg_time,Average time,平均耗时,float,ms,,,,,,,相关于 pg_stat_statements\n" +
  "postgresql,slow_sql,,rows,postgresql.slow_sql.rows,Rows,受影响行数,int,,,,,,,,相关于 pg_stat_statements\n" +
  "oracle,status,,uptime,oracle.status.uptime,Uptime,运行时长,int,s,,,,,,,\n" +
  "oracle,basic,,startup_time,oracle.basic.startup_time,startTime,启动时间,string,,,,,,,,\n" +
  "oracle,basic,,version,oracle.basic.version,Version,版本号,string,,,,,,,,\n" +
  "oracle,total_sessions,,num,oracle.total_sessions.num,Total Sessions,会话总数,int,,,,,,,,\n" +
  "oracle,active_sessions,,num,oracle.active_sessions.num,Active Sessions,活动会话数,int,,,,,,,,\n" +
  "oracle,background_sessions,,num,oracle.background_sessions.num,Background Sessions,后台会话数,int,,,,,,,,\n" +
  "oracle,process,,process_count,oracle.process.process_count,Process count,进程数,int,,,,,,,,\n" +
  "oracle,execute,,executes,oracle.execute.executes,Executes,执行频率,float,次/s,,,,,,,\n" +
  "oracle,transaction,,commits,oracle.transaction.commits,Transactions Commits,事务提交频率,float,次/s,,,,,,,\n" +
  "oracle,transaction,,rollbacks,oracle.transaction.rollbacks,Transactions Rollbacks,事务回滚频率,float,次/s,,,,,,,\n" +
  "oracle,tablespace,,name,oracle.tablespace.name,Tablespace name,表空间名称,string,,,,,,,,\n" +
  "oracle,tablespace,,type,oracle.tablespace.type,Tablespace type,表空间类型,string,,,,,,,,\n" +
  "oracle,tablespace,,usage,oracle.tablespace.usage,Tablespace usage,表空间使用率,float,%,,,,,,,\n" +
  "oracle,tablespace,,free,oracle.tablespace.free,Tablespace free space,表空间剩余空间,int,B,,,,,,,\n" +
  "oracle,wait,,concurrent_wait_time,oracle.wait.concurrent_wait_time,Concurrent wait time,并发等待时间,float,ms,,,,,,,\n" +
  "oracle,wait,,commit_wait_time,oracle.wait.commit_wait_time,Commit wait time,提交等待时间,float,ms,,,,,,,\n" +
  "oracle,wait,,app_wait_time,oracle.wait.app_wait_time,Application wait time,应用等待时间,float,ms,,,,,,,\n" +
  "oracle,wait,,network_wait_time,oracle.wait.network_wait_time,Network wait time,网络等待事件,float,ms,,,,,,,\n" +
  "oracle,wait,,system_io_wait_time,oracle.wait.system_io_wait_time,System IO wait time,系统IO等待时间,float,ms,,,,,,,\n" +
  "oracle,wait,,user_io_wait_time,oracle.wait.user_io_wait_time,User IO wait time,用户IO等待时间,float,ms,,,,,,,\n" +
  "oracle,wait,,configure_wait_time,oracle.wait.configure_wait_time,Configure wait time,组态等待时间,float,ms,,,,,,,\n" +
  "oracle,wait,,scheduler_wait_time,oracle.wait.scheduler_wait_time,Scheduler wait time,Scheduler等待时间,float,ms,,,,,,,\n" +
  "oracle,res_util,,res_util_type,oracle.res_util.res_util_type,Resource utilization type,资源利用率类型,string,,,包括 branched、cmtcallbk、dml_locks、enqueue_locks等。,,,,,\n" +
  "oracle,res_util,,res_util,oracle.res_util.res_util,Resource utilization,资源利用率,int,%,,,,,,,\n" +
  "oracle,perf_collector,,total_collection,oracle.perf_collector.total_collection,Total collection,收集总数,int,,,,,,,,\n" +
  "oracle,perf_collector,,final_collection_time,oracle.perf_collector.final_collection_time,Final collection time,最后收集时间,float,s,,,,,,,\n" +
  "oracle,performance,,qps,oracle.performance.qps,QPS,IO请求频率,float,,,每秒IO请求数量。,I/O Requests per Second.,,,,\n" +
  "oracle,performance,,tps,oracle.performance.tps,TPS,用户事务频率,float,,,每秒用户事物处理数量。,User Transaction Per Sec.,,,,\n" +
  "oracle,performance,,mbps,oracle.performance.mbps,MBPS,IO速率(兆字节),float,,,每秒 I/O 兆字节数量。,I/O Megabytes per Second.,,,,\n" +
  "oracle,performance,,sql_resp_time,oracle.performance.sql_resp_time,SQL response time,SQL响应速率,float,,,,,,,,\n" +
  "oracle,cpu_stats,,type,oracle.cpu_stats.type,CPU stats type,CPU 统计类型,string,,,包括 CPU_session、CPU_user、CPU_background、CPU_TXN、CPU_time_consumed等。,,,,,\n" +
  "oracle,cpu_stats,,num,oracle.cpu_stats.num,CPU stats number,CPU 统计,int,,,,,,,,\n" +
  "oracle,mem_stats,,type,oracle.mem_stats.type,Memory stats type,内存统计类型,string,,,包括 PGA_memory、cache_used。,,,,,\n" +
  "oracle,mem_stats,,num,oracle.mem_stats.num,Memory stats size,内存统计,int,B,,,,,,,\n" +
  "oracle,cache_hit_ratio,,lib_cache_hit_ratio,oracle.cache_hit_ratio.lib_cache_hit_ratio,Library cache hit ratio,库缓存命中率,float,%,,,,,,,\n" +
  "oracle,cache_hit_ratio,,buffer_cache_hit_ratio,oracle.cache_hit_ratio.buffer_cache_hit_ratio,Buffer cache hit ratio,缓冲区缓存命中率,float,%,,,,,,,\n" +
  "sqlserver,statistics,,user_connections,sqlserver.statistics.user_connections,User connections,用户连接数,int,个,,\"检测时连接到SQL Server的用户数。\n" +
  "\n" +
  "默认情况下，SQL Server最多可启用32767个并发连接。您可以配置一个较低的最大值，尽管Microsoft只建议高级用户这样做，因为SQL Server会根据负载自动分配连接。将用户连接数量与其他指标相关联可以告诉您需要保护系统的哪些部分免受高需求的影响。例如，如果更多的连接似乎会创建更多的锁等待，那么您可能需要将优化工作集中在确定随着应用程序获得用户，哪些查询会导致锁。如果您的连接急剧下降，您可能需要对网络或客户端应用程序的任何更改进行故障排除。\",\"Count of users connected to SQL Server at the time of measurement.\n" +
  "\n" +
  "By default, SQL Server enables up to 32,767 concurrent connections. You can configure a lower maximum, though Microsoft recommends this only for advanced users: SQL Server automatically allocates connections based on load. Correlating the number of user connections with other metrics can tell you which parts of your system you need to protect from high demand. If more connections seem to be creating more lock waits, for example, you may want to focus your optimization efforts on determining which queries result in locks as your application gains users. If your connections have plummeted, you may need to troubleshoot your network or any changes to your client applications.\",,,,来自：General Statistics Object (performance counters)\n" +
  "sqlserver,tsql,,batch_request,sqlserver.tsql.batch_request,Batch requests,批处理请求频率,float,次/s,,\"每秒接收T-SQL批处理请求数。\n" +
  "\n" +
  "要获得数据库随时间推移的总体使用情况的高级视图，可以测量数据库引擎每秒接收的批处理请求数。批处理请求速率的突然变化可能会揭示可用性问题或需求的意外变化。\n" +
  "\n" +
  "然而，每秒告诉并不能告诉你单个批处理的成本。这既是因为批处理可以包括不确定数量的T-SQL语句，也是因为调用存储过程的批处理仍然可以算作单个批处理请求。为了衡量批处理的性能，您需要监控每秒的批处理请求以及其他工作指标，如执行计划的运行时间，以及数据库服务器中使用的内存等资源指标。\n" +
  "\n" +
  "虽然SQL Server会跟踪查询中的错误，但没有现成的指标可以将这些错误报告为计数和比率。如果上一个T-SQL语句产生错误，则内置函数@@ERROR返回错误代码，如果没有，则返回0。您可以在批处理或存储过程中使用此函数来处理错误。但是，由于它的值会随着每次新的执行而重置，因此您不能使用它来监控一段时间内的错误计数，除非您添加手动检测——例如，在完成并存储结果和时间戳之前编写批处理以执行函数@@ERROR。\",\"Rate of T-SQL batches received per second.\n" +
  "\n" +
  "To get a high-level view of the overall usage of your database over time, you can measure the number of batch requests the database engine receives per second. Sudden changes in the rate of batch requests can reveal availability issues or unexpected changes in demand.\n" +
  "\n" +
  "Yet the count of batch requests per second tells you little about the cost of an individual batch. This is both because batches can include an indefinite number of T-SQL statements and because a batch that calls stored procedures can still count as a single batch request. To measure the performance of your batches, you’ll want to monitor batch requests per second along with other work metrics, such as the elapsed time of an execution plan, as well as resource metrics like memory used within your database server.\n" +
  "\n" +
  "While SQL Server keeps track of errors in your queries, there are no ready-made metrics that report these as counts and rates. The built-in function @@ERROR returns an error code if the last T-SQL statement produced an error, and 0 if it did not. You can use this function within batches or stored procedures to handle errors. But since its value resets with each new execution, you can’t use it to monitor error counts over time unless you add manual instrumentation—e.g., writing your batches to execute the function @@ERROR before finishing and storing the results along with a timestamp.\",,,,来自：SQL Statistics Object (performance counters)\n" +
  "sqlserver,tsql,,last_elapsed_time,sqlserver.tsql.last_elapsed_time,Last elapsed time,,bigint,μs,,,\"Time taken to complete the most recent execution of a query plan, in microseconds.\n" +
  "\n" +
  "SQL Server improves query performance by compiling batches of T-SQL statements and caching them as execution plans. Since the process is automatic, you’ll want to make sure it behaves as intended, and creates execution plans that are optimal for your system. You can gauge the performance benefits of compilation by monitoring the time it takes for your execution plans to complete. With the sys.dm_exec_query_stats view, SQL Server returns a row of statistical data for each query plan within the cache, including the elapsed time of the most recent execution of the plan (last_elapsed_time).\n" +
  "\n" +
  "The elapsed time of an execution plan is a good proxy for how well SQL Server’s optimization techniques are working. If your execution plans are taking longer than expected to complete, it’s possible to optimize compilation yourself by using a query hint. For example, you can optimize your execution plan to retrieve the first n rows (FAST), remain within a memory limit (MAX_GRANT_PERCENT), or otherwise override the default optimization process.\n" +
  "\n" +
  "If you’re using the sys.dm_exec_query_stats dynamic management view to measure the elapsed time of your query plans, note that the view only stores statistics for execution plans within the cache. If a plan leaves the cache, you’ll lose any statistics about it in this view. You can still store those statistics in your own tables if you choose, using SQL Server’s plan_generation_num to link different recompilations of the same plan.\",,,,来自：sys.dm_exec_query_stats (Dynamic Management View)\n" +
  "sqlserver,tsql,,sql_compilations,sqlserver.tsql.sql_compilations,SQL compilations,SQL编译频率,float,次/s,,\"SQL Server每秒编译T-SQL查询语句的次数。\n" +
  "\n" +
  "SQL Server第一次执行批处理时，会将批处理编译为执行计划并缓存。在理想情况下，SQL Server只编译一次执行计划。最坏的情况是没有重用执行计划。在这种情况下，批处理每次执行时都会编译，每秒的批处理请求等于每秒的批编译。因此，将此指标与每秒接收的批处理请求的速率进行比较是很重要的。\n" +
  "\n" +
  "如果这些指标开始收敛，可以考虑将PARAMETERIZATION设置为FORCED来使用查询提示。强制参数化将SQL Server的查询编译配置为用参数替换某些T-SQL语句（SELECT、INSERT、UPDATE和DELETE）中的文字值，从而使生成的查询计划更具可重用性。\n" +
  "\n" +
  "请注意，“SQL编译频率”指标还包括语句级重新编译，这是SQL Server 2005中引入的一项功能，它只重新编译负责重新编译批处理的语句。如果强制参数化不能减少每秒SQL编译的次数，请考虑监控每秒的重新编译数。\",\"Number of times SQL Server compiles T-SQL queries per second.\n" +
  "\n" +
  "When SQL Server executes a batch for the first time, it compiles the batch into an execution plan and caches it. In an ideal case, SQL Server only compiles an execution plan once. The least desirable case is one where no execution plans are reused. In this scenario, batches compile every time they execute, and batch requests per second are equal to batch compilations per second. For this reason, it’s important to compare this metric to the rate of batch requests received per second.\n" +
  "\n" +
  "If these metrics are starting to converge, you may consider using query hints to set PARAMETERIZATION to FORCED. Forced parameterization configures SQL Server’s query compilation to replace literal values in certain T-SQL statements (SELECT, INSERT, UPDATE, and DELETE) with parameters, making the resulting query plans more reusable.\n" +
  "\n" +
  "Note that the “SQL compilations/sec” metric also includes statement-level recompilations, a feature introduced in SQL Server 2005 that recompiles only the statements responsible for the recompilation of a batch. If forced parameterization does not reduce the number of SQL compilations per second, consider monitoring recompilations per second.\",,,,来自：SQL Statistics Object (performance counters)\n" +
  "sqlserver,tsql,,sql_recompilations,sqlserver.tsql.sql_recompilations,SQL recompilations,SQL 重新编译频率,float,次/s,,\"每秒启动重新编译查询语句的次数。\n" +
  "\n" +
  "当SQL Server重新启动，或者当数据库的数据或结构发生足够的更改，导致执行计划无效时，执行计划会重新编译。虽然重新编译对于执行T-SQL批处理通常是必要的，但它可以消除执行时间上的任何节省。观察每秒重新编译的次数，看看它是否与性能下降相对应，或者它是否只是SQL Server针对表中的更改优化了执行计划的一个迹象。\n" +
  "\n" +
  "SQL Server根据其自动计算的阈值来批量重新编译，并且可以使用查询提示调整这些阈值并降低重新编译的速率。一个阈值是基于使用UPDATE、DELETE、MERGE和INSERT语句对表进行的更新。查询提示KEEP PLAN减少了表更新时重新编译的频率。另一个阈值是基于SQL Server维护的关于给定表中值分布的统计信息，该统计信息预测查询结果中的行数。查询提示KEEPFIXED PLAN会阻止由于这些统计信息中的变化而引起的重新编译。\n" +
  "\n" +
  "在进行影响重新编译阈值的更改之前，值得注意的是，由于SQL Server会根据你的表中的更改自动重新编译执行计划，因此重新编译可能会优化查询延迟，足以抵消初始性能成本。\",\"Number of times query recompilations are initiated per second.\n" +
  "\n" +
  "Execution plans are recompiled when SQL Server is restarted, or when the data or structure of a database has changed enough to render an execution plan invalid. While recompilation is often necessary for your T-SQL batches to execute, it can undo any savings in execution time. Watch the number of recompilations per second to see if it corresponds with drops in performance or if it is simply a sign that SQL Server has optimized execution plans for changes in your tables.\n" +
  "\n" +
  "SQL Server recompiles batches based on thresholds it calculates automatically, and it’s possible to adjust these thresholds and lower the rate of recompilation using query hints. One threshold is based on updates to a table made with UPDATE, DELETE, MERGE, and INSERT statements. The query hint KEEP PLAN reduces the frequency of recompilation when a table updates. Another threshold is based on statistics SQL Server maintains about the distribution of values in a given table, which predict the number of rows in a query result. The query hint KEEPFIXED PLAN prevents recompilation due to changes in these statistics.\n" +
  "\n" +
  "Before you make changes that affect the recompilation threshold, it’s worth noting that since SQL Server will automatically recompile execution plans based on changes within your tables, recompilations may improve query latency enough to offset the initial performance cost.\",,,,来自：SQL Statistics Object (performance counters)\n" +
  "sqlserver,buffer_cache,,buffer_cache_hit_ratio,sqlserver.buffer_cache.buffer_cache_hit_ratio,Buffer cache hit ratio,缓冲区缓存命中率,float,%,,\"在缓冲区缓存中找到的请求页面的百分比。\n" +
  "\n" +
  "缓冲区缓存命中率衡量缓冲区管理器从缓冲区缓存中提取页面的频率与从磁盘读取页面的频率。缓冲区缓存越大，SQL Server就越有可能在内存中找到所需的页面。SQL Server根据物理内存等各种系统资源自动计算缓冲区缓存的大小。如果缓冲区缓存命中率过低，一种解决方案是查看是否可以通过分配更多的系统内存来增加缓冲区缓存的大小。\",\"Percentage of requested pages found in the buffer cache.\n" +
  "\n" +
  "The buffer cache hit ratio measures how often the buffer manager can pull pages from the buffer cache versus how often it has to read a page from disk. The larger the buffer cache, the more likely it is that SQL Server can find its desired pages within memory. SQL Server calculates the size of the buffer cache automatically, based on various system resources such as physical memory. If your buffer cache hit ratio is too low, one solution is to see if you can increase the size of the buffer cache by allocating more system memory.\",,,,来自：Buffer Manager Object (performance counters)\n" +
  "sqlserver,buffer_cache,,page_life_expectancy,sqlserver.buffer_cache.page_life_expectancy,Page life expectancy,页面预期寿命,int,s,,\"页面预计在缓冲区缓存中生存的时间（以秒为单位）。\n" +
  "\n" +
  "与缓冲区缓存命中率一样，页面预期寿命指示缓冲区管理器在内存中保持读写操作的情况。此指标是页面在缓冲区缓存中预计保留的秒数。缓冲缓存作为一个或多个缓冲节点存在，这些缓冲节点支持由多个内存分配组成的非均匀内存访问（NUMA）体系结构。每个缓冲区节点报告页面在其中停留的最小秒数，缓冲区管理器性能对象对这些值进行平均，以获得其页面预期寿命。\n" +
  "\n" +
  "SQL Server在检查点或缓冲区管理器需要缓冲区缓存中更多空间时刷新页面。后一个过程称为延迟写入，它会刷新不常访问的脏页面。通常，较高的页面预期寿命表明数据库能够在内存中读取、写入和更新页面，而不是在磁盘上。\n" +
  "\n" +
  "默认情况下，SQL Server使用间接检查点，根据数据库在一定时间内恢复所需的频率来刷新脏页（如上所述，恢复间隔最初配置为自动设置）。由于间接检查点使用脏页的数量来确定数据库是否在目标恢复时间内，因此缓冲区管理器可能会因为频繁的刷新而导致性能下降。不同的检查点配置可以增加页面的预期寿命。\n" +
  "\n" +
  "了解低页面预期寿命是由于缓冲区缓存过小还是检查点过于频繁造成的是很有帮助的。如果是前者，您可以通过向SQL Server实例添加物理RAM来增加页面预期寿命。您可以通过监控检查点每秒刷新到磁盘的页面数量来确定页面周转率高的原因。\",\"Time a page is expected to spend in the buffer cache, in seconds.\n" +
  "\n" +
  "Like the buffer cache hit ratio, page life expectancy indicates how well the buffer manager is keeping read and write operations within memory. This metric shows the number of seconds a page is expected to remain in the buffer cache. The buffer cache exists as one or more buffer nodes, which support a non-uniform memory access (NUMA) architecture consisting of multiple memory allocations. Each buffer node reports the minimum number of seconds a page will remain within it, and the buffer manager performance object averages these values to obtain its page life expectancy.\n" +
  "\n" +
  "SQL Server flushes pages either at a checkpoint or when the buffer manager requires more space in the buffer cache. The latter process is called lazy writing, and flushes dirty pages that are accessed infrequently. Generally, higher page life expectancy indicates that your database is able to read, write, and update pages in memory, rather than on disk.\n" +
  "\n" +
  "By default, SQL Server uses indirect checkpoints, which flush dirty pages as often as it takes for the database to recover within a certain time (as discussed above, the recovery interval is initially configured to set automatically). Since indirect checkpoints use the number of dirty pages to determine whether the database is within the target recovery time, there’s a risk that the buffer manager will bog down performance with aggressive flushing. A different checkpoint configuration can increase the life expectancy of your pages.\n" +
  "\n" +
  "It’s helpful to understand whether a low page life expectancy is due to an undersized buffer cache or overly frequent checkpoints. If it’s the former, you can increase page life expectancy by adding physical RAM to your SQL Server instances. You can determine the cause of high page turnover by monitoring the number of pages flushed to disk per second by a checkpoint.\",,,,来自：Buffer Manager Object (performance counters)\n" +
  "sqlserver,buffer_cache,,checkpoint_pages,sqlserver.buffer_cache.checkpoint_pages,Checkpoint pages,检查点page写入磁盘频率,float,页/s,,\"检查点每秒写入磁盘的页数。\n" +
  "\n" +
  "在检查点期间，缓冲区管理器将所有脏页写入磁盘。在延迟写入过程中，SQL Server只写入一些页面，让缓冲区管理器在缓冲区缓存中为新页面腾出空间。通过监控页面从缓冲区缓存移动到磁盘的速率，特别是在检查点期间，您可以开始确定是添加系统资源（以创建更大的缓冲区缓存）还是在优化缓冲区管理器时重新配置检查点（例如，通过指定恢复时间）。\",\"Number of pages written to disk per second by a checkpoint.\n" +
  "\n" +
  "During a checkpoint, the buffer manager writes all dirty pages to disk. As we’ve seen, during lazy writing, SQL Server only writes some pages, letting the buffer manager make room in the buffer cache for new pages. By monitoring the rate at which pages are moved from the buffer cache to disk specifically during checkpoints, you can start to determine whether to add system resources (to create a larger buffer cache) or reconfigure your checkpoints (e.g., by specifying a recovery time) as you work to optimize the buffer manager.\",,,,来自：Buffer Manager Object (performance counters)\n" +
  "sqlserver,table_resource,,memory_used_by_table,sqlserver.table_resource.memory_used_by_table,Memory used by table,Memory used by table,int,KB,,,,,,,\"For memory-optimized tables, the memory used in kilobytes, by table.\n" +
  "\n" +
  "With any RDBMS, you’ll want to make sure there’s enough room for your data, and SQL Server’s memory-optimized tables elevate memory to the same level of importance as storage. Memory-optimized tables in SQL Server 2016 and beyond can be of any size, as long as they fit within the limits of your system memory.\n" +
  "\n" +
  "It’s important to compare the size of your memory-optimized tables with the memory available on your system. Microsoft recommends maintaining enough system memory to accommodate twice the estimated size of the data and indexes within a memory-optimized table. This is not only because you need room for the indexes and data themselves, but also because memory-optimized tables enable concurrent reads and writes by storing several versions of a single row. Since memory-optimized tables can be as large as memory allows, it’s important to leave aside enough resources to support their growth.\n" +
  "\n" +
  "Memory-optimized tables are designed to accommodate high-throughput, low-latency transactions. You can monitor the rate of queries to in-memory tables alongside their resource use to see if your use case fits this profile.\"\n" +
  "sqlserver,table_resource,,disk_used_by_table,sqlserver.table_resource.disk_used_by_table,Disk used by table,Disk used by table,int,,,,\"Space used by data or by indexes in a given table.\n" +
  "\n" +
  "If your server is running out of disk space, it’s critical to get notified with enough lead time that you can take action. The stored procedure sp_spaceused returns the disk usage for a specific table or database.\n" +
  "\n" +
  "As your data nears capacity, you’ll want to think about the design of your storage. SQL Server lets you configure the way your tables use disk space. It’s possible, for instance, to distribute your data files across multiple disks and assign them to a logical unit, the filegroup. You can use T-SQL statements to declare a filegroup and associate files with it by path. When you declare a table, you can assign it to a filegroup. Queries to the table will read and write data to files in the filegroup. Since files in a filegroup can be local or remote, you can counteract limited system space by adding files from separate drives. And as SQL Server can access multiple disks at once, filegroups can improve performance.\",,,,来自：sp_spaceused (Stored Procedure)\n" +
  "sqlserver,lock,,average_wait_lock_time,sqlserver.lock.average_wait_lock_time,Average wait lock time,平均等待锁时间,float,,,SQL Server在多个用户访问时会锁定资源，以避免任何误读。SQL Server还提供了平均等待锁定时间中的几个锁定指标。平均等待锁定时间应尽可能短，因为您不希望用户等待资源的时间过长。,An SQL Server locks the resources when accessed by multiple users to avoid any misreads. The SQL Server also provides several locks metrics among the average wait lock time. The Average Wait lock time should be as short as possible as you do not want your users to be waiting for resources for too long.,,,https://learn.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-locks-object?view=sql-server-linux-ver16,\n" +
  "sqlserver,lock,,lock_waits,sqlserver.lock.lock_waits,Lock waits,等待锁的频率,float,次/s,,\"每秒导致调用事务等待锁定的请求数。\n" +
  "\n" +
  "如果其他资源过于频繁地等待您的锁解除，您可以采取以下几个步骤。例如，您可以设置事务的隔离级别。在偶尔的情况下，锁可能会将其覆盖范围扩展到最佳粒度级别之外，这种情况称为锁升级。在这种情况下，您可以分解事务，以推动查询处理器使用限制较少的锁。\",\"Number of requests causing the calling transaction to wait for a lock, per second.\n" +
  "\n" +
  "If other resources are waiting too frequently for your locks to lift, there are several steps you can take. You can for instance set the isolation level of a transaction. In occasional cases, a lock might expand its reach beyond the optimal level of granularity, a situation called lock escalation. In this case, you can break up your transactions to nudge the query processor toward less restrictive locks.\",,,,来自：Locks Object (performance counters)\n" +
  "sqlserver,statistics,,processes_blocked,sqlserver.statistics.processes_blocked,Processes blocked,被阻塞进程数,float,,,\"检测时被阻塞的进程数。\n" +
  "\n" +
  "当SQL Server中的一个任务等待另一个任务的锁定资源时，该任务将被阻塞。虽然每秒锁定等待的次数可以告诉您请求需要等待资源的频率，但最好了解阻塞当前对系统的影响程度。跟踪这一情况的一种方法是监视被阻塞进程的数量。\n" +
  "\n" +
  "您可能希望将此指标与其他指标相关联，例如查询计划执行的运行时间，以查看阻塞的进程对查询的影响程度。\n" +
  "\n" +
  "如果阻塞进程的数量持续增加，则可能需要检查是否出现死锁，即多个事务正在等待解除彼此的锁。\",\"Count of processes blocked at the time of measurement.\n" +
  "\n" +
  "When a task within SQL Server waits for another task’s locked resources, that task is blocked. While the number of lock waits per second can tell you how often a request has needed to wait for a resource, it’s also good to know the extent to which blocking is currently affecting your system. One way to track this is by monitoring the number of blocked processes.\n" +
  "\n" +
  "You may want to correlate this metric with others, such as the elapsed time of your query plan executions, to see the extent to which blocked processes are affecting your queries.\n" +
  "\n" +
  "If your count of blocked processes is persistently elevated, you may want to check for deadlocks—occurrences where multiple transactions are waiting for one another’s locks to lift.\",,,,来自：General Statistics Object (performance counters)\n" +
  "sqlserver,resource_pool,,used_memory,sqlserver.resource_pool.used_memory,Used memory,资源池已用内存,float,KB,,\"资源池中使用的内存（KB）。\n" +
  "\n" +
  "SQL Server实例有一定数量的内存可用于执行查询。在资源池中，MIN_MEMORY_PERCENT和MAX_MEMORY_PERCENT分别表示资源池可以使用的SQL Server实例内存百分比的硬下限和上限。资源池必须至少使用其MIN_MEMORY_PERCENT，最多使用其MAX_MEMORY_PERCENT。\",\"Kilobytes of memory used in the resource pool.\n" +
  "\n" +
  "A SQL Server instance has a certain amount of memory available for query execution. Within a resource pool, MIN_MEMORY_PERCENT and MAX_MEMORY_PERCENT indicate a hard floor or ceiling, respectively, on the percentage of a SQL Server instance’s memory that a resource pool can use. A resource pool must use at least its MIN_MEMORY_PERCENT and at most its MAX_MEMORY_PERCENT.\",,,,来自：Resource Pool Stats Object (performance counters)\n" +
  "sqlserver,resource_pool,,memory_util,sqlserver.resource_pool.memory_util,Memory utilization,Memory utilization,,%,,,\"MIN_MEMORY_PERCENT and MAX_MEMORY_PERCENT parameters signify the amount of memory assigned per resource pool. These are different from the CPU usage parameters because the memory assigned for a particular resource will not be shared by another, even when the current resource has no active requests.\n" +
  "\n" +
  "It is thus recommended to cautiously assign these resources. MAX_MEMORY_PERCENT conveys that when active requests are running on this pool, this would be the maximum amount of memory available.\",,,,来自：Resource Pool Stats Object (performance counters)\n" +
  "sqlserver,resource_pool,,cpu_util,sqlserver.resource_pool.cpu_util,CPU utilization,资源池CPU使用率,float,%,,\"资源池中所有工作负载组使用的CPU百分比。\n" +
  "\n" +
  "当您设置CPU使用率的最小值和最大值时，只有当几个池之间使用的CPU比可用的多时，该限制才适用。换句话说，如果没有其他池在使用，则一个池可以使用超过其MAX_CPU_PERCENT的资源。但是，您可以使用CAP_CPU_PERCENT设置硬限制。与资源池中使用的内存一样，您需要了解用户中常见的CPU消耗类型，然后确定是否可以通过设置硬限制或软限制来优化资源。\",\"Percentage of CPU used by all workload groups in the resource pool.\n" +
  "\n" +
  "When you set a minimum and a maximum for CPU usage, that limit only applies when several pools would otherwise use more CPU between them than what’s available. In other words, a pool can use more than its MAX_CPU_PERCENT if no other pool is using it. You can, however, set a hard limit with CAP_CPU_PERCENT. As with the memory used within a resource pool, you’ll want to see what sort of CPU consumption is common among your users, then determine whether you can optimize your resources by setting hard or soft limits.\",,,,来自：Resource Pool Stats Object (performance counters)\n" +
  "sqlserver,resource_pool,,disk_read_io,sqlserver.resource_pool.disk_read_io,Disk read IO,资源池磁盘读取频率,float,次/s,,\"每个资源池在最后一秒内的磁盘读取操作计数。\n" +
  "\n" +
  "磁盘I/O规则是根据每秒I/O操作数（IOPS）定义的。您可以通过设置MIN_IOPS_per_volume和MAX_IOPS_per_volume来配置给定资源池中每个磁盘卷的I/O利用率。如果您正在设置这些限制，那么通过按资源池测量磁盘读写频率可以显示您的池有多接近其限制频率，以及该限制频率是否合适。\",\"Count of disk read operations in the last second per resource pool.\n" +
  "\n" +
  "Rules for disk I/O are defined in terms of I/O operations per second (IOPS). You can configure I/O utilization per disk volume within a given resource pool by setting MIN_IOPS_PER_VOLUME and MAX_IOPS_PER_VOLUME. If you’re setting these limits, measuring disk reads and writes per second by resource pool can show how often your pools approach their constraints and whether another option is appropriate.\",,,,来自：Resource Pool Stats Object (performance counters)\n" +
  "sqlserver,resource_pool,,disk_write_io,sqlserver.resource_pool.disk_write_io,Disk write IO,资源池磁盘写入频率,float,次/s,,\"每个资源池在最后一秒内的磁盘写入操作计数。\n" +
  "\n" +
  "磁盘I/O规则是根据每秒I/O操作数（IOPS）定义的。您可以通过设置MIN_IOPS_per_volume和MAX_IOPS_per_volume来配置给定资源池中每个磁盘卷的I/O利用率。如果您正在设置这些限制，那么通过按资源池测量磁盘读写频率可以显示您的池有多接近其限制频率，以及该限制频率是否合适。\",\"Count of disk write operations in the last second per resource pool.\n" +
  "\n" +
  "Rules for disk I/O are defined in terms of I/O operations per second (IOPS). You can configure I/O utilization per disk volume within a given resource pool by setting MIN_IOPS_PER_VOLUME and MAX_IOPS_PER_VOLUME. If you’re setting these limits, measuring disk reads and writes per second by resource pool can show how often your pools approach their constraints and whether another option is appropriate.\",,,,来自：Resource Pool Stats Object (performance counters)\n" +
  "sqlserver,resource_pool,,disk_queue_length,sqlserver.resource_pool.disk_queue_length,Disk queue length,Disk queue length,,,,,,,,,\n" +
  "sqlserver,resource_pool,,memory_pages,sqlserver.resource_pool.memory_pages,Memory pages,Memory pages,,次/s,,,\"Memory pages per second is an indicator that can help you identify the faults causing system-wide delays. A significantly higher value signifies that the rate of paging memory to and from the disk is too high, causing the overall performance to diminish.\n" +
  "\n" +
  "This happens when one or more applications are using the memory heavily and the system is transferring data to fulfill the demands. Possible solutions include monitoring your page fault statistics and scaling back the number of running applications.\",,,,\n" +
  "sqlserver,resource_pool,,latch_wait_time,sqlserver.resource_pool.latch_wait_time,Latch wait time,Latch wait time,,,,,\"An SQL Server uses latches to maintain data integrity across shared resources. These synchronization objects can be classified into two major classes: Buffer and Non-Buffer.\n" +
  "\n" +
  "With sys.dm_os_latch_stats, you can view your latch statistics in case of a delay. Latch wait delay occurs when the I/O systems can not keep up with the active requests for a long duration of time and take longer than usual to fetch pages from disks to memory.\",,,,\n" +
  "sqlserver,index,,page_splits,sqlserver.index.page_splits,Page splits,Page splits,,次/s,,,\"Count of page splits resulting from index page overflows per second.\n" +
  "\n" +
  "As your data grows, so do your indexes. Like data, indexes are stored on pages. A page split occurs when an index page is too full for new data. SQL Server responds by creating an index page and moving about half of the rows from the old page to the new one. This process consumes I/O resources.\n" +
  "\n" +
  "You can prevent page splits by specifying the fill factor of an index, the percentage of an index page to keep filled. By default, the fill factor is zero, and when an index page is filled entirely, a page split takes place. Specifying a fill factor leaves a percentage of each page empty and allows new rows to enter without splitting the page. If you specify a fill factor of an index, SQL Server will store that index across more pages, so that each page has some room set aside for future growth.\n" +
  "\n" +
  "By correlating high or low rates of page splits with other metrics, you can determine if you should increase or decrease the fill factor. The lower the fill factor (without being zero), the more pages an index takes up. If an index is stored across a larger number of pages, read operations will need to access more of them, increasing latency. Yet with a higher fill factor or a fill factor of zero, you’ll get more frequent page splits and see a rise in lock waits, as SQL Server cordons off the splitting page. Monitoring these metrics can reveal which settings are optimal for your infrastructure.\n" +
  "\n" +
  "Note that since memory-optimized tables use eight-byte pointers rather than pages, indexes for memory-optimized tables do not have a fill factor, nor do you have to worry about page splits.\",,,,\n" +
  "sqlserver,index,,avg_fragmentation_ratio,sqlserver.index.avg_fragmentation_ratio,Average fragmentation ratio,Average fragmentation ratio,,%,,,\"Percentage of leaf pages in an index that are out of order.\n" +
  "\n" +
  "Fragmentation occurs when the order of data within an index drifts from the order in which data is stored on disk—and it can slow performance. Fragmentation is often a side effect of a growing, changing database, whether it’s a consequence of page splits or a result of SQL Server’s adjustments to the index as you insert, update, and delete entries.\n" +
  "\n" +
  "Indexes within SQL Server are structured as B-trees. Index pages serve as nodes within the tree. Nodes with no children, the outermost nodes within the tree, are called leaf nodes. Depending on the design of your index, a leaf node is either a data page or an index page. You can find out how much fragmentation your database has sustained by monitoring avg_fragmentation_in_percent, the percentage of leaf pages in your index that are out of order. If database fragmentation is dragging performance below what’s expected, you may consider rebuilding your index. As with fill factor, fragmentation is not relevant for memory-optimized tables.\",,,,\n" +
  "dm,sessions,,state,dm.sessions.state,,会话状态名,,,,sessions状态 idel active ,,,,,\n" +
  "dm,sessions,,num,dm.sessions.num,,会话数量,,,,,,,,,\n" +
  "dm,basic,,instance_name,dm.basic.instance_name,,实例名称,,,,,,,,,\n" +
  "dm,basic,,port,dm.basic.port,,端口,,,,,,,,,\n" +
  "dm,basic,,system_path,dm.basic.system_path,,系统路径,,,,,,,,,\n" +
  "dm,basic,,max_sessions,dm.basic.max_sessions,,最大会话数,,,,,,,,,\n" +
  "dm,thread,,dm_sql_thd,dm.thread.dm_sql_thd,,SQL线程数,,,,,,,,,\n" +
  "dm,thread,,dm_io_thd,dm.thread.dm_io_thd,,IO线程数,,,,,,,,,\n" +
  "dm,thread,,dm_tskwrk_thd,dm.thread.dm_tskwrk_thd,,任务线程数,,,,,,,,,\n" +
  "dm,thread,,dm_wrkgrp_thd,dm.thread.dm_wrkgrp_thd,,工作线程数,,,,,,,,,\n" +
  "dm,instance,,name,dm.instance.name,,实例名称,,,,,,,,,\n" +
  "dm,instance,,host_name,dm.instance.host_name,,主机名称,,,,,,,,,\n" +
  "dm,instance,,db_version,dm.instance.db_version,,数据库版本,,,,,,,,,\n" +
  "dm,instance,,svr_version,dm.instance.svr_version,,服务器版本,,,,,,,,,\n" +
  "dm,instance,,status,dm.instance.status,,状态,,,,,,,,,\n" +
  "dm,instance,,start_time,dm.instance.start_time,,开始时间,,,,,,,,,\n" +
  "dm,slow_sql,,ds_sess_id,dm.slow_sql.ds_sess_id,,被阻塞的会话ID,,,,,,,,,\n" +
  "dm,slow_sql,,ds_sql_text,dm.slow_sql.ds_sql_text,,被阻塞的SQL,,,,,,,,,\n" +
  "dm,slow_sql,,ds_trx_id,dm.slow_sql.ds_trx_id,,被阻塞的事务ID,,,,,,,,,\n" +
  "dm,slow_sql,,ltype,dm.slow_sql.ltype,,锁类型,,,,,,,,,\n" +
  "dm,slow_sql,,ds_create_time,dm.slow_sql.ds_create_time,,开始阻塞时间,,,,,,,,,\n" +
  "dm,slow_sql,,ss_sess_id,dm.slow_sql.ss_sess_id,,占用锁的会话ID,,,,,,,,,\n" +
  "dm,slow_sql,,ss_sql_text,dm.slow_sql.ss_sql_text,,占用锁的SQL,,,,,,,,,\n" +
  "dm,slow_sql,,ss_clnt_ip,dm.slow_sql.ss_clnt_ip,,占用锁的客户端IP,,,,,,,,,\n" +
  "dm,mem,,buffer_size,dm.mem.buffer_size,,系统缓冲区大小,,MB,,推荐值：系统缓冲区大小为可用物理内存的 60%～80%。有效值范围（8~1048576）,,,,,\n" +
  "dm,mem,,mem_pool,dm.mem.mem_pool,,共享内存池大小,,MB,,共享内存池是由 DM 管理的内存。有效值范围：32 位平台为（642000），64 位平台为（6467108864）,,,,,\n" +
  "dm,buffer_pool,,name,dm.buffer_pool.name,,缓冲池名称,,,,,,,,,\n" +
  "dm,buffer_pool,,n_pages,dm.buffer_pool.n_pages,,缓冲池页数,,,,,,,,,\n" +
  "dm,buffer_pool,,free,dm.buffer_pool.free,,缓冲池空闲页数目,,,,\"如果 free（缓冲区空闲页数目） 较大，说明该缓冲区空闲，可以适当的调整降低 buffer 缓冲区参数值。\n" +
  "如果 free 项为 0，或者 N_DISCARD64（淘汰页数） 非零，表示该缓冲区经常淘汰，说明对应的缓冲区参数太小，导致频繁淘汰，需要调整对应的缓冲区的参数。\",,,,,\n" +
  "dm,buffer_pool,,n_discard64,dm.buffer_pool.n_discard64,,缓冲池淘汰页数,,,,如果 free 项为 0，或者 N_DISCARD64（淘汰页数） 非零，表示该缓冲区经常淘汰，说明对应的缓冲区参数太小，导致频繁淘汰，需要调整对应的缓冲区的参数。,,,,,\n" +
  "dm,buffer_hit_ratio,,name,dm.buffer_hit_ratio.name,,缓冲区名称,,,,,,,,,\n" +
  "dm,buffer_hit_ratio,,sf_get_page_size,dm.buffer_hit_ratio.sf_get_page_size,,缓冲区大小,,,,,,,,,\n" +
  "dm,buffer_hit_ratio,,rat_hit,dm.buffer_hit_ratio.rat_hit,,缓冲区命中率,,,,\"数据缓冲区是 DMSERVER 在将数据页写入磁盘之前以及从磁盘上读取数据页之后，数据页所存储的地方。\n" +
  "\n" +
  "数据缓冲区设定得太小，会导致缓冲页命中率低，磁盘 IO 频繁；将其设定得太大，又会导致操作系统内存本身不够用。\",,,,,\n" +
  "dm,tablespace,,name,dm.tablespace.name,,表空间名称,,,,,,,,,\n" +
  "dm,tablespace,,size,dm.tablespace.size,,表空间大小,,MB,,,,,,,\n" +
  "dm,tablespace,,used,dm.tablespace.used,,已使用空间,,MB,,,,,,,\n" +
  "dm,tablespace,,usage,dm.tablespace.usage,,表空间使用率,,%,,,,,,,\n" +
  "dm,checkpoint,,last_begin_time,dm.checkpoint.last_begin_time,,末次检查点开始时间,,,,,,,,,\n" +
  "dm,checkpoint,,last_end_time,dm.checkpoint.last_end_time,,末次检查点结束时间,,,,,,,,,\n" +
  "dm,unsubmitted_trx_table,,object_name,dm.unsubmitted_trx_table.object_name,,未提交事务的表名称,,,,有事务未提交的表名称。,,,,,\n" +
  "dm,unsubmitted_trx_table,,sess_id,dm.unsubmitted_trx_table.sess_id,,会话ID,,,,有事务未提交的会话ID。,,,,,\n" +
  "dm,unsubmitted_trx_table,,trx_id,dm.unsubmitted_trx_table.trx_id,,未提交事务ID,,,,,,,,,\n" +
  "dm,max_mem_used_sql,,sessid,dm.max_mem_used_sql.sessid,,会话ID,,,,,,,,,\n" +
  "dm,max_mem_used_sql,,max_mem_used,dm.max_mem_used_sql.max_mem_used,,最大使用内存,,,,\"通过此 SQL 语句确定使用内存较大的 SQL，进行针对性的优化，如消除 HASH,SORT,DISTINCT 等操作。该查询只能查询当前活动 STMT 上的语句消耗情况，历史情况需要查询 V$SQL_STAT_HISTORY\",,,,,\n" +
  "dm,max_mem_used_sql,,sql_txt,dm.max_mem_used_sql.sql_txt,,最多使用内存SQL,,,,,,,,,\n" +
  "dm,max_phy_read_sql,,sessid,dm.max_phy_read_sql.sessid,,会话ID,,,,,,,,,\n" +
  "dm,max_phy_read_sql,,sql_txt,dm.max_phy_read_sql.sql_txt,,最多物理读SQL,,,,,,,,,\n" +
  "dm,max_phy_read_sql,,user_name,dm.max_phy_read_sql.user_name,,用户名称,,,,,,,,,\n" +
  "dm,max_phy_read_sql,,state,dm.max_phy_read_sql.state,,状态,,,,,,,,,\n" +
  "dm,max_phy_read_sql,,phy_read_cnt,dm.max_phy_read_sql.phy_read_cnt,,物理读次数,,,,,,,,,\n" +
  "dm,max_phy_read_sql,,io_wait_time,dm.max_phy_read_sql.io_wait_time,,IO等待时间,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n" +
  "mysql,,,,mysql..,,,,,,,,,,,\n"



export default data
