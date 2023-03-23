---
id: quickstart  
title: Quick Start    
sidebar_label: Quick Start    
---

### 🐕 Quick Start

- If you don’t want to deploy but use it directly, we provide [SAAS Monitoring Cloud-TanCloud](https://console.tancloud.cn), **[Log In And Register For Free](https://console.tancloud.cn)**.
- If you want to deploy argusDBM local, please refer to the following Deployment Documentation for operation.

### 🍞 Install argusDBM

> argusDBM supports installation through source code, docker or package, cpu support X86/ARM64.

##### 1：Install quickly via docker

1. Just one command to get started: `docker run -d -p 1157:1157 --name argusDBM tancloud/argusDBM`

2. Access `localhost:1157` to start, default account: `admin/argusDBM`

Detailed config refer to [Install argusDBM via Docker](https://argusDBM.com/docs/start/docker-deploy)

##### 2：Install via package

1. Download the installation package [GITEE Release](https://gitee.com/ zmops/argusDBM/releases) [GITHUB Release](https://github.com/ zmops/argusDBM/releases)
2. Need Jdk Environment, `jdk11`
3. [optional]Configure the argusDBM configuration yml file `argusDBM/config/application.yml`
4. Run shell `$ ./startup.sh `
5. Access `localhost:1157` to start, default account: `admin/argusDBM`

Detailed config refer to [Install argusDBM via Package](https://argusDBM.com/docs/start/package-deploy)

##### 3：Start via source code

1. Local source code debugging needs to start the back-end project manager and the front-end project web-app.
2. Backend：need `maven3+`, `java11`, `lombok`, start the manager service.
3. Web：need `nodejs npm angular-cli` environment, Run `ng serve --open` in `web-app` directory after backend startup.
4. Access `localhost:4200` to start, default account: `admin/argusDBM`

Detailed steps refer to [CONTRIBUTING](../others/contributing)   

##### 4：Install All(mysql+tdengine+argusDBM) via Docker-compose

Install and deploy the mysql database, tdengine database and argusDBM at one time through [docker-compose deployment script](https://github.com/ zmops/argusDBM/tree/master/script/docker-compose).

Detailed steps refer to [Install via Docker-Compose](https://github.com/ zmops/argusDBM/tree/master/script/docker-compose)

**HAVE FUN**  
