---
title: argusDBM v1.1.1 is Publish！   
author: tom  
author_title: tom   
author_url: https://github.com/tomsun28  
author_image_url: https://avatars.githubusercontent.com/u/24788200?s=400&v=4  
tags: [opensource]  
---

> Friendly Cloud Monitoring System. | 易用友好的实时监控系统, 无需Agent, 强大自定义监控能力.

**Home: [argusDBM.com](https://argusDBM.com)**  

Hi guys! argusDBM v1.1.1 is coming. This version brings custom monitoring enhancements, and the collected indicator data can be assigned as a variable to the next collection. Fixed several bugs and improved the overall stable usability.

Only one docker command is needed to install and experience argusDBM：
`docker run -d -p 1157:1157 --name argusDBM tancloud/argusDBM`

Thanks to the contributors! 👍👍

Feature：

1. [[script] feature update docker base image to openjdk:11.0.15-jre-slim… #205](https://github.com/ zmops/argusDBM/pull/205)
2. [[monitor] support use pre collect metrics data to replace next metrics config params #206](https://github.com/ zmops/argusDBM/pull/206).
3. [[collector] use basic auth with raw HTTP headers instead of preemptive #212](https://github.com/ zmops/argusDBM/pull/212)
4. [[manager,alerter] support wework, dingDing, flyBook webhook url config #213](https://github.com/ zmops/argusDBM/pull/213)
5.  [[monitor] feature update numeric metrics all contain decimal points #217](https://github.com/ zmops/argusDBM/pull/217)
6. [[web-app]feature:toggle [enable and cancel] button #218](https://github.com/ zmops/argusDBM/pull/218)
7. [[manager] update define yml file name add prefix "app" or "param" #221](https://github.com/ zmops/argusDBM/pull/221)

Bugfix.

1. [[update] docker-compose 添加jpa自动执行脚本,删除sql脚本 #198](https://github.com/ zmops/argusDBM/pull/198) contribute by @DevilX5  .
2. [Doc#param names refactor #199](https://github.com/ zmops/argusDBM/pull/199) contribute by @DevilX5
3. [[manager] bugfix oracle performance metrics collect error, update win name #201](https://github.com/ zmops/argusDBM/pull/201).
4. [[common] bugfix alert status can not update #203](https://github.com/ zmops/argusDBM/pull/203)
5. [[manager] bugfix update windows monitor type name #204](https://github.com/ zmops/argusDBM/pull/204)
6. [fix time zone todo issue #210](https://github.com/ zmops/argusDBM/pull/210) contribute by @djzeng
8. [[common] bugfix SnowFlakeId cannot exceed hexadecimal 0x1FFFFFFFFFFFFFF #211](https://github.com/ zmops/argusDBM/pull/211)
9. [[manager] 修改监控页面取消监控功能再启动监控导致多生成jobId，原有监控项目并没有真实取消 #215](https://github.com/ zmops/argusDBM/pull/215) contribute by @yangshihui
10. [[warehouse] bugfix exception when tdengine create table SQL contain special char #220](https://github.com/ zmops/argusDBM/pull/220)

Online https://console.tancloud.cn.

Have Fun!

----    

> [argusDBM](https://github.com/ zmops/argusDBM) is an opensource monitoring and alarm project incubated by [ zmops](https:// zmops.org) and open sourced by [TanCloud](https://tancloud.cn), which supports Website, API, PING, Port, Database, OS Monitor etc.        
> We also provide **[Monitoring Cloud For Saas](https://console.tancloud.cn)**, people no longer need to deploy a cumbersome monitoring system in order to monitor their website resources. **[Sign in to get started for free](https://console.tancloud.cn)**.   
> argusDBM supports more liberal threshold alarm configuration (calculation expression), supports alarm notification, alarm template, email, DingDing, WeChat FeiShu and WebHook.    
> Most important is argusDBM supports [Custom Monitoring](https://argusDBM.com/docs/advanced/extend-point), just by configuring the YML file, we can customize the monitoring types and metrics what we need.      
> argusDBM is modular, `manager, collector, scheduler, warehouse, alerter` modules are decoupled for easy understanding and custom development.  
> Welcome to argusDBM's [Cloud Environment TanCloud](https://console.tancloud.cn) to try and discover more.    
> Welcome to join us to build argusDBM together.

> `argusDBM`'s multi-type support, easy expansion, low coupling, hope to help developers and micro teams to quickly build their own monitoring system.

**If you like argusDBM, give us a star on GitHub**

[Github](https://github.com/ zmops/argusDBM) https://github.com/ zmops/argusDBM      
[Gitee](https://gitee.com/ zmops/argusDBM) https://gitee.com/ zmops/argusDBM

