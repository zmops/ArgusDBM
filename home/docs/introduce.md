---
id: introduce  
title: TanCloud 是什么?     
sidebar_label: TanCloud介绍
slug: /
---

> 易用友好的高性能实时云监控服务，无需Agent，强大自定义监控能力。

![tan-cloud](https://cdn.jsdelivr.net/gh/dromara/hertzbeat@gh-pages/img/badge/web-monitor.svg)
![tan-cloud](https://cdn.jsdelivr.net/gh/dromara/hertzbeat@gh-pages/img/badge/ping-connect.svg)
![tan-cloud](https://cdn.jsdelivr.net/gh/dromara/hertzbeat@gh-pages/img/badge/port-available.svg)
![tan-cloud](https://cdn.jsdelivr.net/gh/dromara/hertzbeat@gh-pages/img/badge/database-monitor.svg)
![tan-cloud](https://cdn.jsdelivr.net/gh/dromara/hertzbeat@gh-pages/img/badge/os-monitor.svg)
![tan-cloud](https://cdn.jsdelivr.net/gh/dromara/hertzbeat@gh-pages/img/badge/custom-monitor.svg)
![tan-cloud](https://cdn.jsdelivr.net/gh/dromara/hertzbeat@gh-pages/img/badge/threshold.svg)
![tan-cloud](https://cdn.jsdelivr.net/gh/dromara/hertzbeat@gh-pages/img/badge/alert.svg)


## 🎡 <font color="green">介绍</font>

> [TanCloud 云服务](https://console.tancloud.cn)是我们基于开源实时监控系统 [HertzBeat赫兹跳动](https://github.com/dromara/hertzbeat) 推出的高性能监控云服务。  
> [HertzBeat赫兹跳动](https://github.com/dromara/hertzbeat) 是一个拥有强大自定义监控能力，无需Agent的实时监控系统。网站监测，PING连通性，端口可用性，数据库，操作系统，中间件，API监控，阈值告警，告警通知(邮件微信钉钉飞书)。    
> 中小团队和个人无需再为了监控自己的网站资源，而去部署一套繁琐的监控系统，**[登录即可免费开始云监控](https://console.tancloud.cn)**。       
> 基于开源构建，我们的服务更受开发者的肯定与信赖。           
> 开源产品也在快速迭代中，欢迎参与加入一起共建项目开源+云SAAS生态。

## ⛄ Supported

- [网站监控](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-website.yml), [端口可用性](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-port.yml),
  [Http Api](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-api.yml), [Ping连通性](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-ping.yml),
  [Jvm](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-jvm.yml), [SiteMap全站](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-fullsite.yml),
  [Ssl证书](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-ssl_cert.yml), [SpringBoot](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-springboot2.yml),
  [FTP服务器](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-ftp.yml)
- [Mysql](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-mysql.yml), [PostgreSQL](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-postgresql.yml),
  [MariaDB](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-mariadb.yml), [Redis](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-redis.yml),
  [ElasticSearch](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-elasticsearch.yml), [SqlServer](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-sqlserver.yml),
  [Oracle](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-oracle.yml), [MongoDB](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-mongodb.yml),
  [达梦](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-dm.yml), [OpenGauss](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-opengauss.yml),
  [ClickHouse](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-clickhouse.yml), [IoTDB](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-iotdb.yml)
- [Linux](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-linux.yml), [Ubuntu](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-ubuntu.yml),
  [CentOS](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-centos.yml), [Windows](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-windows.yml)
- [Tomcat](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-tomcat.yml), [Nacos](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-nacos.yml),
  [Zookeeper](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-zookeeper.yml), [RabbitMQ](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-rabbitmq.yml),
  [Flink](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-flink.yml), [Kafka](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-kafka.yml),
  [ShenYu](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-shenyu.yml), [DynamicTp](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-dynamic_tp.yml),
  [Jetty](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-jetty.yml), [ActiveMQ](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-activemq.yml)
- [Kubernetes](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-kubernetes.yml), [Docker](https://github.com/dromara/hertzbeat/tree/master/manager/src/main/resources/define/app-docker.yml)
- 和更多的自定义监控。
- 通知支持 `Discord` `Slack` `Telegram` `邮件` `钉钉` `微信` `飞书` `短信` `Webhook`。
