import React from 'react'

import Translate, {translate} from '@docusaurus/Translate'


export const features = [{
    title: translate({
        message: '开箱即用'
    }),
    description: (
        <>
            <Translate values={{
                br: <br/>
            }}>
                {'无需部署Agent，开箱即用。我们使用JDBC直连您的数据库，输入IP端口账户密码即可。'}
            </Translate>
        </>
    ),
}, {
    title: translate({
        message: '多支持与自定义'
    }),
    description: (
        <>
            <Translate values={{
                WebSockets: <strong>WebSockets</strong>,
                Servlet: <strong>Servlet</strong>,
                JaxRs: <strong>JAX-RS</strong>,
                custom: <a href={'/docs/advanced/extend-point'}><strong>自定义监控</strong></a>,
                br: <br/>
            }}>
                {'Argus目前支持对Mysql, PostgreSQL, Oracle等数据库类型的监控，我们也会尽快适配其它数据库，致力于监控所有数据库。' +
                '我们提供了更自由化的阈值告警配置，支持邮箱，短信，webhook，钉钉，企业微信，飞书机器人等告警通知。{br}'
                }
            </Translate>
        </>
    ),
},
    {
        title: translate({
            message: '拥抱开源'
        }),
        description: (
            <>
                <Translate values={{
                    github: <a href={'https://github.com/zmops/ArgusDBM'}><strong>ArgusDBM Github 代码仓库</strong></a>,
                    gitee: <a href={'https://github.com/zmops/ArgusDBM'}><strong>ArgusDBM Gitee 代码仓库</strong></a>,
                    br: <br/>
                }}>
                    {'ArgusDBM代码开源，非常欢迎任何对此有兴趣的同学参与中来，我们一起进步，丰富的资源文档正在完善中。{br}' +
                    '我们相信开源改变世界！{br}' +
                    '{github} {br}' +
                    '{gitee}'
                    }
                </Translate>
            </>
        ),
    }]

export const friendLinks = [
    {
        img: 'ShenYu_logo.png',
        alt: 'ShenYu',
        url: 'https:// zmops.org/projects/soul/overview/'
    }, {
        img: 'maxkey_logo.png',
        alt: 'MaxKey',
        url: 'https://maxkey.top/'
    }, {
        img: 'tlog_logo.png',
        alt: 'TLog',
        url: 'https://yomahub.com/tlog/'
    }, {
        img: 'hutool_logo.jpg',
        alt: 'Hutool',
        url: 'https://hutool.cn/'
    }, {
        img: 'satoken_logo.png',
        alt: 'Sa-Token',
        url: 'http://sa-token.dev33.cn/'
    }, {
        img: 'justauth_logo.png',
        alt: 'Justauth',
        url: 'https://justauth.wiki/'
    }, {
        img: 'pha_logo.jfif',
        alt: 'pha_api',
        url: 'https://www.phalapi.net/'
    }, {
        img: 'liteflow_logo.png',
        alt: 'LiteFlow',
        url: 'https://yomahub.com/liteflow/'
    }
]

export const mediaPartners = [
    {
        img: ' zmops_qr.png',
        alt: ' zmops',
        url: 'https://mp.weixin.qq.com/s/Q3b7ZE802IMF6MwIPJIGQA'
    },
    {
        img: 'JavaHouDuan_logo.png',
        alt: 'JavaHouDuan',
        url: 'https://mp.weixin.qq.com/s/Ylq51a7Av8ZRuH811xZnDA'
    }
]


export const SetupExample = `
<dependency>
    <groupId>com.usthe.sureness</groupId>
    <artifactId>sureness-core</artifactId>
    <version>1.0.6</version>
</dependency>

compile group: 'com.usthe.sureness', name: 'sureness-core', version: '1.0.6'
`

export const SurenessIntegration = `
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        try {
            SubjectSum subject = SurenessSecurityManager.getInstance().checkIn(servletRequest);
        } catch (IncorrectCredentialsException | UnknownAccountException | ExpiredCredentialsException e1) {
            logger.debug("this request account info is illegal");
            responseWrite(ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED).body(e1.getMessage()), servletResponse);
            return;
        } catch (UnauthorizedException e4) {
            logger.debug("this account can not access this resource");
            responseWrite(ResponseEntity
                    .status(HttpStatus.FORBIDDEN).body(e4.getMessage()), servletResponse);
            return;
        } catch (RuntimeException e) {
            logger.error("other exception happen: ", e);
            responseWrite(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(),
                    servletResponse);
            return;
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
`
