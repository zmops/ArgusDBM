---
id: docker-deploy  
title: 通过 Docker 方式安装 argusDBM    
sidebar_label: Docker方式部署    
---

> 推荐使用Docker部署argusDBM  

1. 下载安装Docker环境   
   Docker 工具自身的下载请参考以下资料：  
    [Docker官网文档](https://docs.docker.com/get-docker/)
   [菜鸟教程-Docker教程](https://www.runoob.com/docker/docker-tutorial.html)
   安装完毕后终端查看Docker版本是否正常输出。

   ```
   $ docker -v
   Docker version 20.10.12, build e91ed57
   ```

2. 拉取argusDBM Docker镜像   
   镜像版本TAG可查看[官方镜像仓库](https://hub.docker.com/r/tancloud/argusDBM/tags)     

   ``` shell
   $ docker pull tancloud/argusDBM   
   ```

3. 部署argusDBM您可能需要掌握的几条命令

   ```shell
   #查看所有容器(在运行和已经停止运行的容器)
   $ docker ps -a
   #启动/终止/重启/运行状态
   $ docker start/stop/restart/stats 容器id或者容器名
   #进入容器并打开容器的shell终端
   $ docker exec -it 容器id或者容器名 /bin/bash
   #退出容器终端
   ctrl+p然后ctrl+q
   #完全退出容器的终端 
   ctrl+d或者
   $ exit
   ```

4. 配置挂载的argusDBM的配置文件(可选)      
   在主机目录下创建application.yml，eg:/opt/application.yml        
   配置文件完整内容见项目仓库[/script/application.yml](https://github.com/zmops/argusDBM/raw/master/script/application.yml) 您可以根据需求修改配置文件
   - 若需使用邮件发送告警，需替换`application.yml`里面的邮件服务器参数
   - **推荐**若需使用外置Mysql数据库替换内置H2数据库，需替换`application.yml`里面的`spring.datasource`参数 具体步骤参见 [H2数据库切换为MYSQL](mysql-change)）       
   - **推荐**若需使用时序数据库TDengine来存储指标数据，需替换`application.yml`里面的`warehouse.store.td-engine`参数 具体步骤参见 [使用TDengine存储指标数据](tdengine-init)   
   - **推荐**若需使用时序数据库IotDB来存储指标数据库，需替换`application.yml`里面的`warehouse.storeiot-db`参数 具体步骤参见 [使用IotDB存储指标数据](iotdb-init)    

5. 配置挂载的argusDBM用户配置文件，自定义用户密码(可选)         
   argusDBM默认内置用户账户为 argus/argus    
   若需要新增删除修改账户或密码，可以通过配置 `sureness.yml` 实现，若无此需求可忽略此步骤    
   在主机目录下创建sureness.yml，eg:/opt/sureness.yml    
   配置文件完整内容见项目仓库[/script/sureness.yml](https://github.com/zmops/argusDBM/blob/master/script/sureness.yml)   
   具体修改步骤参考 [配置修改账户密码](account-modify)   

6. 启动argusDBM Docker容器    

```shell 
$ docker run -d -p 1159:1159 \
    -e LANG=zh_CN.UTF-8 \
    -e TZ=Asia/Shanghai \
    -v /opt/data:/opt/argusDBM/data \
    -v /opt/logs:/opt/argusDBM/logs \
    -v /opt/application.yml:/opt/argusDBM/config/application.yml \
    -v /opt/sureness.yml:/opt/argusDBM/config/sureness.yml \
    --restart=always \
    --name argusDBM tancloud/argusDBM
```

 	这条命令启动一个运行argusDBM的Docker容器，并且将容器的1159端口映射到宿主机的1159端口上。若宿主机已有进程占用该端口，则需要修改主机映射端口。  
   - `docker run -d` : 通过Docker运行一个容器,使其在后台运行

   - `-p 1159:1159`  : 映射容器端口到主机端口，请注意，前面是宿主机的端口号，后面是容器的端口号。

   - `-e LANG=zh_CN.UTF-8`  : (可选) 设置语言

   - `-e TZ=Asia/Shanghai` : (可选) 设置时区

   - `-v /opt/data:/opt/argusDBM/data` : (可选，数据持久化)重要⚠️ 挂载H2数据库文件到本地主机，保证数据不会因为容器的创建删除而丢失  

   - `-v /opt/logs:/opt/argusDBM/logs` : (可选，不需要可删除)挂载日志文件到本地主机，保证日志不会因为容器的创建删除而丢失，方便查看  

   - `-v /opt/application.yml:/opt/argusDBM/config/application.yml`  : (可选,不需要可删除)挂载上上一步修改的本地配置文件到容器中，即使用本地配置文件覆盖容器配置文件。我们需要修改此配置文件的MYSQL，TDengine配置信息来连接外部服务。

   - `-v /opt/sureness.yml:/opt/argusDBM/config/sureness.yml`  : (可选,不需要可删除)挂载上一步修改的账户配置文件到容器中，若无修改账户需求可删除此命令参数。  

   - 注意⚠️ 挂载文件时，前面参数为你自定义本地文件地址，后面参数为docker容器内文件地址(固定)  

   - `--name argusDBM` : 命名容器名称 argusDBM 

   - `--restart=always`：(可选，不需要可删除)使容器在Docker启动后自动重启。若您未在容器创建时指定该参数，可通过以下命令实现该容器自启。

     ```shell
     $ docker update --restart=always argusDBM
     ```

   - `walkingfunny/argusDBM` : 使用拉取最新的的argusDBM官方发布的应用镜像来启动容器,版本可查看[官方镜像仓库](https://hub.docker.com/r/walkingfunny/argusDBM/tags)   

7. 开始探索argusDBM  
   浏览器访问 http://ip:1159/ 即可开始探索使用argusDBM，默认账户密码 argus/argus。  

**HAVE FUN**   

