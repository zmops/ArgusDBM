---
id: mysql-change  
title: Dependent Relational Database H2 Switch to MYSQL            
sidebar_label: H2 Database Switch to MYSQL    
---
MYSQL is a reliable relational database. In addition to default built-in H2 database, argusDBM allow you to use MYSQL to store structured relational data such as monitoring information, alarm information and configuration information.   

> If you have the MYSQL environment, can be directly to database creation step.  

### Install MYSQL via Docker   
1. Download and install the Docker environment   
   Docker tools download refer to [Docker official document](https://docs.docker.com/get-docker/)。
   After the installation you can check if the Docker version normally output at the terminal.  
   ```
   $ docker -v
   Docker version 20.10.12, build e91ed57
   ```
2. Install MYSQl with Docker 
   ```
   $ docker run -d --name mysql -p 3306:3306 -v /opt/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7
   ```
   `-v /opt/data:/var/lib/mysql`  is local persistent mount of mysql data directory. `/opt/data` should be replaced with the actual local directory.          
   use```$ docker ps```to check if the database started successfully

### Database creation   
1. Enter MYSQL or use the client to connect MYSQL service   
   `mysql -uroot -p123456`  
2. Create database named argusDBM    
   `create database argusDBM;`
3. Check if argusDBM database has been successfully created
   `show databases;`

### Modify argusDBM's configuration file application.yml and switch data source  

1. Configure argusDBM's configuration file
   Modify `argusDBM/config/application.yml` configuration file
   Note⚠️The docker container way need to mount application.yml file locally,while you can use installation package way to unzip and modify `argusDBM/config/application.yml`  
   Replace `spring.database` data source parameters, URL account and password.
```yaml
spring:
  datasource:
    driver-class-name: org.h2.Driver
    username: sa
    password: 123456
    url: jdbc:h2:./data/argusDBM;MODE=MYSQL
```
   Specific replacement parameters is as follows and you need to configure account according to the mysql environment:   
```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 123456
    url: jdbc:mysql://localhost:3306/argusDBM?useUnicode=true&characterEncoding=utf-8&useSSL=false
```

**Start argusDBM  visit http://ip:1159/ on the browser  You can use argusDBM monitoring alarm, default account and password are admin/argusDBM**  
