---
id: extend-http-default  
title: HTTP Protocol System Default Parsing Method  
sidebar_label: System Default Parsing Method
---
> After calling the HTTP interface to obtain the response data, use the default parsing method of argusDBM to parse the response data.    

**The interface response data structure must be consistent with the data structure rules specified by argusDBM**   

### argusDBM data format specification      
Note⚠️ The response data is JSON format.  

Single layer format ：key-value
```json
{
  "metricName1": "metricValue",
  "metricName2": "metricValue",
  "metricName3": "metricValue",
  "metricName4": "metricValue"
}
```
Multilayer format：Set key value in the array
```json
[
  {
    "metricName1": "metricValue",
    "metricName2": "metricValue",
    "metricName3": "metricValue",
    "metricName4": "metricValue"
  },
  {
    "metricName1": "metricValue",
    "metricName2": "metricValue",
    "metricName3": "metricValue",
    "metricName4": "metricValue"
  }
]
```
eg：
Query the CPU information of the custom system. The exposed interface is `/metrics/cpu`. We need `hostname,core,useage` Metric. 
If there is only one virtual machine, its single-layer format is : 
```json
{
  "hostname": "linux-1",
  "core": 1,
  "usage": 78.0,
  "allTime": 200,
  "runningTime": 100
}
```
If there are multiple virtual machines, the multilayer format is: : 
```json
[
  {
    "hostname": "linux-1",
    "core": 1,
    "usage": 78.0,
    "allTime": 200,
    "runningTime": 100
  },
  {
    "hostname": "linux-2",
    "core": 3,
    "usage": 78.0,
    "allTime": 566,
    "runningTime": 34
  },
  {
    "hostname": "linux-3",
    "core": 4,
    "usage": 38.0,
    "allTime": 500,
    "runningTime": 20
  }
]
```

**The corresponding monitoring configuration definition file YML can be configured as follows**  

```yaml
# The monitoring type category：service-application service monitoring db-database monitoring custom-custom monitoring os-operating system monitoring
category: custom
# Monitoring application type(consistent with the file name) eg: linux windows tomcat mysql aws...
app: example
name:
  zh-CN: 模拟应用类型
  en-US: EXAMPLE APP
# parameter mapping map. These are input parameter variables which can be written to the configuration in form of ^_^host^_^. The system automatically replace variable's value.
# type means parameter type: 0-number number, 1-string cleartext string, 2-secret encrypted string
# required parameters - host
configmap:
  - key: host
    type: 1
  - key: port
    type: 0
# Metric group list
metrics:
# The first monitoring Metric group cpu
# Note：the built-in monitoring Metrics have (responseTime - response time)
  - name: cpu
    # The smaller Metric group scheduling priority(0-127), the higher the priority. After completion of the high priority Metric group collection,the low priority Metric group will then be scheduled. Metric groups with the same priority  will be scheduled in parallel.
    # Metric group with a priority of 0 is an availability group which will be scheduled first. If the collection succeeds, the  scheduling will continue otherwise interrupt scheduling.
    priority: 0
    # Specific monitoring Metrics in the Metric group
    fields:
      # Metric information include   field: name   type: field type(0-number: number, 1-string: string)   nstance: primary key of instance or not   unit: Metric unit
      - field: hostname
        type: 1
        instance: true
      - field: usage
        type: 0
        unit: '%'
      - field: core
        type: 0
# protocol for monitoring and collection eg: sql, ssh, http, telnet, wmi, snmp, sdk
    protocol: http
# Specific collection configuration when the protocol is HTTP protocol
    http:
      # host: ipv4 ipv6 domain name
      host: ^_^host^_^
      # port
      port: ^_^port^_^
      # url request interface path
      url: /metrics/cpu
      # request mode: GET POST PUT DELETE PATCH
      method: GET
      # enable ssl/tls or not, that is to say, HTTP or HTTPS. The default is false
      ssl: false
      # parsing method for reponse data: default-system rules, jsonPath-jsonPath script, website-website availability Metric monitoring
      # argusDBM default parsing is used here
      parseType: default
```
