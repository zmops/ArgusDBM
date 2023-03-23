---
title: argusDBM v1.2.3！Support Prometheus,ShenYu and IotDb    
author: tom  
author_title: tom   
author_url: https://github.com/tomsun28  
author_image_url: https://avatars.githubusercontent.com/u/24788200?s=400&v=4  
tags: [opensource]
---

## v1.2.3   

Home: argusDBM.com | tancloud.cn

Hi guys! argusDBM v1.2.3 is coming. This release we support prometheus exporter and more. Now we can collect prometheus exporter metrics using argusDBM. For this, we support monitor apache shenyu and apache iotdb. Fixed several bugs and improved the overall stable usability.

Let's Try It Now!

Only one docker command is needed to install and experience heartbeat：
`docker run -d -p 1157:1157 --name argusDBM tancloud/argusDBM`

Thanks to the contributors! 👍👍

We urgently need contributors to test cases, new application monitoring, documentation, etc., and very welcome you to join. Come on! argusDBM is so easy!

Feature：

1. [[doc] note: startup via source code not required mysql and tdengine env #472](https://github.com/ zmops/argusDBM/pull/472) @xingshuaiLi
2. [[doc] fix up:update the environment of argusDBM to Java version 11 #473](https://github.com/ zmops/argusDBM/pull/473) @BKing2020
3. [[docs] update kubernetes.md #478](https://github.com/ zmops/argusDBM/pull/478) @wangke6666
4. [[web-app] enable alert define preset true by default #485](https://github.com/ zmops/argusDBM/pull/485)
5.  [[web-app] support friendly tip when add notice receiver #486](https://github.com/ zmops/argusDBM/pull/486)
6.  [[web-app] update dashboard category card ui #487](https://github.com/ zmops/argusDBM/pull/487)
6. [[collector] limit trigger sub task max num #488](https://github.com/ zmops/argusDBM/pull/488)
8. [[script] support service restart shell #489](https://github.com/ zmops/argusDBM/pull/489) @zanglikun
9. [[docs] use rainbond deploy argusDBM #495](https://github.com/ zmops/argusDBM/pull/495) @zzzhangqi
10. [[webapp] upgrade web base angular version to 14 #501](https://github.com/ zmops/argusDBM/pull/501)
11. [[argusDBM] support sms alert notice #503](https://github.com/ zmops/argusDBM/pull/503)
12. [add Prometheus exporter metrics parser and IoTDB monitor #505](https://github.com/ zmops/argusDBM/pull/505) @Ceilzcx
13. [support apache shenyu metrics monitoring #507](https://github.com/ zmops/argusDBM/pull/507)


Bugfix.

1. [[manager] fix cross domain problem in SecurityCorsConfiguration #469](https://github.com/ zmops/argusDBM/pull/469)  @zenan08
2. [[manager] bugfix linux cpu usage collect incorrect sometime #479](https://github.com/ zmops/argusDBM/pull/479) @LWBobo
3. [[collector] fix protocol ssl_cert not support #491](https://github.com/ zmops/argusDBM/pull/491)
4. [Update sqlserver.md #493](https://github.com/ zmops/argusDBM/pull/493) @SuitSmile
5. [fix: Remove Alert Unused Monitoring IDs #502](https://github.com/ zmops/argusDBM/pull/502) @wang1027-wqh
6. [[collector] bugfix npe when ssh collect error #508](https://github.com/ zmops/argusDBM/pull/508)
7. [监控k8s问题issue描述与解决方案 #511](https://github.com/ zmops/argusDBM/pull/511) @MrAndyMing
8. [[manager] springboot2 monitor support base path config #515](https://github.com/ zmops/argusDBM/pull/515)

Online https://console.tancloud.cn.

Have Fun!

----     

## V1.2.3
官网: argusDBM.com | tancloud.cn

大家好，argusDBM v1.2.3发布啦！这个版本带来了重大更新，我们支持了对prometheus exporter协议监控，用户可以很方便的使用argusDBM来适配监控prometheus exporter. 基于这个能力，这个版本我们也支持了对apache shenyu, apache iotdb的指标监控。我们更新了UI布局，修复了多个BUG，也支持了短信通知。快来体验下吧!

只需要一条docker命令即可安装体验heartbeat ：
`docker run -d -p 1157:1157 --name argusDBM tancloud/argusDBM`

感谢argusDBM贡献者们的贡献！👍👍

我们急需对测试用例，新增应用监控，文档等各方面的贡献者，非常欢迎您的加入。快来吧，argusDBM上手非常简单！

Feature：

1. [[doc] note: startup via source code not required mysql and tdengine env #472](https://github.com/ zmops/argusDBM/pull/472) @xingshuaiLi
2. [[doc] fix up:update the environment of argusDBM to Java version 11 #473](https://github.com/ zmops/argusDBM/pull/473) @BKing2020
3. [[docs] update kubernetes.md #478](https://github.com/ zmops/argusDBM/pull/478) @wangke6666
4. [[web-app] enable alert define preset true by default #485](https://github.com/ zmops/argusDBM/pull/485)
5.  [[web-app] support friendly tip when add notice receiver #486](https://github.com/ zmops/argusDBM/pull/486)
6.  [[web-app] update dashboard category card ui #487](https://github.com/ zmops/argusDBM/pull/487)
6. [[collector] limit trigger sub task max num #488](https://github.com/ zmops/argusDBM/pull/488)
8. [[script] support service restart shell #489](https://github.com/ zmops/argusDBM/pull/489) @zanglikun
9. [[docs] use rainbond deploy argusDBM #495](https://github.com/ zmops/argusDBM/pull/495) @zzzhangqi
10. [[webapp] upgrade web base angular version to 14 #501](https://github.com/ zmops/argusDBM/pull/501)
11. [[argusDBM] support sms alert notice #503](https://github.com/ zmops/argusDBM/pull/503)
12. [add Prometheus exporter metrics parser and IoTDB monitor #505](https://github.com/ zmops/argusDBM/pull/505) @Ceilzcx
13. [support apache shenyu metrics monitoring #507](https://github.com/ zmops/argusDBM/pull/507)


Bugfix.

1. [[manager] fix cross domain problem in SecurityCorsConfiguration #469](https://github.com/ zmops/argusDBM/pull/469)  @zenan08
2. [[manager] bugfix linux cpu usage collect incorrect sometime #479](https://github.com/ zmops/argusDBM/pull/479) @LWBobo
3. [[collector] fix protocol ssl_cert not support #491](https://github.com/ zmops/argusDBM/pull/491)
4. [Update sqlserver.md #493](https://github.com/ zmops/argusDBM/pull/493) @SuitSmile
5. [fix: Remove Alert Unused Monitoring IDs #502](https://github.com/ zmops/argusDBM/pull/502) @wang1027-wqh
6. [[collector] bugfix npe when ssh collect error #508](https://github.com/ zmops/argusDBM/pull/508)
7. [监控k8s问题issue描述与解决方案 #511](https://github.com/ zmops/argusDBM/pull/511) @MrAndyMing
8. [[manager] springboot2 monitor support base path config #515](https://github.com/ zmops/argusDBM/pull/515)

----     
