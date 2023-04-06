"use strict";(self.webpackChunktancloud=self.webpackChunktancloud||[]).push([[8613],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return k}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),p=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=p(e.components);return r.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),c=p(n),k=a,d=c["".concat(u,".").concat(k)]||c[k]||s[k]||l;return n?r.createElement(d,o(o({ref:t},m),{},{components:n})):r.createElement(d,o({ref:t},m))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=c;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var p=2;p<l;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},6796:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return o},default:function(){return s},frontMatter:function(){return l},metadata:function(){return i},toc:function(){return p}});var r=n(3117),a=(n(7294),n(3905));const l={title:"\u5f00\u6e90\u6570\u636e\u5e93\u4e00\u4f53\u5316\u76d1\u63a7\u5e73\u53f0 ArgusDBM \u6b63\u5f0f\u53d1\u5e03",author:"tom",author_title:"tom",author_url:"https://github.com/tomsun28",author_image_url:"https://avatars.githubusercontent.com/u/24788200?s=400&v=4",tags:["opensource"]},o="\u5f00\u6e90\u6570\u636e\u5e93\u4e00\u4f53\u5316\u76d1\u63a7\u5e73\u53f0 ArgusDBM \u6b63\u5f0f\u53d1\u5e03",i={permalink:"/blog/2023/03/23/argus",editUrl:"https://github.com/zmops/ArgusDBM/edit/main/home/blog/2023-03-23-argus.md",source:"@site/blog/2023-03-23-argus.md",title:"\u5f00\u6e90\u6570\u636e\u5e93\u4e00\u4f53\u5316\u76d1\u63a7\u5e73\u53f0 ArgusDBM \u6b63\u5f0f\u53d1\u5e03",description:"Argus \u5f00\u6e90\u6570\u636e\u5e93\u4e00\u4f53\u5316\u76d1\u63a7\u5e73\u53f0\uff0c\u81f4\u529b\u4e8e\u76d1\u63a7\u6240\u6709\u6570\u636e\u5e93\u3002",date:"2023-03-23T00:00:00.000Z",formattedDate:"2023\u5e743\u670823\u65e5",tags:[{label:"opensource",permalink:"/blog/tags/opensource"}],readingTime:2.295,hasTruncateMarker:!1,authors:[{name:"tom",title:"tom",url:"https://github.com/tomsun28",imageURL:"https://avatars.githubusercontent.com/u/24788200?s=400&v=4"}],frontMatter:{title:"\u5f00\u6e90\u6570\u636e\u5e93\u4e00\u4f53\u5316\u76d1\u63a7\u5e73\u53f0 ArgusDBM \u6b63\u5f0f\u53d1\u5e03",author:"tom",author_title:"tom",author_url:"https://github.com/tomsun28",author_image_url:"https://avatars.githubusercontent.com/u/24788200?s=400&v=4",tags:["opensource"]}},u={authorsImageUrls:[void 0]},p=[{value:"\ud83d\udc15 \u5feb\u901f\u5f00\u59cb",id:"-\u5feb\u901f\u5f00\u59cb",level:2},{value:"\ud83d\udc15 ArgusDBM\u5b89\u88c5",id:"-argusdbm\u5b89\u88c5",level:3},{value:"\u65b9\u5f0f\u4e00\uff1aDocker\u65b9\u5f0f\u5feb\u901f\u5b89\u88c5",id:"\u65b9\u5f0f\u4e00docker\u65b9\u5f0f\u5feb\u901f\u5b89\u88c5",level:4},{value:"\u65b9\u5f0f\u4e8c\uff1a\u901a\u8fc7\u5b89\u88c5\u5305\u5b89\u88c5",id:"\u65b9\u5f0f\u4e8c\u901a\u8fc7\u5b89\u88c5\u5305\u5b89\u88c5",level:4},{value:"\u65b9\u5f0f\u4e09\uff1a\u672c\u5730\u4ee3\u7801\u542f\u52a8",id:"\u65b9\u5f0f\u4e09\u672c\u5730\u4ee3\u7801\u542f\u52a8",level:4},{value:"\u540e\u7aef\u672c\u5730\u4ee3\u7801\u542f\u52a8",id:"\u540e\u7aef\u672c\u5730\u4ee3\u7801\u542f\u52a8",level:5},{value:"\u524d\u7aef\u672c\u5730\u4ee3\u7801\u542f\u52a8",id:"\u524d\u7aef\u672c\u5730\u4ee3\u7801\u542f\u52a8",level:5}],m={toc:p};function s(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Argus \u5f00\u6e90\u6570\u636e\u5e93\u4e00\u4f53\u5316\u76d1\u63a7\u5e73\u53f0\uff0c\u81f4\u529b\u4e8e\u76d1\u63a7\u6240\u6709\u6570\u636e\u5e93\u3002   ")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u6e90\u4e8e ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/dromara/hertzbeat"},"HertzBeat")," \uff0c\u4e13\u6ce8\u4e8e\u6570\u636e\u5e93\u65b9\u5411\uff0c\u4f18\u7f8e\u7684\u53ef\u89c6\u5316\u754c\u9762\uff0c\u6240\u89c1\u5373\u6240\u5f97\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u5f00\u7bb1\u5373\u7528\uff0c\u65e0\u9700\u90e8\u7f72Agent\uff0c\u914d\u7f6eIP\u7aef\u53e3\u8d26\u6237\u7b49\u540e\u5373\u53ef\u76d1\u63a7\uff0c\u5927\u5927\u51cf\u5c11\u4f01\u4e1a\u6570\u636e\u5e93\u76d1\u63a7\u6d41\u7a0b\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u64cd\u4f5c\u7b80\u5355\uff0c\u5feb\u6377\u597d\u7528\uff0c\u6df1\u5ea6\u7ed3\u5408\u6211\u4eec\u5728\u76d1\u63a7\u9886\u57df\u7684\u6700\u4f73\u5b9e\u8df5\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u65e0\u7f1d\u8854\u63a5Zabbix\uff0c\u81ea\u8eab\u53ef\u505a\u4e3aAgent\u5bf9Zabbix\u7684\u6570\u636e\u5e93\u76d1\u63a7\u77ed\u677f\u589e\u5f3a\u3002")),(0,a.kt)("h2",{id:"-\u5feb\u901f\u5f00\u59cb"},"\ud83d\udc15 \u5feb\u901f\u5f00\u59cb"),(0,a.kt)("h3",{id:"-argusdbm\u5b89\u88c5"},"\ud83d\udc15 ArgusDBM\u5b89\u88c5"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"ArgusDBM \u652f\u6301\u901a\u8fc7\u6e90\u7801\u5b89\u88c5\u542f\u52a8\uff0cDocker\u5bb9\u5668\u8fd0\u884c\u548c\u5b89\u88c5\u5305\u65b9\u5f0f\u5b89\u88c5\u90e8\u7f72\uff0cCPU\u67b6\u6784\u652f\u6301X86/ARM64\u3002")),(0,a.kt)("h4",{id:"\u65b9\u5f0f\u4e00docker\u65b9\u5f0f\u5feb\u901f\u5b89\u88c5"},"\u65b9\u5f0f\u4e00\uff1aDocker\u65b9\u5f0f\u5feb\u901f\u5b89\u88c5"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"docker")," \u73af\u5883\u4ec5\u9700\u4e00\u6761\u547d\u4ee4\u5373\u53ef\u5f00\u59cb")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"docker run -d -p 1159:1159 --name argusdbm walkingfunny/argusdbm")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"\u6d4f\u89c8\u5668\u8bbf\u95ee ",(0,a.kt)("inlineCode",{parentName:"li"},"localhost:1159")," \u5373\u53ef\u5f00\u59cb\uff0c\u9ed8\u8ba4\u8d26\u53f7\u5bc6\u7801 ",(0,a.kt)("inlineCode",{parentName:"li"},"argus/argus"))),(0,a.kt)("p",null,"\u66f4\u591a\u914d\u7f6e\u8be6\u7ec6\u6b65\u9aa4\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/zmops/ArgusDBM/tree/main/home/docs/start/docker-deploy.md"},"\u901a\u8fc7Docker\u65b9\u5f0f\u5b89\u88c5ArgusDBM")),(0,a.kt)("h4",{id:"\u65b9\u5f0f\u4e8c\u901a\u8fc7\u5b89\u88c5\u5305\u5b89\u88c5"},"\u65b9\u5f0f\u4e8c\uff1a\u901a\u8fc7\u5b89\u88c5\u5305\u5b89\u88c5"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u4e0b\u8f7d\u60a8\u7cfb\u7edf\u73af\u5883\u5bf9\u5e94\u7684\u5b89\u88c5\u5305 ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/zmops/argusdbm/releases"},"GITHUB Release")),(0,a.kt)("li",{parentName:"ol"},"\u9700\u8981\u5df2\u5b89\u88c5java\u73af\u5883, ",(0,a.kt)("inlineCode",{parentName:"li"},"jdk11")),(0,a.kt)("li",{parentName:"ol"},"[\u53ef\u9009]","\u914d\u7f6e ArgusDBM \u7684\u914d\u7f6e\u6587\u4ef6 ",(0,a.kt)("inlineCode",{parentName:"li"},"argusdbm/config/application.yml")),(0,a.kt)("li",{parentName:"ol"},"\u90e8\u7f72\u542f\u52a8 ",(0,a.kt)("inlineCode",{parentName:"li"},"$ ./startup.sh ")),(0,a.kt)("li",{parentName:"ol"},"\u6d4f\u89c8\u5668\u8bbf\u95ee ",(0,a.kt)("inlineCode",{parentName:"li"},"localhost:1159")," \u5373\u53ef\u5f00\u59cb\uff0c\u9ed8\u8ba4\u8d26\u53f7\u5bc6\u7801 ",(0,a.kt)("inlineCode",{parentName:"li"},"argus/argus"))),(0,a.kt)("p",null,"\u66f4\u591a\u914d\u7f6e\u8be6\u7ec6\u6b65\u9aa4\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/zmops/ArgusDBM/tree/main/home/docs/start/package-deploy.md"},"\u901a\u8fc7\u5b89\u88c5\u5305\u5b89\u88c5 ArgusDBM")),(0,a.kt)("h4",{id:"\u65b9\u5f0f\u4e09\u672c\u5730\u4ee3\u7801\u542f\u52a8"},"\u65b9\u5f0f\u4e09\uff1a\u672c\u5730\u4ee3\u7801\u542f\u52a8"),(0,a.kt)("h5",{id:"\u540e\u7aef\u672c\u5730\u4ee3\u7801\u542f\u52a8"},"\u540e\u7aef\u672c\u5730\u4ee3\u7801\u542f\u52a8"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u9700\u5b89\u88c5 ",(0,a.kt)("inlineCode",{parentName:"li"},"maven3+"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"java11")," \u73af\u5883, ",(0,a.kt)("inlineCode",{parentName:"li"},"IDEA")," \u9700\u5b89\u88c5 ",(0,a.kt)("inlineCode",{parentName:"li"},"lombok")," \u63d2\u4ef6"),(0,a.kt)("li",{parentName:"ol"},"\u4e3b\u76ee\u5f55\u4e0b\u6267\u884c ",(0,a.kt)("inlineCode",{parentName:"li"},"mvn clean install")),(0,a.kt)("li",{parentName:"ol"},"\u542f\u52a8 ",(0,a.kt)("inlineCode",{parentName:"li"},"springboot manager")," \u670d\u52a1 ",(0,a.kt)("inlineCode",{parentName:"li"},"manager/src/main/java/com/zmops/open/manager/Manager.java")),(0,a.kt)("li",{parentName:"ol"},"\u540e\u7aef\u670d\u52a1 ",(0,a.kt)("inlineCode",{parentName:"li"},"swagger")," \u63a5\u53e3\u5730\u5740  http://localhost:1159/swagger-ui/index.html"),(0,a.kt)("li",{parentName:"ol"},"\u9ed8\u8ba4\u8d26\u6237\u5bc6\u7801  ",(0,a.kt)("inlineCode",{parentName:"li"},"argus/argus"))),(0,a.kt)("h5",{id:"\u524d\u7aef\u672c\u5730\u4ee3\u7801\u542f\u52a8"},"\u524d\u7aef\u672c\u5730\u4ee3\u7801\u542f\u52a8"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u9700\u5b89\u88c5 ",(0,a.kt)("inlineCode",{parentName:"li"},"nodejs npm")," \u73af\u5883"),(0,a.kt)("li",{parentName:"ol"},"\u5728 ",(0,a.kt)("inlineCode",{parentName:"li"},"web-app")," \u76ee\u5f55\u4e0b\u6267\u884c ",(0,a.kt)("inlineCode",{parentName:"li"},"npm install")),(0,a.kt)("li",{parentName:"ol"},"\u542f\u52a8\u524d\u7aef\u670d\u52a1 ",(0,a.kt)("inlineCode",{parentName:"li"},"npm run dev"),", \u6d4f\u89c8\u5668\u8bbf\u95ee http://localhost:9527 \u5373\u53ef"),(0,a.kt)("li",{parentName:"ol"},"\u9ed8\u8ba4\u8d26\u6237\u5bc6\u7801 ",(0,a.kt)("inlineCode",{parentName:"li"},"argus/argus"))),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"HAVE FUN")))}s.isMDXComponent=!0}}]);