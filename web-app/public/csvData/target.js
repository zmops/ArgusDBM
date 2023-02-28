const data = 'mysql,status,,uptime,mysql.status.uptime,Uptime,运行时长,number,s,,MySQL服务进程自上次重启以来的运行时长。,The amount of time since the last restart of the MySQL server process.,"          {\n' +
  '            ""color"": ""rgba(245, 54, 54, 0.9)"",\n' +
  '            ""value"": null\n' +
  '          },\n' +
  '          {\n' +
  '            ""color"": ""rgba(237, 129, 40, 0.89)"",\n' +
  '            ""value"": 300\n' +
  '          },\n' +
  '          {\n' +
  '            ""color"": ""rgba(50, 172, 45, 0.97)"",\n' +
  '            ""value"": 3600\n' +
  '          }",5,,\n' +
  'mysql,basic,,version,mysql.basic.version,Version,版本号,string,,,,,,5,,\n' +
  'mysql,performance,,qps,mysql.performance.qps,Current QPS,当前QPS,float,次/s,,当前QPS\\n\\n基于MySQL命令 SHOW STATUS 的结果，是最近一小段时间内平均每秒执行的语句数量。与 questions 指标不同，本指标的统计范围包含存储程序执行的语句。它并不包含 COM_PING 和 COM_STATISTICS 命令。,"Current QPS\\n\\nBased on the queries reported by MySQL\'s SHOW STATUS command, it is the number of statements executed by the server within the last second. This variable includes statements executed within stored programs, unlike the Questions variable. It does not count COM_PING or COM_STATISTICS commands.\n' +
  '","          {\n' +
  '            ""color"": ""rgba(245, 54, 54, 0.9)"",\n' +
  '            ""value"": null\n' +
  '          },\n' +
  '          {\n' +
  '            ""color"": ""rgba(237, 129, 40, 0.89)"",\n' +
  '            ""value"": 35\n' +
  '          },\n' +
  '          {\n' +
  '            ""color"": ""rgba(50, 172, 45, 0.97)"",\n' +
  '            ""value"": 75\n' +
  '          }",5,"https://dev.mysql.com/doc/refman/5.7/en/server-status-variables.html#statvar_Queries\n' +
  '\n' +
  'https://segmentfault.com/a/1190000040620512",\n' +
  'mysql,performance,,questions,mysql.performance.questions,Questions,Questions,,,,**MySQL Questions**\\n\\n服务器执行的语句数。这只包括客户端发送到服务器的语句，而不包括存储程序中执行的语句，这与QPS计算中使用的查询不同。 \\n\\n此变量不计算以下命令：\\n* ``COM_PING``\\n* ``COM_STATISTICS``\\n* ``COM_STMT_PREPARE``\\n* ``COM_STMT_CLOSE``\\n* ``COM_STMT_RESET``,"**MySQL Questions**\\n\\nThe number of statements executed by the server. This includes only statements sent to the server by clients and not statements executed within stored programs, unlike the Queries used in the QPS calculation. \\n\\nThis variable does not count the following commands:\\n* ``COM_PING``\\n* ``COM_STATISTICS``\\n* ``COM_STMT_PREPARE``\\n* ``COM_STMT_CLOSE``\\n* ``COM_STMT_RESET``",,,,\n' +
  'mysql,performance,,slow_queries,mysql.performance.slow_queries,Slow Queries,慢查询,,,,**慢查询**\\n\\n慢查询定义为比long_query_time设置慢的查询。例如，如果将long_query_time设置为3，则超过3秒的所有查询为慢查询。,"**MySQL Slow Queries**\\n\\nSlow queries are defined as queries being slower than the long_query_time setting. For example, if you have long_query_time set to 3, all queries that take longer than 3 seconds to complete will show on this graph.",,,,\n' +
  'mysql,performance,,slow_sql,mysql.performance.slow_sql,Slow SQL,慢SQL,,,,,,,,"https://www.percona.com/blog/mysql-101-how-to-find-and-tune-a-slow-sql-query/\n' +
  '\n' +
  'https://pmmdemo.percona.com/graph/d/pmm-qan/pmm-query-analytics",\n' +
  'mysql,slow_sql,,sql_text,mysql.slow_sql.sql_text,Slow SQL Text,慢SQL语句,string,,,,,,,"https://www.percona.com/blog/mysql-101-how-to-find-and-tune-a-slow-sql-query/\n' +
  '\n' +
  'https://pmmdemo.percona.com/graph/d/pmm-qan/pmm-query-analytics",需要开启慢SQL功能，配置将慢SQL输出到数据库表 https://www.cnblogs.com/chenfool/p/mysql-man-cha-xun-mansql-ji-lu-he-diao-zheng.html\n' +
  'mysql,slow_sql,,start_time,mysql.slow_sql.start_time,Start time,慢SQL开始时间,,,,,,,,"https://www.percona.com/blog/mysql-101-how-to-find-and-tune-a-slow-sql-query/\n' +
  '\n' +
  'https://pmmdemo.percona.com/graph/d/pmm-qan/pmm-query-analytics",\n' +
  'mysql,slow_sql,,db,mysql.slow_sql.db,DB,慢SQL所属库,string,,,,,,,"https://www.percona.com/blog/mysql-101-how-to-find-and-tune-a-slow-sql-query/\n' +
  '\n' +
  'https://pmmdemo.percona.com/graph/d/pmm-qan/pmm-query-analytics",\n' +
  'mysql,slow_sql,,query_time,mysql.slow_sql.query_time,Query time,慢SQL耗时,,,,,,,,"https://www.percona.com/blog/mysql-101-how-to-find-and-tune-a-slow-sql-query/\n' +
  '\n' +
  'https://pmmdemo.percona.com/graph/d/pmm-qan/pmm-query-analytics",\n' +
  'mysql,basic,,innodb_buffer_pool_size,mysql.basic.innodb_buffer_pool_size,InnoDB Buffer Pool Size,InnoDB缓存池大小,int,KB,,InnoDB 维护着名为缓存池的存储区域，用于在内存中缓存数据和索引。了解 InnoDB 缓存池的工作原理，并利用它将频繁访问的数据保存在内存中，是MySQL调优工作最重要的方面之一。调优的目标是将使用中的数据保存在内存中。在大多数情况下，它应该占专用数据库主机上可用内存的60%-90%之间，但这一比例取决于许多因素。,"InnoDB Buffer Pool Size\\n\\nInnoDB maintains a storage area called the buffer pool for caching data and indexes in memory. Knowing how the InnoDB buffer pool works, and taking advantage of it to keep frequently accessed data in memory, is one of the most important aspects of MySQL tuning. The goal is to keep the working set in memory. In most cases, this should be between 60%-90% of available memory on a dedicated database host, but depends on many factors.","          {\n' +
  '            ""color"": ""rgba(50, 172, 45, 0.97)"",\n' +
  '            ""value"": null\n' +
  '          },\n' +
  '          {\n' +
  '            ""color"": ""rgba(237, 129, 40, 0.89)"",\n' +
  '            ""value"": 90\n' +
  '          },\n' +
  '          {\n' +
  '            ""color"": ""rgba(245, 54, 54, 0.9)"",\n' +
  '            ""value"": 95\n' +
  '          }",5,https://www.percona.com/blog/80-ram-tune-innodb_buffer_pool_size/,\n' +
  'mysql,handler,,handler_used_ratio,mysql.handler.handler_used_ratio,Handler Used Ratio,句柄使用率,float,%,,,,,3,,File Handler 缩写为 Handler 没有歧义吧？没有\n' +
  'mysql,handler,,handler_commit,mysql.handler.handler_commit,Handler Commit,句柄Commit,float,次/s,,,,,,https://dev.mysql.com/doc/refman/5.7/en/server-status-variables.html#statvar_Handler_commit,\n' +
  'mysql,handler,,handler_prepare,mysql.handler.handler_prepare,Handler Prepare,句柄Prepare,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_rollback,mysql.handler.handler_rollback,Handler Rollback,句柄Rollback,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_read_next,mysql.handler.handler_read_next,Handler Read Next,句柄Read Next,float,次/s,,当存储引擎被要求“读取下一个索引项”时，`read_next` 将递增。高值表示正在进行大量索引扫描。,`read_next` is incremented when the storage engine is asked to \'read the next index entry\'. A high value means a lot of index scans are being done.,,,,\n' +
  'mysql,handler,,handler_read_rnd_next,mysql.handler.handler_read_rnd_next,Handler Read Rnd Next,句柄Read Rnd Next,float,次/s,,当服务执行全表扫描时，`read_rnd_next` 将递增。这个值不应该很高。,`read_rnd_next` is incremented when the server performs a full table scan and this is a counter you don\'t really want to see with a high value.,,,,\n' +
  'mysql,handler,,handler_write,mysql.handler.handler_write,Handler Write,句柄Write,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_external_lock,mysql.handler.handler_external_lock,Handler External Lock,句柄External Lock,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_read_key,mysql.handler.handler_read_key,Handler Read Key,句柄Read Key,float,次/s,,当对索引进行读取时，`read_key` 递增。,`read_key` is incremented when a read is done with an index.,,,,\n' +
  'mysql,handler,,handler_update,mysql.handler.handler_update,Handler Update,句柄Update,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_delete,mysql.handler.handler_delete,Handler Delete,句柄Delete,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_read_first,mysql.handler.handler_read_first,Handler Read First,句柄Read First,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_read_rnd,mysql.handler.handler_read_rnd,Handler Read Rnd,句柄Read Rnd,float,次/s,,,,,,,\n' +
  'mysql,basic,,max_connections,mysql.basic.max_connections,Max Connection,最大连接数,int,,,最大连接数是同时允许的最大客户端连接数。默认情况下，该值为151。增加该值会增加mysqld所需的文件描述符的数量。如果所需数量的描述符不可用，服务器将降低“最大连接数”的值。\\n\\nmysqld实际上允许Max Connections+1个客户端进行连接。额外的连接保留给具有SUPER权限的帐户（如root）使用。,"Max Connections is the maximum permitted number of simultaneous client connections. By default, this is 151. Increasing this value increases the number of file descriptors that mysqld requires. If the required number of descriptors are not available, the server reduces the value of Max Connections.\\n\\nmysqld actually permits Max Connections + 1 clients to connect. The extra connection is reserved for use by accounts that have the SUPER privilege, such as root.",,,,\n' +
  'mysql,connection,,connections,mysql.connection.connections,Connection,连接次数,int,,,连接次数是连接MySQL服务器的尝试次数（无论成功与否）。,Connections is the number of connection attempts (successful or not) to the MySQL server.,,,,\n' +
  'mysql,connection,,max_used_connections,mysql.connection.max_used_connections,Max Used Connection,最大使用连接数,int,,,最大使用连接数是自服务器启动以来同时使用的最大连接数。,Max Used Connections is the maximum number of connections that have been in use simultaneously since the server started.,,,,\n' +
  'mysql,connection,,aborted_clients,mysql.connection.aborted_clients,Aborted Clients (timeout),中止的客户端(超时),,,,,,,,,\n' +
  'mysql,connection,,aborted_connects,mysql.connection.aborted_connects,Aborted Connects (attempts),中止的连接(尝试),,,,,,,,,\n' +
  'mysql,table_cache,,table_open_cache_miss_ratio,mysql.table_cache.table_open_cache_miss_ratio,Table Open Cache Miss Ratio,表高速缓存未命中率,,%,,,,,5,,\n' +
  'mysql,basic,,table_open_cache,mysql.basic.table_open_cache,Table Open Cache Size,表高速缓存上限,int,个,,*表高速缓存上限* 表示服务器在任何一个表缓存实例中可以保持打开的最大表数。,Table Open Cache Size indicates the maximum number of tables the server can keep open in any one table cache instance.,,5,https://sqlconjuror.com/mariadb-mysql-table-open-cache-table-definition-cache/,\n' +
  'mysql,table_cache,,table_definition_cache_size,mysql.table_cache.table_definition_cache_size,Table Definition Cache Size,表定义缓存数,int,个 ,,*表定义缓存数* 显示可存储的表定义（SHOW CREATE Table \\G）的数量。这是为了加快表的打开速度，并且每个表只有一个条目。如果DB实例中有大量表（>400），则应考虑增加此参数。\\n\\n介于400和2000之间的值适用于table_definition_cache。请注意，更大的表定义缓存也意味着数据库使用更多的RAM。,Table Definition Cache Size shows the number of table definitions (SHOW CREATE TABLE \\G) that can be stored. This is to speed up opening of tables and only one entry per table. You should consider increasing this parameter if you have large number of tables (>400) in your DB instance.\\n\\nValues between 400 and 2000 are good for table_definition_cache. Do take note that a bigger table definition cache also means that your database uses more RAM.,,5,https://sqlconjuror.com/mariadb-mysql-table-open-cache-table-definition-cache/,\n' +
  'mysql,thread,,threads_connected,mysql.thread.threads_connected,Threads Connected,连接线程数,int,,,*连接线程数* 是打开的连接数。,Threads Connected is the number of open connections.,,,,\n' +
  'mysql,thread,,threads_running,mysql.thread.threads_running,Threads Running,运行线程数,int,,,*运行线程数* 是未休眠的线程数。,Threads Running is the number of threads not sleeping.,,,,\n' +
  'mysql,thread,,threads_created,mysql.thread.threads_created,Threads Created,创建线程数,int,,,*创建线程数* 是为处理连接而创建的线程数。,*Threads_created*: The number of threads created to handle connections.,,,,\n' +
  'mysql,thread,,threads_cached,mysql.thread.threads_cached,Threads Cached,已缓存线程数,int,,,*已缓存线程数* 是线程缓存中的线程数。,*Threads_cached*: The number of threads in the thread cache.,,,,\n' +
  'mysql,basic,,thread_cache_size,mysql.basic.thread_cache_size,Thread Cache Size,线程缓存上限,int,,,*线程缓存上限* 变量设置服务器应缓存多少线程以供重用。当客户端断开连接时，如果缓存未满，则将客户端的线程放入缓存中。它在MySQL 5.6.8及以上版本中自动调整大小（上限为100）。如果可能，通过重用从缓存中获取的线程来满足线程请求，并且只有当缓存为空时才创建新线程。,"The thread_cache_size variable sets how many threads the server should cache to reuse. When a client disconnects, the client\'s threads are put in the cache if the cache is not full. It is autosized in MySQL 5.6.8 and above (capped to 100). Requests for threads are satisfied by reusing threads taken from the cache if possible, and only when the cache is empty is a new thread created.",,,,\n' +
  'mysql,command,,com_stmt_execute,mysql.command.com_stmt_execute,Command Statement Execute,命令执行数(无论成败),float,次/s,,,,,,,\n' +
  'mysql,command,,com_update,mysql.command.com_update,Command update,update成功执行数,float,次/s,,,,,,,\n' +
  'mysql,command,,com_begin,mysql.command.com_begin,Command begin,begin成功执行数,float,次/s,,,,,,,\n' +
  'mysql,command,,com_delete,mysql.command.com_delete,Command delete,delete成功执行数,float,次/s,,,,,,,\n' +
  'mysql,command,,com_insert,mysql.command.com_insert,Command insert,insert成功执行数,float,次/s,,,,,,,\n' +
  'mysql,command,,com_commit,mysql.command.com_commit,Command commit,commit成功执行数,float,次/s,,,,,,,\n' +
  'mysql,command,,com_select,mysql.command.com_select,Command select,select成功执行数,float,次/s,,,,,,,\n' +
  'mysql,command,,com_admin_commands,mysql.command.com_admin_commands,admin commands,admin命令成功执行数,float,次/s,,,,,,,\n' +
  'mysql,command,,com_show_status,mysql.command.com_show_status,Command show status,show status成功执行数,float,次/s,,,,,,,\n' +
  'mysql,command,,com_show_slave_status,mysql.command.com_show_slave_status,Command show slave status,show slave status成功执行数,float,次/s,,,,,,,\n' +
  'mysql,command,,com_set_option,mysql.command.com_set_option,Command set option,set option成功执行数,float,次/s,,,,,,,\n' +
  'mysql,process_state,,state,mysql.process_state.state,state name,线程状态名称,,,,,"**Process States**\\n\\nAn action, event, or state that indicates what the thread is doing.\\n\\nMost states correspond to very quick operations. If a thread stays in a given state for many seconds, there might be a problem that needs to be investigated.\n' +
  '\n' +
  '*Process idle*: The size of threads whose corresponding session is idle.\n' +
  '*Process updating*: The thread is searching for rows to update and is updating them.\n' +
  '*Process executing*: The thread has begun executing a statement.\n' +
  '*Process sending data*: The thread is reading and processing rows for a SELECT statement, and sending data to the client. Because operations occurring during this state tend to perform large amounts of disk access (reads), it is often the longest-running state over the lifetime of a given query.\n' +
  '*Process opening tables*: The thread is trying to open a table. This is should be very fast procedure, unless something prevents opening. For example, an ALTER TABLE or a LOCK TABLE statement can prevent opening a table until the statement is finished. It is also worth checking that your table_open_cache value is large enough.\n' +
  '*Process closing tables*: The thread is flushing the changed table data to disk and closing the used tables. This should be a fast operation. If not, verify that you do not have a full disk and that the disk is not in very heavy use.\n' +
  '*Process waiting for lock*: The server is waiting to acquire a THR_LOCK lock or a lock from the metadata locking subsystem, where lock_type indicates the type of lock.\n' +
  '\n' +
  'This state indicates a wait for a THR_LOCK:\n' +
  '\n' +
  'Waiting for table level lock\n' +
  '\n' +
  'These states indicate a wait for a metadata lock:\n' +
  '\n' +
  'Waiting for event metadata lock\n' +
  '\n' +
  'Waiting for global read lock\n' +
  '\n' +
  'Waiting for schema metadata lock\n' +
  '\n' +
  'Waiting for stored function metadata lock\n' +
  '\n' +
  'Waiting for stored procedure metadata lock\n' +
  '\n' +
  'Waiting for table metadata lock\n' +
  '\n' +
  'Waiting for trigger metadata lock\n' +
  '*Process freeing items*: The thread has executed a command. Some freeing of items done during this state involves the query cache. This state is usually followed by cleaning up.\n' +
  '*Process end*: This occurs at the end but before the cleanup of ALTER TABLE, CREATE VIEW, DELETE, INSERT, SELECT, or UPDATE statements.\n' +
  '\n' +
  'For the end state, the following operations could be happening:\n' +
  '\n' +
  'Removing query cache entries after data in a table is changed\n' +
  '\n' +
  'Writing an event to the binary log\n' +
  '\n' +
  'Freeing memory buffers, including for blobs\n' +
  '*Process checking permissions*: The thread is checking whether the server has the required privileges to execute the statement.\n' +
  '*Process statistics*: The server is calculating statistics to develop a query execution plan. If a thread is in this state for a long time, the server is probably disk-bound performing other work.\n' +
  '*Process login*: The initial state for a connection thread until the client has been authenticated successfully.\n' +
  '*Process preparing*: This state occurs during query optimization.\n' +
  '*Process init*: This occurs before the initialization of ALTER TABLE, DELETE, INSERT, SELECT, or UPDATE statements. Actions taken by the server in this state include flushing the binary log, the InnoDB log, and some query cache cleanup operations.\n' +
  '*Process cleaning up*: The thread has processed one command and is preparing to free memory and reset certain state variables.",,,"https://dev.mysql.com/doc/refman/5.7/en/show-processlist.html\n' +
  '\n' +
  'https://dev.mysql.com/doc/refman/5.7/en/general-thread-states.html",\n' +
  'mysql,process_state,,num,mysql.process_state.num,state number,线程状态数量,,,,**进程状态** \\n\\n表示线程正在执行的操作、事件或状态。\\n\\n大多数状态对应于非常快的操作。如果线程在给定状态下停留了很多秒，则可能存在需要调查的问题。,"**Process States**\\n\\nAn action, event, or state that indicates what the thread is doing.\\n\\nMost states correspond to very quick operations. If a thread stays in a given state for many seconds, there might be a problem that needs to be investigated.\n' +
  '\n' +
  '*Process idle*: The size of threads whose corresponding session is idle.\n' +
  '*Process updating*: The thread is searching for rows to update and is updating them.\n' +
  '*Process executing*: The thread has begun executing a statement.\n' +
  '*Process sending data*: The thread is reading and processing rows for a SELECT statement, and sending data to the client. Because operations occurring during this state tend to perform large amounts of disk access (reads), it is often the longest-running state over the lifetime of a given query.\n' +
  '*Process opening tables*: The thread is trying to open a table. This is should be very fast procedure, unless something prevents opening. For example, an ALTER TABLE or a LOCK TABLE statement can prevent opening a table until the statement is finished. It is also worth checking that your table_open_cache value is large enough.\n' +
  '*Process closing tables*: The thread is flushing the changed table data to disk and closing the used tables. This should be a fast operation. If not, verify that you do not have a full disk and that the disk is not in very heavy use.\n' +
  '*Process waiting for lock*: The server is waiting to acquire a THR_LOCK lock or a lock from the metadata locking subsystem, where lock_type indicates the type of lock.\n' +
  '\n' +
  'This state indicates a wait for a THR_LOCK:\n' +
  '\n' +
  'Waiting for table level lock\n' +
  '\n' +
  'These states indicate a wait for a metadata lock:\n' +
  '\n' +
  'Waiting for event metadata lock\n' +
  '\n' +
  'Waiting for global read lock\n' +
  '\n' +
  'Waiting for schema metadata lock\n' +
  '\n' +
  'Waiting for stored function metadata lock\n' +
  '\n' +
  'Waiting for stored procedure metadata lock\n' +
  '\n' +
  'Waiting for table metadata lock\n' +
  '\n' +
  'Waiting for trigger metadata lock\n' +
  '*Process freeing items*: The thread has executed a command. Some freeing of items done during this state involves the query cache. This state is usually followed by cleaning up.\n' +
  '*Process end*: This occurs at the end but before the cleanup of ALTER TABLE, CREATE VIEW, DELETE, INSERT, SELECT, or UPDATE statements.\n' +
  '\n' +
  'For the end state, the following operations could be happening:\n' +
  '\n' +
  'Removing query cache entries after data in a table is changed\n' +
  '\n' +
  'Writing an event to the binary log\n' +
  '\n' +
  'Freeing memory buffers, including for blobs\n' +
  '*Process checking permissions*: The thread is checking whether the server has the required privileges to execute the statement.\n' +
  '*Process statistics*: The server is calculating statistics to develop a query execution plan. If a thread is in this state for a long time, the server is probably disk-bound performing other work.\n' +
  '*Process login*: The initial state for a connection thread until the client has been authenticated successfully.\n' +
  '*Process preparing*: This state occurs during query optimization.\n' +
  '*Process init*: This occurs before the initialization of ALTER TABLE, DELETE, INSERT, SELECT, or UPDATE statements. Actions taken by the server in this state include flushing the binary log, the InnoDB log, and some query cache cleanup operations.\n' +
  '*Process cleaning up*: The thread has processed one command and is preparing to free memory and reset certain state variables.",,,"https://dev.mysql.com/doc/refman/5.7/en/show-processlist.html\n' +
  '\n' +
  'https://dev.mysql.com/doc/refman/5.7/en/general-thread-states.html",\n' +
  'mysql,net,,net_outbound,mysql.net.net_outbound,Network outbound,网络出速率,float,B/s,,,,,,,\n' +
  'mysql,net,,net_inbound,mysql.net.net_inbound,Network inbound,网络入速率,float,B/s,,,,,,,\n' +
  'mysql,tmp,,created_tmp_tables,mysql.tmp.created_tmp_tables,Created Tmp Tables,临时表创建频率,float,次/s,,*临时表创建频率* 是在执行语句时创建的内部临时表频率。,Created Tmp Tables is the number of internal temporary tables created by the server while executing statements.,,,,\n' +
  'mysql,tmp,,created_tmp_disk_tables,mysql.tmp.created_tmp_disk_tables,Created Tmp Disk Tables,磁盘临时表创建频率,float,次/s,,*磁盘临时表创建频率* 是在执行语句时创建的内部磁盘临时表频率。,Created Tmp Disk Tables is the number of internal on-disk temporary tables created by the server while executing statements.,,,,\n' +
  'mysql,tmp,,created_tmp_files,mysql.tmp.created_tmp_files,Created Tmp Files,临时文件创建频率,float,次/s,,*临时文件创建频率* 是mysqld创建的临时文件频率。,Created Tmp Files is the number of temporary files mysqld has created.,,,,\n' +
  'mysql,select_type,,select_full_join,mysql.select_type.select_full_join,Select Full Join,Select Full Join,float,次/s,,***Select Full Join*** 是索引中未连接的连接数，这通常会对性能产生巨大影响。,"***Select Full Join*** is the number of joins that are not joined on an index, this is usually a huge performance hit.",,,,\n' +
  'mysql,select_type,,select_full_range_join,mysql.select_type.select_full_range_join,Select Full Range Join,Select Full Range Join,float,次/s,,,,,,,\n' +
  'mysql,select_type,,select_range,mysql.select_type.select_range,Select Range,Select Range,float,次/s,,***Select Range*** 是使用范围扫描的查询数，这意味着MySQL扫描了给定范围内的所有行。,"***Select Range*** is how many queries used a range scan, which means MySQL scanned all rows in a given range.",,,,\n' +
  'mysql,select_type,,select_range_check,mysql.select_type.select_range_check,Select Range Check,Select Range Check,float,次/s,,,,,,,\n' +
  'mysql,select_type,,select_scan,mysql.select_type.select_scan,Select Scan,Select Scan,float,次/s,,***Select Scan*** 是导致完整表扫描的查询数，其中必须读取表中的所有数据并丢弃或返回。,"***Select Scan*** is how many queries caused full table scans, in which all the data in the table had to be read and either discarded or returned.",,,,\n' +
  'mysql,sort,,sort_rows,mysql.sort.sort_rows,Sort Rows,Sort Rows,float,次/s,,,,,,,\n' +
  'mysql,sort,,sort_range,mysql.sort.sort_range,Sort Range,Sort Range,float,次/s,,,,,,,\n' +
  'mysql,sort,,sort_merge_passes,mysql.sort.sort_merge_passes,Sort Merge Passes,Sort Merge Passes,float,次/s,,,,,,,\n' +
  'mysql,sort,,sort_scan,mysql.sort.sort_scan,Sort Scan,Sort Scan,float,次/s,,,,,,,\n' +
  'mysql,table_lock,,table_locks_immediate,mysql.table_lock.table_locks_immediate,Table Locks Immediate,表锁Immediate,float,次/s,,,,,,,\n' +
  'mysql,table_lock,,table_locks_waited,mysql.table_lock.table_locks_waited,Table Locks Waited,表锁Waited,float,次/s,,,,,,,\n' +
  'mysql,query_cache,,free_memory,mysql.query_cache.free_memory,Free Memory,可用查询缓存,int,KB,,,,,,,8.0开始已不存在。\n' +
  'mysql,query_cache,,query_cache_size,mysql.query_cache.query_cache_size,Query Cache Size,查询缓存大小,int,B,,,,,,,8.0开始已不存在。\n' +
  'mysql,query_cache,,hits,mysql.query_cache.hits,Hits,Hits,float,,,,,,,,8.0开始已不存在。\n' +
  'mysql,query_cache,,inserts,mysql.query_cache.inserts,Inserts,Inserts,float,,,,,,,,8.0开始已不存在。\n' +
  'mysql,query_cache,,not_cached,mysql.query_cache.not_cached,Not Cached,Not Cached,float,,,,,,,,8.0开始已不存在。\n' +
  'mysql,query_cache,,prunes,mysql.query_cache.prunes,Prunes,Prunes,float,,,,,,,,8.0开始已不存在。\n' +
  'mysql,query_cache,,queries_in_cache,mysql.query_cache.queries_in_cache,Queries in Cache,缓存中的查询数,float,,,,,,,,8.0开始已不存在。\n' +
  'postgresql,status,,uptime,postgresql.status.uptime,Uptime,运行时长,string,,,,,,,,\n' +
  'postgresql,basic,,version,postgresql.basic.version,Version,版本号,string,,,,,,,,\n' +
  'postgresql,resource_config,,shared_buffers,postgresql.resource_config.shared_buffers,Shared Buffers,共享内存缓存,int,B,,*共享内存缓存* 是定义数据库服务器用于共享内存缓冲区的内存量。默认值为128MB。建议调整为RAM的25%，但通常不超过40%。,"Defines the amount of memory the database server uses for shared memory buffers.  Default is 128MB.  Guidance on tuning is 25% of RAM, but generally doesn\'t exceed 40%.",,,https://www.postgresql.org/docs/current/static/runtime-config-resource.html#GUC-SHARED-BUFFERS,\n' +
  'postgresql,resource_config,,work_mem,postgresql.resource_config.work_mem,Memory Size for each Sort,排序内存,int,B,,*work_mem* 定义写入临时磁盘文件之前分配给内部排序操作和哈希表的内存量。默认值为4MB。,The parameter work_mem defines the amount of memory assigned for internal sort operations and hash tables before writing to temporary disk files.  The default is 4MB.,,,https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-WORK-MEM,\n' +
  'postgresql,resource_config,,autovacuum,postgresql.resource_config.autovacuum,Autovacuum,自动清理状态,bool,,,*自动清理状态* 定义是否启用自动清理。通常，解决方案是更频繁地清理，而不是更少地清理。,"Whether autovacuum process is enabled or not.  Generally the solution is to vacuum more often, not less.",,,https://www.postgresql.org/docs/current/routine-vacuuming.html#AUTOVACUUM,\n' +
  'postgresql,resource_config,,max_connections,postgresql.resource_config.max_connections,Max Connections,最大连接数,int,,,*最大连接数* 是允许的最大客户端连接数。请小心更改此值，因为有一些内存资源是按每个客户端分配的，因此将max_connections设置得更高通常会增加PostgreSQL的总体内存使用量。,"The maximum number of client connections allowed.  Change this value with care as there are some memory resources that are allocated on a per-client basis, so setting max_connections higher will generally increase overall PostgreSQL memory usage.",,,https://www.postgresql.org/docs/current/runtime-config-connection.html#GUC-MAX-CONNECTIONS,\n' +
  'postgresql,resource_config,,effective_cache_size,postgresql.resource_config.effective_cache_size,Disk Cache Size,磁盘缓存大小,int,B,,*磁盘缓存大小* effective_cache_size变量可调整磁盘缓存所需的RAM数量。通常，添加Linux free+cached 是个好主意。查询计划器使用该值来确定计划是否适合内存，如果定义得太低，可能会导致某些计划拒绝某些索引。,"PostgreSQL\'s effective_cache_size variable tunes how much RAM you expect to be available for disk caching.  Generally adding Linux free+cached will give you a good idea.  This value is used by the query planner whether plans will fit in memory, and when defined too low, can lead to some plans rejecting certain indexes.",,,https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-EFFECTIVE-CACHE-SIZE,\n' +
  'postgresql,resource_config,,wal_buffers,postgresql.resource_config.wal_buffers,Disk-Page Buffers,磁盘分页缓存大小,int,B,,*磁盘分页缓存大小* wal_buffers定义了用于缓存预写日志项的内存量。通常，该值很小（shared_buffers值的3%），但可能需要针对负载过重的服务器进行修改。,"The setting wal_buffers defines how much memory is used for caching the write-ahead log entries. Generally this value is small (3% of shared_buffers value), but it may need to be modified for heavily loaded servers.",,,"https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-WAL-BUFFERS\n' +
  '\n' +
  'https://www.postgresql.org/docs/current/runtime-config-resource.html#GUC-SHARED-BUFFERS",\n' +
  'postgresql,connection,,active,postgresql.connection.active,Active connections,活动连接数,int,,,,,,,https://www.postgresql.org/docs/current/runtime-config-connection.html#GUC-MAX-CONNECTIONS,\n' +
  'postgresql,connection_state,,state,postgresql.connection_state.state,Connection State,连接状态,string,,,"包括 idle、active、idle in transaction、idle in transaction (aborted)、\n' +
  'fastpath function call、disabled。",,,,,\n' +
  'postgresql,connection_state,,num,postgresql.connection_state.num,Connection Number,连接数量,int,,,,,,,,\n' +
  'postgresql,connection_db,,db_name,postgresql.connection_db.db_name,DB name,库名称,string,,,,,,,,\n' +
  'postgresql,connection_db,,active,postgresql.connection_db.active,Active connections,库活动连接数,int,,,,,,,,\n' +
  'postgresql,tuple,,fetched,postgresql.tuple.fetched,Fetched,Fetched频率,,,,,,,,,\n' +
  'postgresql,tuple,,returned,postgresql.tuple.returned,Returned,Returned频率,,,,,,,,,\n' +
  'postgresql,tuple,,inserted,postgresql.tuple.inserted,Inserted,Inserted频率,,,,,,,,,\n' +
  'postgresql,tuple,,updated,postgresql.tuple.updated,Updated,Updated频率,,,,,,,,,\n' +
  'postgresql,tuple,,deleted,postgresql.tuple.deleted,Deleted,Deleted频率,,,,,,,,,\n' +
  'postgresql,tuple,,rows_returned_by_queries,postgresql.tuple.rows_returned_by_queries,Rows returned by queries,查询返回行频率,float,次/s,,,,,,,\n' +
  'postgresql,tuple,,rows_fetched_by_queries,postgresql.tuple.rows_fetched_by_queries,Rows fetched by queries,查询获取行频率,float,次/s,,,,,,,\n' +
  'postgresql,tuple,,rows_inserted_by_queries,postgresql.tuple.rows_inserted_by_queries,Rows inserted by queries,查询新增行频率,float,次/s,,,,,,,相关于 pg_stat_database_tup\n' +
  'postgresql,tuple,,rows_updated_by_queries,postgresql.tuple.rows_updated_by_queries,Rows updated by queries,查询更新行频率,float,次/s,,,,,,,相关于 pg_stat_database_tup\n' +
  'postgresql,tuple,,rows_deleted_by_queries,postgresql.tuple.rows_deleted_by_queries,Rows deleted by queries,查询删除行频率,float,次/s,,,,,,,相关于 pg_stat_database_tup\n' +
  'postgresql,transaction,,commits,postgresql.transaction.commits,Transactions Commits,事务提交次数,float,次,select sum(xact_commit) from pg_stat_database;,,,,,https://www.postgresql.org/docs/current/tutorial-transactions.html,相关于 pg_stat_database_xact_commit\n' +
  'postgresql,transaction,,rollbacks,postgresql.transaction.rollbacks,Transactions Rollbacks,事务回滚次数,float,次,select sum(xact_rollback) from pg_stat_database;,,,,,https://www.postgresql.org/docs/current/tutorial-transactions.html,相关于 pg_stat_database_xact_commit\n' +
  'postgresql,transaction_state,,state,postgresql.transaction_state.state,Transactions State,事务状态,,,,"事务状态包括idle in transaction、idle in transaction (aborted)、\n' +
  'idle、fastpath function call、disabled、active。",,,,https://www.postgresql.org/docs/current/tutorial-transactions.html,相关于 pg_stat_activity_max_tx_duration\n' +
  'postgresql,transaction_state,,duration,postgresql.transaction_state.duration,Transactions Duration,事务耗时,,s,,,,,,https://www.postgresql.org/docs/current/tutorial-transactions.html,相关于 pg_stat_activity_max_tx_duration\n' +
  'postgresql,temp_file,,db_name,postgresql.temp_file.db_name,Temp Files DB Name,临时文件所属库名称,string,,,,,,,,\n' +
  'postgresql,temp_file,,num,postgresql.temp_file.num,Temp Files Number,临时文件累计创建数,float,,,,"Cumulative number of temporary files created by queries in this database since service start. All temporary files are counted, regardless of why the temporary file was created (e.g., sorting or hashing), and regardless of the log_temp_files setting.",,,,\n' +
  'postgresql,temp_file,,size,postgresql.temp_file.size,Temp Files Size,临时文件累计写入大小,float,B,,,"Cumulative amount of data written to temporary files by queries in this database since service start. All temporary files are counted, regardless of why the temporary file was created, and regardless of the log_temp_files setting.",,,,\n' +
  'postgresql,temp_file,,activity,postgresql.temp_file.activity,Temp Files Activity,临时文件创建频率,float,次/s,,,"Number of temporary files created by queries in this database. All temporary files are counted, regardless of why the temporary file was created (e.g., sorting or hashing), and regardless of the log_temp_files setting.",,,,\n' +
  'postgresql,temp_file,,util,postgresql.temp_file.util,Temp Files Utilization,临时文件写入速率,float,B/s,,,"Total amount of data written to temporary files by queries in this database. All temporary files are counted, regardless of why the temporary file was created, and regardless of the log_temp_files setting.",,,,\n' +
  'postgresql,lock,,deadlocks,postgresql.lock.deadlocks,Deadlocks,死锁次数,int,次,,,,,,,\n' +
  'postgresql,lock,,conflicts,postgresql.lock.conflicts,Conflicts,冲突次数,int,次,,,,,,,\n' +
  'postgresql,lock,,db_name,postgresql.lock.db_name,Locks DB Name,锁所属库名称,,,,,,,,,\n' +
  'postgresql,lock_num,,mode,postgresql.lock_num.mode,Locks Mode,锁模式,,,,"锁模式包括accesssharelock、sireadlock、shareupdateexclusivelock、sharerowexclusivelock、sharelock 、rowsharelock、rowexclusivelock、exclusivelock、\n' +
  'accessexclusivelock。",,,,,\n' +
  'postgresql,lock_num,,num,postgresql.lock_num.num,Locks Number,锁数量,int,,,,,,,,\n' +
  'postgresql,operation,,db_name,postgresql.operation.db_name,Blocks Operations DB Name,Blocks操作所属库名称,,,,,,,,,\n' +
  'postgresql,operation,,read,postgresql.operation.read,Operations Read,Blocks操作读频率,float,,,,,,,,\n' +
  'postgresql,operation,,write,postgresql.operation.write,Operations Write,Blocks操作写频率,float,,,,,,,,\n' +
  'postgresql,buffer,,allocated,postgresql.buffer.allocated,Allocated,缓冲区Allocated频率,int,,,,,,,,\n' +
  'postgresql,buffer,,fsync_calls_by_backend,postgresql.buffer.fsync_calls_by_backend,Fsync calls by a backend,缓冲区Fsync calls by a backend频率,int,,,,,,,,\n' +
  'postgresql,buffer,,written_directly_by_backend,postgresql.buffer.written_directly_by_backend,Written directly by a backend,缓冲区Written directly by a backend频率,int,,,,,,,,\n' +
  'postgresql,buffer,,written_by_background_writer,postgresql.buffer.written_by_background_writer,Written by the background writer,缓冲区Written by the background writer频率,int,,,,,,,,\n' +
  'postgresql,buffer,,written_during_checkpoints,postgresql.buffer.written_during_checkpoints,Written during checkpoints,缓冲区Written during checkpoints频率,int,,,,,,,,\n' +
  'postgresql,conflicts,,db_name,postgresql.conflicts.db_name,DB Name,库名称,string,,,,,,,,\n' +
  'postgresql,conflicts,,bufferpin,postgresql.conflicts.bufferpin,Pinned buffers,因固定缓冲区取消查询数,float,,,此库中由于固定缓冲区而取消的查询数。,Number of queries in this database that have been canceled due to pinned buffers.,,,,相关于 pg_stat_database_conflicts_confl_bufferpin\n' +
  'postgresql,conflicts,,deadlock,postgresql.conflicts.deadlock,Deadlocks,因死锁取消查询数,float,,,此库中由于死锁而取消的查询数。,Number of queries in this database that have been canceled due to deadlocks.,,,,相关于 pg_stat_database_conflicts_confl_bufferpin\n' +
  'postgresql,conflicts,,lock,postgresql.conflicts.lock,Lock timeouts,因锁超时取消查询数,float,,,此库中由于锁超时而取消的查询数。,Number of queries in this database that have been canceled due to lock timeouts.,,,,相关于 pg_stat_database_conflicts_confl_bufferpin\n' +
  'postgresql,conflicts,,snapshot,postgresql.conflicts.snapshot,Old snapshots,因旧快照取消查询数,float,,,此库中由于旧快照而取消的查询数。,Number of queries in this database that have been canceled due to old snapshots.,,,,相关于 pg_stat_database_conflicts_confl_bufferpin\n' +
  'postgresql,conflicts,,tablespace,postgresql.conflicts.tablespace,Dropped tablespaces,因删除表空间取消查询数,float,,,此库中由于删除掉的表空间而取消的查询数。,Number of queries in this database that have been canceled due to dropped tablespaces.,,,,相关于 pg_stat_database_conflicts_confl_bufferpin\n' +
  'postgresql,cache_hit_ratio,,db_name,postgresql.cache_hit_ratio.db_name,Cache Hit Ratio DB Name,缓存命中率所属库名称,string,,,,,,,,\n' +
  'postgresql,cache_hit_ratio,,ratio,postgresql.cache_hit_ratio.ratio,Cache Hit Ratio,缓存命中率,,,,,,,,,\n' +
  'postgresql,checkpoint,,checkpoint_sync_time,postgresql.checkpoint.checkpoint_sync_time,Files Synchronization to disk,文件同步到磁盘时间,,ms,,,,,,,相关于 pg_stat_bgwriter_checkpoint_sync_time\n' +
  'postgresql,checkpoint,,checkpoint_write_time,postgresql.checkpoint.checkpoint_write_time,Written Files to disk,文件写到磁盘时间,,ms,,,,,,,相关于 pg_stat_bgwriter_checkpoint_write_time\n' +
  'postgresql,slow_sql,,sql_text,postgresql.slow_sql.sql_text,SQL Text,慢SQL,string,,,需要提前配置并启用 pg_stat_statements。,,,,https://virtual-dba.com/blog/postgresql-performance-identifying-hot-and-slow-queries/,相关于 pg_stat_statements\n' +
  'postgresql,slow_sql,,calls,postgresql.slow_sql.calls,Calls,执行次数,int,,,,,,,,相关于 pg_stat_statements\n' +
  'postgresql,slow_sql,,total_time,postgresql.slow_sql.total_time,Total time,总耗时,float,ms,,,,,,,相关于 pg_stat_statements\n' +
  'postgresql,slow_sql,,avg_time,postgresql.slow_sql.avg_time,Average time,平均耗时,float,ms,,,,,,,相关于 pg_stat_statements\n' +
  'postgresql,slow_sql,,rows,postgresql.slow_sql.rows,Rows,受影响行数,int,,,,,,,,相关于 pg_stat_statements\n' +
  'oracle,status,,uptime,oracle.status.uptime,Uptime,运行时长,int,s,,,,,,,\n' +
  'oracle,basic,,startup_time,oracle.basic.startup_time,startTime,启动时间,string,,,,,,,,\n' +
  'oracle,basic,,version,oracle.basic.version,Version,版本号,string,,,,,,,,\n' +
  'oracle,total_sessions,,num,oracle.total_sessions.num,Total Sessions,会话总数,int,,,,,,,,\n' +
  'oracle,active_sessions,,num,oracle.active_sessions.num,Active Sessions,活动会话数,int,,,,,,,,\n' +
  'oracle,background_sessions,,num,oracle.background_sessions.num,Background Sessions,后台会话数,int,,,,,,,,\n' +
  'oracle,process,,process_count,oracle.process.process_count,Process count,进程数,int,,,,,,,,\n' +
  'oracle,execute,,executes,oracle.execute.executes,Executes,执行频率,float,次/s,,,,,,,\n' +
  'oracle,transaction,,commits,oracle.transaction.commits,Transactions Commits,事务提交频率,float,次/s,,,,,,,\n' +
  'oracle,transaction,,rollbacks,oracle.transaction.rollbacks,Transactions Rollbacks,事务回滚频率,float,次/s,,,,,,,\n' +
  'oracle,tablespace,,name,oracle.tablespace.name,Tablespace name,表空间名称,string,,,,,,,,\n' +
  'oracle,tablespace,,type,oracle.tablespace.type,Tablespace type,表空间类型,string,,,,,,,,\n' +
  'oracle,tablespace,,usage,oracle.tablespace.usage,Tablespace usage,表空间使用率,float,,,,,,,,\n' +
  'oracle,tablespace,,free,oracle.tablespace.free,Tablespace free space,表空间剩余空间,int,B,,,,,,,\n' +
  'oracle,wait,,concurrent_wait_time,oracle.wait.concurrent_wait_time,Concurrent wait time,并发等待时间,float,ms,,,,,,,\n' +
  'oracle,wait,,commit_wait_time,oracle.wait.commit_wait_time,Commit wait time,提交等待时间,float,ms,,,,,,,\n' +
  'oracle,wait,,app_wait_time,oracle.wait.app_wait_time,Application wait time,应用等待时间,float,ms,,,,,,,\n' +
  'oracle,wait,,network_wait_time,oracle.wait.network_wait_time,Network wait time,网络等待事件,float,ms,,,,,,,\n' +
  'oracle,wait,,system_io_wait_time,oracle.wait.system_io_wait_time,System IO wait time,系统IO等待时间,float,ms,,,,,,,\n' +
  'oracle,wait,,user_io_wait_time,oracle.wait.user_io_wait_time,User IO wait time,用户IO等待时间,float,ms,,,,,,,\n' +
  'oracle,wait,,configure_wait_time,oracle.wait.configure_wait_time,Configure wait time,组态等待时间,float,ms,,,,,,,\n' +
  'oracle,wait,,scheduler_wait_time,oracle.wait.scheduler_wait_time,Scheduler wait time,Scheduler等待时间,float,ms,,,,,,,\n' +
  'oracle,res_util,,res_util_type,oracle.res_util.res_util_type,Resource utilization type,资源利用率类型,string,,,包括 branched、cmtcallbk、dml_locks、enqueue_locks等。,,,,,\n' +
  'oracle,res_util,,res_util,oracle.res_util.res_util,Resource utilization,资源利用率,int,,,,,,,,\n' +
  'oracle,perf_collector,,total_collection,oracle.perf_collector.total_collection,Total collection,收集总数,int,,,,,,,,\n' +
  'oracle,perf_collector,,final_collection_time,oracle.perf_collector.final_collection_time,Final collection time,最后收集时间,float,s,,,,,,,\n' +
  'oracle,performance,,qps,oracle.performance.qps,QPS,IO请求频率,float,,,每秒IO请求数量。,I/O Requests per Second.,,,,\n' +
  'oracle,performance,,tps,oracle.performance.tps,TPS,用户事务频率,float,,,每秒用户事物处理数量。,User Transaction Per Sec.,,,,\n' +
  'oracle,performance,,mbps,oracle.performance.mbps,MBPS,IO速率(兆字节),float,,,每秒 I/O 兆字节数量。,I/O Megabytes per Second.,,,,\n' +
  'oracle,performance,,sql_resp_time,oracle.performance.sql_resp_time,SQL response time,SQL响应速率,float,,,,,,,,\n' +
  'oracle,cpu_stats,,type,oracle.cpu_stats.type,CPU stats type,CPU 统计类型,string,,,包括 CPU_session、CPU_user、CPU_background、CPU_TXN、CPU_time_consumed等。,,,,,\n' +
  'oracle,cpu_stats,,num,oracle.cpu_stats.num,CPU stats number,CPU 统计,int,,,,,,,,\n' +
  'oracle,mem_stats,,type,oracle.mem_stats.type,Memory stats type,内存统计类型,string,,,包括 PGA_memory、cache_used。,,,,,\n' +
  'oracle,mem_stats,,size,oracle.mem_stats.size,Memory stats size,内存统计,int,B,,,,,,,\n' +
  'oracle,cache_hit_ratio,,lib_cache_hit_ratio,oracle.cache_hit_ratio.lib_cache_hit_ratio,Library cache hit ratio,库缓存命中率,,,,,,,,,\n' +
  'oracle,cache_hit_ratio,,buffer_cache_hit_ratio,oracle.cache_hit_ratio.buffer_cache_hit_ratio,Buffer cache hit ratio,缓冲区缓存命中率,,,,,,,,,'

export default data
