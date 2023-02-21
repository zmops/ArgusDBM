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
  'mysql,performance,,questions,mysql.performance.questions,Questions,Questions,,,,,"**MySQL Questions**\\n\\nThe number of statements executed by the server. This includes only statements sent to the server by clients and not statements executed within stored programs, unlike the Queries used in the QPS calculation. \\n\\nThis variable does not count the following commands:\\n* ``COM_PING``\\n* ``COM_STATISTICS``\\n* ``COM_STMT_PREPARE``\\n* ``COM_STMT_CLOSE``\\n* ``COM_STMT_RESET``",,,,\n' +
  'mysql,performance,,slow_queries,mysql.performance.slow_queries,Slow Queries,慢查询,,,,,"**MySQL Slow Queries**\\n\\nSlow queries are defined as queries being slower than the long_query_time setting. For example, if you have long_query_time set to 3, all queries that take longer than 3 seconds to complete will show on this graph.",,,,\n' +
  'mysql,performance,,slow_sql,mysql.performance.slow_sql,Slow SQL,慢SQL,,,,,,,,"https://www.percona.com/blog/mysql-101-how-to-find-and-tune-a-slow-sql-query/\n' +
  '\n' +
  'https://pmmdemo.percona.com/graph/d/pmm-qan/pmm-query-analytics",\n' +
  'mysql,innodb,,innodb_buffer_pool_size,mysql.innodb.innodb_buffer_pool_size,InnoDB Buffer Pool Size,InnoDB缓存池大小,int,KB,,InnoDB 维护着名为缓存池的存储区域，用于在内存中缓存数据和索引。了解 InnoDB 缓存池的工作原理，并利用它将频繁访问的数据保存在内存中，是MySQL调优工作最重要的方面之一。调优的目标是将使用中的数据保存在内存中。在大多数情况下，它应该占专用数据库主机上可用内存的60%-90%之间，但这一比例取决于许多因素。,"InnoDB Buffer Pool Size\\n\\nInnoDB maintains a storage area called the buffer pool for caching data and indexes in memory. Knowing how the InnoDB buffer pool works, and taking advantage of it to keep frequently accessed data in memory, is one of the most important aspects of MySQL tuning. The goal is to keep the working set in memory. In most cases, this should be between 60%-90% of available memory on a dedicated database host, but depends on many factors.","          {\n' +
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
  'mysql,handler,,handler_read_next,mysql.handler.handler_read_next,Handler Read Next,句柄Read Next,float,次/s,,,`read_next` is incremented when the storage engine is asked to \'read the next index entry\'. A high value means a lot of index scans are being done.,,,,\n' +
  'mysql,handler,,handler_read_rnd_next,mysql.handler.handler_read_rnd_next,Handler Read Rnd Next,句柄Read Rnd Next,float,次/s,,,`read_rnd_next` is incremented when the server performs a full table scan and this is a counter you don\'t really want to see with a high value.,,,,\n' +
  'mysql,handler,,handler_write,mysql.handler.handler_write,Handler Write,句柄Write,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_external_lock,mysql.handler.handler_external_lock,Handler External Lock,句柄External Lock,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_read_key,mysql.handler.handler_read_key,Handler Read Key,句柄Read Key,float,次/s,,,`read_key` is incremented when a read is done with an index.,,,,\n' +
  'mysql,handler,,handler_update,mysql.handler.handler_update,Handler Update,句柄Update,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_delete,mysql.handler.handler_delete,Handler Delete,句柄Delete,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_read_first,mysql.handler.handler_read_first,Handler Read First,句柄Read First,float,次/s,,,,,,,\n' +
  'mysql,handler,,handler_read_rnd,mysql.handler.handler_read_rnd,Handler Read Rnd,句柄Read Rnd,float,次/s,,,,,,,\n' +
  'mysql,connection,,max_connections,mysql.connection.max_connections,Max Connection,最大连接数,int,,,最大连接数是同时允许的最大客户端连接数。默认情况下，该值为151。增加该值会增加mysqld所需的文件描述符的数量。如果所需数量的描述符不可用，服务器将降低“最大连接数”的值。\\n\\nmysqld实际上允许Max Connections+1个客户端进行连接。额外的连接保留给具有SUPER权限的帐户（如root）使用。,"Max Connections is the maximum permitted number of simultaneous client connections. By default, this is 151. Increasing this value increases the number of file descriptors that mysqld requires. If the required number of descriptors are not available, the server reduces the value of Max Connections.\\n\\nmysqld actually permits Max Connections + 1 clients to connect. The extra connection is reserved for use by accounts that have the SUPER privilege, such as root.",,,,\n' +
  'mysql,connection,,connections,mysql.connection.connections,Connection,连接次数,int,,,连接次数是连接MySQL服务器的尝试次数（无论成功与否）。,Connections is the number of connection attempts (successful or not) to the MySQL server.,,,,\n' +
  'mysql,connection,,max_used_connections,mysql.connection.max_used_connections,Max Used Connection,最大使用连接数,int,,,最大使用连接数是自服务器启动以来同时使用的最大连接数。,Max Used Connections is the maximum number of connections that have been in use simultaneously since the server started.,,,,\n' +
  'mysql,connection,,aborted_clients,mysql.connection.aborted_clients,Aborted Clients (timeout),中止的客户端(超时),,,,,,,,,\n' +
  'mysql,connection,,aborted_connects,mysql.connection.aborted_connects,Aborted Connects (attempts),中止的连接(尝试),,,,,,,,,\n' +
  'mysql,table_cache,,table_open_cache_miss_ratio,mysql.table_cache.table_open_cache_miss_ratio,Table Open Cache Miss Ratio,表高速缓存未命中率,,%,,,,,5,,\n' +
  'mysql,table_cache,,table_open_cache,mysql.table_cache.table_open_cache,Table Open Cache Size,表高速缓存上限,int,个,,,Table Open Cache Size indicates the maximum number of tables the server can keep open in any one table cache instance.,,5,https://sqlconjuror.com/mariadb-mysql-table-open-cache-table-definition-cache/,\n' +
  'mysql,table_cache,,table_definition_cache_size,mysql.table_cache.table_definition_cache_size,Table Definition Cache Size,表定义缓存数,int,个 ,,,Table Definition Cache Size shows the number of table definitions (SHOW CREATE TABLE \\G) that can be stored. This is to speed up opening of tables and only one entry per table. You should consider increasing this parameter if you have large number of tables (>400) in your DB instance.\\n\\nValues between 400 and 2000 are good for table_definition_cache. Do take note that a bigger table definition cache also means that your database uses more RAM.,,5,https://sqlconjuror.com/mariadb-mysql-table-open-cache-table-definition-cache/,\n' +
  'mysql,thread,,threads_connected,mysql.thread.threads_connected,Threads Connected,连接线程数,int,,,,Threads Connected is the number of open connections.,,,,\n' +
  'mysql,thread,,threads_running,mysql.thread.threads_running,Threads Running,运行线程数,int,,,,Threads Running is the number of threads not sleeping.,,,,\n' +
  'mysql,thread,,threads_created,mysql.thread.threads_created,Threads Created,创建线程数,int,,,,*Threads_created*: The number of threads created to handle connections.,,,,\n' +
  'mysql,thread,,threads_cached,mysql.thread.threads_cached,Threads Cached,已缓存线程数,int,,,,*Threads_cached*: The number of threads in the thread cache.,,,,\n' +
  'mysql,thread,,thread_cache_size,mysql.thread.thread_cache_size,Thread Cache Size,线程缓存上限,int,,,,"The thread_cache_size variable sets how many threads the server should cache to reuse. When a client disconnects, the client\'s threads are put in the cache if the cache is not full. It is autosized in MySQL 5.6.8 and above (capped to 100). Requests for threads are satisfied by reusing threads taken from the cache if possible, and only when the cache is empty is a new thread created.",,,,\n' +
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
  'mysql,process,,process_idle,mysql.process.process_idle,Process idle,空闲线程数,int,,,对应 session 为空闲状态的线程数量。即 SHOW PROCESSLIST 结果中 Command 为 idle 的线程。,*Process idle*: The size of threads whose corresponding session is idle.,,,https://dev.mysql.com/doc/refman/5.7/en/show-processlist.html,\n' +
  'mysql,process,,process_other,mysql.process.process_other,Process other,其它线程数,int,,,未单独罗列的其它类型的线程数。,,,,,\n' +
  'mysql,process,,process_updating,mysql.process.process_updating,Process updating,updating线程数,int,,,,*Process updating*: The thread is searching for rows to update and is updating them.,,,https://dev.mysql.com/doc/refman/5.7/en/general-thread-states.html,\n' +
  'mysql,process,,process_executing,mysql.process.process_executing,Process executing,executing线程数,int,,,,*Process executing*: The thread has begun executing a statement.,,,,\n' +
  'mysql,process,,process_sending_data,mysql.process.process_sending_data,Process sending data,sending data线程数,int,,,,"*Process sending data*: The thread is reading and processing rows for a SELECT statement, and sending data to the client. Because operations occurring during this state tend to perform large amounts of disk access (reads), it is often the longest-running state over the lifetime of a given query.",,,,\n' +
  'mysql,process,,process_opening_tables,mysql.process.process_opening_tables,Process opening tables,opening tables线程数,int,,,,"*Process opening tables*: The thread is trying to open a table. This is should be very fast procedure, unless something prevents opening. For example, an ALTER TABLE or a LOCK TABLE statement can prevent opening a table until the statement is finished. It is also worth checking that your table_open_cache value is large enough.",,,,\n' +
  'mysql,process,,process_closing_tables,mysql.process.process_closing_tables,Process closing tables,closing tables线程数,int,,,,"*Process closing tables*: The thread is flushing the changed table data to disk and closing the used tables. This should be a fast operation. If not, verify that you do not have a full disk and that the disk is not in very heavy use.",,,,\n' +
  'mysql,process,,process_waiting_for_lock,mysql.process.process_waiting_for_lock,Process waiting for lock,waiting for lock线程数,int,,,,"*Process waiting for lock*: The server is waiting to acquire a THR_LOCK lock or a lock from the metadata locking subsystem, where lock_type indicates the type of lock.\n' +
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
  'Waiting for trigger metadata lock",,,,\n' +
  'mysql,process,,process_freeing_items,mysql.process.process_freeing_items,Process freeing items,freeing items线程数,int,,,,*Process freeing items*: The thread has executed a command. Some freeing of items done during this state involves the query cache. This state is usually followed by cleaning up.,,,,\n' +
  'mysql,process,,process_end,mysql.process.process_end,Process end,end线程数,int,,,,"*Process end*: This occurs at the end but before the cleanup of ALTER TABLE, CREATE VIEW, DELETE, INSERT, SELECT, or UPDATE statements.\n' +
  '\n' +
  'For the end state, the following operations could be happening:\n' +
  '\n' +
  'Removing query cache entries after data in a table is changed\n' +
  '\n' +
  'Writing an event to the binary log\n' +
  '\n' +
  'Freeing memory buffers, including for blobs",,,,\n' +
  'mysql,process,,process_checking_permissions,mysql.process.process_checking_permissions,Process checking permissions,checking permissions线程数,int,,,,*Process checking permissions*: The thread is checking whether the server has the required privileges to execute the statement.,,,,\n' +
  'mysql,process,,process_statistics,mysql.process.process_statistics,Process statistics,statistics线程数,int,,,,"*Process statistics*: The server is calculating statistics to develop a query execution plan. If a thread is in this state for a long time, the server is probably disk-bound performing other work.",,,,\n' +
  'mysql,process,,process_login,mysql.process.process_login,Process login,login线程数,int,,,,*Process login*: The initial state for a connection thread until the client has been authenticated successfully.,,,,\n' +
  'mysql,process,,process_preparing,mysql.process.process_preparing,Process preparing,preparing线程数,int,,,,*Process preparing*: This state occurs during query optimization.,,,,\n' +
  'mysql,process,,process_init,mysql.process.process_init,Process init,init线程数,int,,,,"*Process init*: This occurs before the initialization of ALTER TABLE, DELETE, INSERT, SELECT, or UPDATE statements. Actions taken by the server in this state include flushing the binary log, the InnoDB log, and some query cache cleanup operations.",,,,\n' +
  'mysql,process,,process_cleaning_up,mysql.process.process_cleaning_up,Process cleaning up,cleaning up线程数,int,,,,*Process cleaning up*: The thread has processed one command and is preparing to free memory and reset certain state variables.,,,,\n' +
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
  'mysql,process_state,,num,mysql.process_state.num,state number,线程状态数量,,,,,"**Process States**\\n\\nAn action, event, or state that indicates what the thread is doing.\\n\\nMost states correspond to very quick operations. If a thread stays in a given state for many seconds, there might be a problem that needs to be investigated.\n' +
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
  'mysql,tmp,,created_tmp_tables,mysql.tmp.created_tmp_tables,Created Tmp Tables,临时表创建频率,float,次/s,,,Created Tmp Tables is the number of internal temporary tables created by the server while executing statements.,,,,\n' +
  'mysql,tmp,,created_tmp_disk_tables,mysql.tmp.created_tmp_disk_tables,Created Tmp Disk Tables,磁盘临时表创建频率,float,次/s,,,Created Tmp Disk Tables is the number of internal on-disk temporary tables created by the server while executing statements.,,,,\n' +
  'mysql,tmp,,created_tmp_files,mysql.tmp.created_tmp_files,Created Tmp Files,临时文件创建频率,float,次/s,,,Created Tmp Files is the number of temporary files mysqld has created.,,,,\n' +
  'mysql,select_type,,select_full_join,mysql.select_type.select_full_join,Select Full Join,Select Full Join,float,次/s,,,"***Select Full Join*** is the number of joins that are not joined on an index, this is usually a huge performance hit.",,,,\n' +
  'mysql,select_type,,select_full_range_join,mysql.select_type.select_full_range_join,Select Full Range Join,Select Full Range Join,float,次/s,,,,,,,\n' +
  'mysql,select_type,,select_range,mysql.select_type.select_range,Select Range,Select Range,float,次/s,,,"***Select Range*** is how many queries used a range scan, which means MySQL scanned all rows in a given range.",,,,\n' +
  'mysql,select_type,,select_range_check,mysql.select_type.select_range_check,Select Range Check,Select Range Check,float,次/s,,,,,,,\n' +
  'mysql,select_type,,select_scan,mysql.select_type.select_scan,Select Scan,Select Scan,float,次/s,,,"***Select Scan*** is how many queries caused full table scans, in which all the data in the table had to be read and either discarded or returned.",,,,\n' +
  'mysql,sort,,sort_rows,mysql.sort.sort_rows,Sort Rows,Sort Rows,float,次/s,,,,,,,\n' +
  'mysql,sort,,sort_range,mysql.sort.sort_range,Sort Range,Sort Range,float,次/s,,,,,,,\n' +
  'mysql,sort,,sort_merge_passes,mysql.sort.sort_merge_passes,Sort Merge Passes,Sort Merge Passes,float,次/s,,,,,,,\n' +
  'mysql,sort,,sort_scan,mysql.sort.sort_scan,Sort Scan,Sort Scan,float,次/s,,,,,,,\n' +
  'mysql,table_lock,,table_locks_immediate,mysql.table_lock.table_locks_immediate,Table Locks Immediate,表锁Immediate,float,次/s,,,,,,,\n' +
  'mysql,table_lock,,table_locks_waited,mysql.table_lock.table_locks_waited,Table Locks Waited,表锁Waited,float,次/s,,,,,,,\n' +
  'mysql,query_cache,,free_memory,mysql.query_cache.free_memory,Free Memory,可用查询缓存,int,KB,,,,,,,\n' +
  'mysql,query_cache,,query_cache_size,mysql.query_cache.query_cache_size,Query Cache Size,查询缓存大小,int,B,,,,,,,\n' +
  'mysql,query_cache,,hits,mysql.query_cache.hits,Hits,Hits,float,,,,,,,,\n' +
  'mysql,query_cache,,inserts,mysql.query_cache.inserts,Inserts,Inserts,float,,,,,,,,\n' +
  'mysql,query_cache,,not_cached,mysql.query_cache.not_cached,Not Cached,Not Cached,float,,,,,,,,\n' +
  'mysql,query_cache,,prunes,mysql.query_cache.prunes,Prunes,Prunes,float,,,,,,,,\n' +
  'mysql,query_cache,,queries_in_cache,mysql.query_cache.queries_in_cache,Queries in Cache,缓存中的查询数,float,,,,,,,,'

export default data