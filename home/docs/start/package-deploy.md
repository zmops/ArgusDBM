---
id: package-deploy  
title: 通过安装包安装 argusDBM    
sidebar_label: 安装包方式部署    
---
> argusDBM支持在Linux Windows Mac系统安装运行，CPU支持X86/ARM64。    
> 由于安装包自身不包含JAVA运行环境，需您提前准备JAVA运行环境。   

1. 安装JAVA运行环境-可参考[官方网站](http://www.oracle.com/technetwork/java/javase/downloads/index.html)    
   要求：JAVA11环境   
   下载JAVA安装包: [镜像站](https://repo.huaweicloud.com/java/jdk/)   
   安装后命令行检查是否成功安装   
   ```
   $ java -version
   java version "11.0.12"
   Java(TM) SE Runtime Environment 18.9 (build 11.0.12+8-LTS-237)
   Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.12+8-LTS-237, mixed mode)

   ```
2. 下载argusDBM安装包
   下载您系统环境对应的安装包
   - 从[GITHUB Release](https://github.com/zmops/argusDBM/releases) 仓库下载

3. 配置argusDBM的配置文件(可选)       
   解压安装包到主机 eg: /opt/argusDBM  
   ``` 
   $ tar zxvf argusDBM-[版本号].tar.gz   
   ```
   修改位于 `argusDBM/config/application.yml` 的配置文件(可选)，您可以根据需求修改配置文件     
   - 若需使用邮件发送告警，需替换`application.yml`里面的邮件服务器参数
   - **推荐**若需使用外置Mysql数据库替换内置H2数据库，需替换`application.yml`里面的`spring.datasource`参数 具体步骤参见 [H2数据库切换为MYSQL](mysql-change)）
   - **推荐**若需使用时序数据库TDengine来存储指标数据，需替换`application.yml`里面的`warehouse.store.td-engine`参数 具体步骤参见 [使用TDengine存储指标数据](tdengine-init)
   - **推荐**若需使用时序数据库IotDB来存储指标数据库，需替换`application.yml`里面的`warehouse.storeiot-db`参数 具体步骤参见 [使用IotDB存储指标数据](iotdb-init)

4. 配置用户配置文件(可选,自定义配置用户密码)     
   argusDBM默认内置用户账户为 argus/argus  
   若需要新增删除修改账户或密码，可以通过修改位于 `argusDBM/config/sureness.yml` 的配置文件实现，若无此需求可忽略此步骤     
   具体参考 [配置修改账户密码](account-modify)   

5. 部署启动
   执行位于安装目录argusDBM/bin/下的启动脚本 startup.sh, windows环境下为 startup.bat    
   ``` 
   $ ./startup.sh 
   ```
6. 开始探索argusDBM  
   浏览器访问 http://ip:1159/ 即刻开始探索使用argusDBM，默认账户密码 argus/argus。  

**HAVE FUN**
