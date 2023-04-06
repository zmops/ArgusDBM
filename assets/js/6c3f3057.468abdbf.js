"use strict";(self.webpackChunktancloud=self.webpackChunktancloud||[]).push([[5363],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return k}});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},p=Object.keys(e);for(a=0;a<p.length;a++)r=p[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)r=p[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),s=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=s(e.components);return a.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,p=e.originalType,i=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=s(r),k=n,d=u["".concat(i,".").concat(k)]||u[k]||m[k]||p;return r?a.createElement(d,l(l({ref:t},c),{},{components:r})):a.createElement(d,l({ref:t},c))}));function k(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var p=r.length,l=new Array(p);l[0]=u;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:n,l[1]=o;for(var s=2;s<p;s++)l[s]=r[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}u.displayName="MDXCreateElement"},906:function(e,t,r){r.r(t),r.d(t,{assets:function(){return i},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return p},metadata:function(){return o},toc:function(){return s}});var a=r(3117),n=(r(7294),r(3905));const p={id:"docker-deploy",title:"\u901a\u8fc7 Docker \u65b9\u5f0f\u5b89\u88c5 argusDBM",sidebar_label:"Docker\u65b9\u5f0f\u90e8\u7f72"},l=void 0,o={unversionedId:"start/docker-deploy",id:"start/docker-deploy",title:"\u901a\u8fc7 Docker \u65b9\u5f0f\u5b89\u88c5 argusDBM",description:"\u63a8\u8350\u4f7f\u7528Docker\u90e8\u7f72argusDBM",source:"@site/docs/start/docker-deploy.md",sourceDirName:"start",slug:"/start/docker-deploy",permalink:"/docs/start/docker-deploy",draft:!1,editUrl:"https://github.com/zmops/ArgusDBM/edit/main/home/docs/start/docker-deploy.md",tags:[],version:"current",frontMatter:{id:"docker-deploy",title:"\u901a\u8fc7 Docker \u65b9\u5f0f\u5b89\u88c5 argusDBM",sidebar_label:"Docker\u65b9\u5f0f\u90e8\u7f72"},sidebar:"docs",previous:{title:"\u5feb\u901f\u5f00\u59cb",permalink:"/docs/start/quickstart"},next:{title:"\u5b89\u88c5\u5305\u65b9\u5f0f\u90e8\u7f72",permalink:"/docs/start/package-deploy"}},i={},s=[],c={toc:s};function m(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u63a8\u8350\u4f7f\u7528Docker\u90e8\u7f72argusDBM  ")),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u4e0b\u8f7d\u5b89\u88c5Docker\u73af\u5883",(0,n.kt)("br",{parentName:"p"}),"\n","Docker \u5de5\u5177\u81ea\u8eab\u7684\u4e0b\u8f7d\u8bf7\u53c2\u8003\u4ee5\u4e0b\u8d44\u6599\uff1a",(0,n.kt)("br",{parentName:"p"}),"\n","",(0,n.kt)("a",{parentName:"p",href:"https://docs.docker.com/get-docker/"},"Docker\u5b98\u7f51\u6587\u6863"),"\n",(0,n.kt)("a",{parentName:"p",href:"https://www.runoob.com/docker/docker-tutorial.html"},"\u83dc\u9e1f\u6559\u7a0b-Docker\u6559\u7a0b"),"\n\u5b89\u88c5\u5b8c\u6bd5\u540e\u7ec8\u7aef\u67e5\u770bDocker\u7248\u672c\u662f\u5426\u6b63\u5e38\u8f93\u51fa\u3002"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre"},"$ docker -v\nDocker version 20.10.12, build e91ed57\n"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u62c9\u53d6argusDBM Docker\u955c\u50cf",(0,n.kt)("br",{parentName:"p"}),"\n","\u955c\u50cf\u7248\u672cTAG\u53ef\u67e5\u770b",(0,n.kt)("a",{parentName:"p",href:"https://hub.docker.com/r/tancloud/argusDBM/tags"},"\u5b98\u65b9\u955c\u50cf\u4ed3\u5e93"),"     "),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"$ docker pull tancloud/argusDBM   \n"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u90e8\u7f72argusDBM\u60a8\u53ef\u80fd\u9700\u8981\u638c\u63e1\u7684\u51e0\u6761\u547d\u4ee4"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"#\u67e5\u770b\u6240\u6709\u5bb9\u5668(\u5728\u8fd0\u884c\u548c\u5df2\u7ecf\u505c\u6b62\u8fd0\u884c\u7684\u5bb9\u5668)\n$ docker ps -a\n#\u542f\u52a8/\u7ec8\u6b62/\u91cd\u542f/\u8fd0\u884c\u72b6\u6001\n$ docker start/stop/restart/stats \u5bb9\u5668id\u6216\u8005\u5bb9\u5668\u540d\n#\u8fdb\u5165\u5bb9\u5668\u5e76\u6253\u5f00\u5bb9\u5668\u7684shell\u7ec8\u7aef\n$ docker exec -it \u5bb9\u5668id\u6216\u8005\u5bb9\u5668\u540d /bin/bash\n#\u9000\u51fa\u5bb9\u5668\u7ec8\u7aef\nctrl+p\u7136\u540ectrl+q\n#\u5b8c\u5168\u9000\u51fa\u5bb9\u5668\u7684\u7ec8\u7aef \nctrl+d\u6216\u8005\n$ exit\n"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u914d\u7f6e\u6302\u8f7d\u7684argusDBM\u7684\u914d\u7f6e\u6587\u4ef6(\u53ef\u9009)",(0,n.kt)("br",{parentName:"p"}),"\n","\u5728\u4e3b\u673a\u76ee\u5f55\u4e0b\u521b\u5efaapplication.yml\uff0ceg:/opt/application.yml",(0,n.kt)("br",{parentName:"p"}),"\n","\u914d\u7f6e\u6587\u4ef6\u5b8c\u6574\u5185\u5bb9\u89c1\u9879\u76ee\u4ed3\u5e93",(0,n.kt)("a",{parentName:"p",href:"https://github.com/zmops/argusDBM/raw/master/script/application.yml"},"/script/application.yml")," \u60a8\u53ef\u4ee5\u6839\u636e\u9700\u6c42\u4fee\u6539\u914d\u7f6e\u6587\u4ef6"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"\u82e5\u9700\u4f7f\u7528\u90ae\u4ef6\u53d1\u9001\u544a\u8b66\uff0c\u9700\u66ff\u6362",(0,n.kt)("inlineCode",{parentName:"li"},"application.yml"),"\u91cc\u9762\u7684\u90ae\u4ef6\u670d\u52a1\u5668\u53c2\u6570"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"\u63a8\u8350"),"\u82e5\u9700\u4f7f\u7528\u5916\u7f6eMysql\u6570\u636e\u5e93\u66ff\u6362\u5185\u7f6eH2\u6570\u636e\u5e93\uff0c\u9700\u66ff\u6362",(0,n.kt)("inlineCode",{parentName:"li"},"application.yml"),"\u91cc\u9762\u7684",(0,n.kt)("inlineCode",{parentName:"li"},"spring.datasource"),"\u53c2\u6570 \u5177\u4f53\u6b65\u9aa4\u53c2\u89c1 ",(0,n.kt)("a",{parentName:"li",href:"mysql-change"},"H2\u6570\u636e\u5e93\u5207\u6362\u4e3aMYSQL"),"\uff09       "),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"\u63a8\u8350"),"\u82e5\u9700\u4f7f\u7528\u65f6\u5e8f\u6570\u636e\u5e93TDengine\u6765\u5b58\u50a8\u6307\u6807\u6570\u636e\uff0c\u9700\u66ff\u6362",(0,n.kt)("inlineCode",{parentName:"li"},"application.yml"),"\u91cc\u9762\u7684",(0,n.kt)("inlineCode",{parentName:"li"},"warehouse.store.td-engine"),"\u53c2\u6570 \u5177\u4f53\u6b65\u9aa4\u53c2\u89c1 ",(0,n.kt)("a",{parentName:"li",href:"tdengine-init"},"\u4f7f\u7528TDengine\u5b58\u50a8\u6307\u6807\u6570\u636e"),"   "),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"\u63a8\u8350"),"\u82e5\u9700\u4f7f\u7528\u65f6\u5e8f\u6570\u636e\u5e93IotDB\u6765\u5b58\u50a8\u6307\u6807\u6570\u636e\u5e93\uff0c\u9700\u66ff\u6362",(0,n.kt)("inlineCode",{parentName:"li"},"application.yml"),"\u91cc\u9762\u7684",(0,n.kt)("inlineCode",{parentName:"li"},"warehouse.storeiot-db"),"\u53c2\u6570 \u5177\u4f53\u6b65\u9aa4\u53c2\u89c1 ",(0,n.kt)("a",{parentName:"li",href:"iotdb-init"},"\u4f7f\u7528IotDB\u5b58\u50a8\u6307\u6807\u6570\u636e"),"    "))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u914d\u7f6e\u6302\u8f7d\u7684argusDBM\u7528\u6237\u914d\u7f6e\u6587\u4ef6\uff0c\u81ea\u5b9a\u4e49\u7528\u6237\u5bc6\u7801(\u53ef\u9009)",(0,n.kt)("br",{parentName:"p"}),"\n","argusDBM\u9ed8\u8ba4\u5185\u7f6e\u7528\u6237\u8d26\u6237\u4e3a argus/argus",(0,n.kt)("br",{parentName:"p"}),"\n","\u82e5\u9700\u8981\u65b0\u589e\u5220\u9664\u4fee\u6539\u8d26\u6237\u6216\u5bc6\u7801\uff0c\u53ef\u4ee5\u901a\u8fc7\u914d\u7f6e ",(0,n.kt)("inlineCode",{parentName:"p"},"sureness.yml")," \u5b9e\u73b0\uff0c\u82e5\u65e0\u6b64\u9700\u6c42\u53ef\u5ffd\u7565\u6b64\u6b65\u9aa4",(0,n.kt)("br",{parentName:"p"}),"\n","\u5728\u4e3b\u673a\u76ee\u5f55\u4e0b\u521b\u5efasureness.yml\uff0ceg:/opt/sureness.yml",(0,n.kt)("br",{parentName:"p"}),"\n","\u914d\u7f6e\u6587\u4ef6\u5b8c\u6574\u5185\u5bb9\u89c1\u9879\u76ee\u4ed3\u5e93",(0,n.kt)("a",{parentName:"p",href:"https://github.com/zmops/argusDBM/blob/master/script/sureness.yml"},"/script/sureness.yml"),(0,n.kt)("br",{parentName:"p"}),"\n","\u5177\u4f53\u4fee\u6539\u6b65\u9aa4\u53c2\u8003 ",(0,n.kt)("a",{parentName:"p",href:"account-modify"},"\u914d\u7f6e\u4fee\u6539\u8d26\u6237\u5bc6\u7801"),"   ")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u542f\u52a8argusDBM Docker\u5bb9\u5668    "))),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"$ docker run -d -p 1159:1159 \\\n    -e LANG=zh_CN.UTF-8 \\\n    -e TZ=Asia/Shanghai \\\n    -v /opt/data:/opt/argusDBM/data \\\n    -v /opt/logs:/opt/argusDBM/logs \\\n    -v /opt/application.yml:/opt/argusDBM/config/application.yml \\\n    -v /opt/sureness.yml:/opt/argusDBM/config/sureness.yml \\\n    --restart=always \\\n    --name argusDBM tancloud/argusDBM\n")),(0,n.kt)("p",null," \t\u8fd9\u6761\u547d\u4ee4\u542f\u52a8\u4e00\u4e2a\u8fd0\u884cargusDBM\u7684Docker\u5bb9\u5668\uff0c\u5e76\u4e14\u5c06\u5bb9\u5668\u76841159\u7aef\u53e3\u6620\u5c04\u5230\u5bbf\u4e3b\u673a\u76841159\u7aef\u53e3\u4e0a\u3002\u82e5\u5bbf\u4e3b\u673a\u5df2\u6709\u8fdb\u7a0b\u5360\u7528\u8be5\u7aef\u53e3\uff0c\u5219\u9700\u8981\u4fee\u6539\u4e3b\u673a\u6620\u5c04\u7aef\u53e3\u3002  "),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"docker run -d")," : \u901a\u8fc7Docker\u8fd0\u884c\u4e00\u4e2a\u5bb9\u5668,\u4f7f\u5176\u5728\u540e\u53f0\u8fd0\u884c")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"-p 1159:1159"),"  : \u6620\u5c04\u5bb9\u5668\u7aef\u53e3\u5230\u4e3b\u673a\u7aef\u53e3\uff0c\u8bf7\u6ce8\u610f\uff0c\u524d\u9762\u662f\u5bbf\u4e3b\u673a\u7684\u7aef\u53e3\u53f7\uff0c\u540e\u9762\u662f\u5bb9\u5668\u7684\u7aef\u53e3\u53f7\u3002")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"-e LANG=zh_CN.UTF-8"),"  : (\u53ef\u9009) \u8bbe\u7f6e\u8bed\u8a00")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"-e TZ=Asia/Shanghai")," : (\u53ef\u9009) \u8bbe\u7f6e\u65f6\u533a")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"-v /opt/data:/opt/argusDBM/data")," : (\u53ef\u9009\uff0c\u6570\u636e\u6301\u4e45\u5316)\u91cd\u8981\u26a0\ufe0f \u6302\u8f7dH2\u6570\u636e\u5e93\u6587\u4ef6\u5230\u672c\u5730\u4e3b\u673a\uff0c\u4fdd\u8bc1\u6570\u636e\u4e0d\u4f1a\u56e0\u4e3a\u5bb9\u5668\u7684\u521b\u5efa\u5220\u9664\u800c\u4e22\u5931  ")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"-v /opt/logs:/opt/argusDBM/logs")," : (\u53ef\u9009\uff0c\u4e0d\u9700\u8981\u53ef\u5220\u9664)\u6302\u8f7d\u65e5\u5fd7\u6587\u4ef6\u5230\u672c\u5730\u4e3b\u673a\uff0c\u4fdd\u8bc1\u65e5\u5fd7\u4e0d\u4f1a\u56e0\u4e3a\u5bb9\u5668\u7684\u521b\u5efa\u5220\u9664\u800c\u4e22\u5931\uff0c\u65b9\u4fbf\u67e5\u770b  ")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"-v /opt/application.yml:/opt/argusDBM/config/application.yml"),"  : (\u53ef\u9009,\u4e0d\u9700\u8981\u53ef\u5220\u9664)\u6302\u8f7d\u4e0a\u4e0a\u4e00\u6b65\u4fee\u6539\u7684\u672c\u5730\u914d\u7f6e\u6587\u4ef6\u5230\u5bb9\u5668\u4e2d\uff0c\u5373\u4f7f\u7528\u672c\u5730\u914d\u7f6e\u6587\u4ef6\u8986\u76d6\u5bb9\u5668\u914d\u7f6e\u6587\u4ef6\u3002\u6211\u4eec\u9700\u8981\u4fee\u6539\u6b64\u914d\u7f6e\u6587\u4ef6\u7684MYSQL\uff0cTDengine\u914d\u7f6e\u4fe1\u606f\u6765\u8fde\u63a5\u5916\u90e8\u670d\u52a1\u3002")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"-v /opt/sureness.yml:/opt/argusDBM/config/sureness.yml"),"  : (\u53ef\u9009,\u4e0d\u9700\u8981\u53ef\u5220\u9664)\u6302\u8f7d\u4e0a\u4e00\u6b65\u4fee\u6539\u7684\u8d26\u6237\u914d\u7f6e\u6587\u4ef6\u5230\u5bb9\u5668\u4e2d\uff0c\u82e5\u65e0\u4fee\u6539\u8d26\u6237\u9700\u6c42\u53ef\u5220\u9664\u6b64\u547d\u4ee4\u53c2\u6570\u3002  ")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"\u6ce8\u610f\u26a0\ufe0f \u6302\u8f7d\u6587\u4ef6\u65f6\uff0c\u524d\u9762\u53c2\u6570\u4e3a\u4f60\u81ea\u5b9a\u4e49\u672c\u5730\u6587\u4ef6\u5730\u5740\uff0c\u540e\u9762\u53c2\u6570\u4e3adocker\u5bb9\u5668\u5185\u6587\u4ef6\u5730\u5740(\u56fa\u5b9a)  ")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"--name argusDBM")," : \u547d\u540d\u5bb9\u5668\u540d\u79f0 argusDBM ")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"--restart=always"),"\uff1a(\u53ef\u9009\uff0c\u4e0d\u9700\u8981\u53ef\u5220\u9664)\u4f7f\u5bb9\u5668\u5728Docker\u542f\u52a8\u540e\u81ea\u52a8\u91cd\u542f\u3002\u82e5\u60a8\u672a\u5728\u5bb9\u5668\u521b\u5efa\u65f6\u6307\u5b9a\u8be5\u53c2\u6570\uff0c\u53ef\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5b9e\u73b0\u8be5\u5bb9\u5668\u81ea\u542f\u3002"),(0,n.kt)("pre",{parentName:"li"},(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"$ docker update --restart=always argusDBM\n"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("inlineCode",{parentName:"p"},"walkingfunny/argusDBM")," : \u4f7f\u7528\u62c9\u53d6\u6700\u65b0\u7684\u7684argusDBM\u5b98\u65b9\u53d1\u5e03\u7684\u5e94\u7528\u955c\u50cf\u6765\u542f\u52a8\u5bb9\u5668,\u7248\u672c\u53ef\u67e5\u770b",(0,n.kt)("a",{parentName:"p",href:"https://hub.docker.com/r/walkingfunny/argusDBM/tags"},"\u5b98\u65b9\u955c\u50cf\u4ed3\u5e93"),"   "))),(0,n.kt)("ol",{start:7},(0,n.kt)("li",{parentName:"ol"},"\u5f00\u59cb\u63a2\u7d22argusDBM",(0,n.kt)("br",{parentName:"li"}),"\u6d4f\u89c8\u5668\u8bbf\u95ee http://ip:1159/ \u5373\u53ef\u5f00\u59cb\u63a2\u7d22\u4f7f\u7528argusDBM\uff0c\u9ed8\u8ba4\u8d26\u6237\u5bc6\u7801 argus/argus\u3002  ")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"HAVE FUN")))}m.isMDXComponent=!0}}]);