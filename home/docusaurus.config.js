const path = require('path')

const organizationName = 'tomsun28' // Usually your GitHub org/user name.
const projectName = 'bootshiro' // Usually your repo name.
const branch = 'master'
const repoUrl = `https://gitee.com/tomsun28/${projectName}`
const editDocRepoUrl = 'https://github.com/dromara/hertzbeat'
const cdnUrl = 'https://cdn.jsdelivr.net/gh/dromara/hertzbeat@gh-pages/'

module.exports = {
    title: 'TANCLOUD探云',
    tagline: '易用友好的高性能监控云',
    url: 'https://hertzbeat.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',
    favicon: '/img/tancloud-logo.svg',
    organizationName,
    projectName,
    customFields: {
        repoUrl,
        cdnUrl
    },
    i18n: {
        defaultLocale: 'zh-cn',
        locales: ['zh-cn', 'en'],
    },
    themeConfig: {
        image: '/img/tancloud-logo.svg',
        liveCodeBlock: {
            playgroundPosition: 'bottom',
        },
        metadata: [
            {
                name: 'keywords',
                content: 'monitor, apm, 监控, 开源, uptime, opensource',
            },
        ],
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        prism: {
            theme: require('prism-react-renderer/themes/github'),
            darkTheme: require('prism-react-renderer/themes/dracula'),
            additionalLanguages: ['java'],
        },
        algolia: {
            apiKey: '9298a61d23b2842ce077324283fb0abb',
            indexName: 'hertzbeat',
            appId: 'JMM99UL1H5',
            contextualSearch: true,
        },
        announcementBar: {
            id: "github-star",
            content:
                '<font style="font-size: medium; font-weight: bolder">如果您喜欢TANCLOUD的开源产品HertzBeat,</font> <a target="_blank" style="font-size: medium; font-weight: bolder" rel="noopener noreferrer" href="https://github.com/dromara/hertzbeat">欢迎在 GitHub </a> <font style="font-size: medium; font-weight: bolder"> 或 </font><a target="_blank" style="font-size: medium; font-weight: bolder" rel="noopener noreferrer" href="https://gitee.com/dromara/hertzbeat">Gitee 给我们点赞! </a>⭐️',
            backgroundColor: '#7228B5',
            textColor: '#fafbfc',
            isCloseable: true,
        },
        navbar: {
            title: 'TANCLOUD',
            logo: {
                alt: '易用友好的高性能监控云',
                src: '/img/tancloud-logo.svg',
            },
            items: [
                {
                    label: '首页',
                    position: 'left',
                    to: '/',
                },
                {
                    label: '文档中心',
                    position: 'left',
                    to: 'docs/',
                },
                {
                    label: '博客',
                    position: 'left',
                    to: 'blog/',
                },
                {
                    label: '讨论交流',
                    position: 'left',
                    to: 'docs/others/contact',
                },
                {
                    label: '云服务SAAS',
                    position: 'left',
                    href: 'https://console.tancloud.cn',
                },
                {
                    label: '私有化企业版',
                    position: 'left',
                    to: 'docs/others/private',
                },
                {
                    label: '其它',
                    position: 'left',
                    items: [
                        {
                            label: '设计文档',
                            to: 'docs/others/design',
                        },
                        {
                            label: '赞助我们',
                            to: 'docs/others/sponsor',
                        },
                        {
                            label: '相关资源',
                            to: 'docs/others/resource',
                        },
                    ],
                },
                {
                    type: 'docsVersionDropdown',
                    position: 'right',
                    // dropdownItemsAfter: [{to: '/versions', label: '所有版本'}],
                    dropdownActiveClassDisabled: true,
                },
                {
                    type: 'localeDropdown',
                    position: 'right',
                },
                {
                    label: '登录/注册',
                    href: 'https://console.tancloud.cn',
                    position: 'right',
                    className: 'header-console-link'
                },
            ],
        },
        footer: {
            style: 'light',
            links: [
                {
                    title: '产品介绍',
                    items: [
                        {
                            label: '使用介绍',
                            to: 'docs/',
                        },
                        {
                            label: '安装文档',
                            to: 'docs/start/quickstart',
                        },
                        {
                            label: '自定义监控',
                            to: 'docs/advanced/extend-point'
                        },
                        {
                            label: '帮助文档',
                            to: 'docs/help/guide'
                        },
                    ],
                },
                {
                    title: '探云科技',
                    items: [
                        {
                            label: '交流联系',
                            to: 'docs/others/contact',
                        },
                        {
                            label: '社区网站',
                            href: 'https://support.qq.com/products/379369',
                        },
                        {
                            label: '我们的故事',
                            href: 'https://support.qq.com/products/379369/team',
                        },
                        {
                            label: 'HertzBeat赫兹跳动',
                            href: 'https://hertzbeat.com',
                        }
                    ],
                },
                {
                    title: '相关资源',
                    items: [
                        {
                            label: 'Github仓库',
                            href: 'https://github.com/dromara/hertzbeat',
                        },
                        {
                            label: 'Gitee仓库',
                            href: 'https://gitee.com/dromara/hertzbeat',
                        },
                        {
                            label: '相关资源',
                            to: 'docs/others/resource',
                        },
                    ],
                },
            ],
            logo: {
                alt: 'TANCLOUD探云-易用友好的高性能监控云',
                src: '/img/wechat.png',
                href: 'https://tancloud.cn',
            },
            copyright: '<a target="_blank" href="https://beian.miit.gov.cn/">蜀ICP备2022002218号</a>'
                + ` | Copyright TANCLOUD © 2021-${new Date().getFullYear()}`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.json'),
                    // Please change this to your repo.
                    editUrl: `${editDocRepoUrl}/edit/${branch}/home/`,
                    editLocalizedFiles: true,
                    remarkPlugins: [
                        [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
                    ],
                    lastVersion: 'current',
                    versions: {
                        current: {
                            label: 'v1.1.x',
                            path: '',
                        }
                    }
                },
                blog: {
                    showReadingTime: true,
                    postsPerPage: 1,
                    feedOptions: {
                        type: 'all',
                        copyright: `Copyright © ${new Date().getFullYear()} TANCLOUD, Inc.`,
                    },
                    // Please change this to your repo.
                    editUrl: `${editDocRepoUrl}/edit/${branch}/home/`,
                    editLocalizedFiles: true,
                    blogSidebarCount: 'ALL'
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                }
            },
        ],
    ],
    plugins: [
        [
            '@docusaurus/plugin-client-redirects',
            {
                fromExtensions: ['html'],
            }
        ],
        '@docusaurus/plugin-ideal-image',
        [
            '@docusaurus/plugin-pwa',
            {
                debug: false,
                offlineModeActivationStrategies: ['appInstalled', 'queryString'],
                // swRegister: false,
                swCustom: path.resolve(__dirname, 'src/sw.js'),
                pwaHead: [
                    {
                        tagName: 'link',
                        rel: 'icon',
                        href: 'img/tancloud-logo.svg',
                    },
                    {
                        tagName: 'link',
                        rel: 'manifest',
                        href: 'manifest.json',
                    },
                    {
                        tagName: 'meta',
                        name: 'theme-color',
                        content: 'rgb(234, 90, 7)',
                    },
                    {
                        tagName: 'meta',
                        name: 'apple-mobile-web-app-capable',
                        content: 'yes',
                    },
                    {
                        tagName: 'meta',
                        name: 'apple-mobile-web-app-status-bar-style',
                        content: '#000',
                    },
                    {
                        tagName: 'link',
                        rel: 'apple-touch-icon',
                        href: '/img/tancloud-logo.svg',
                    },
                    {
                        tagName: 'link',
                        rel: 'mask-icon',
                        href: '/img/tancloud-logo.svg',
                        color: 'rgb(234, 90, 7)',
                    },
                    {
                        tagName: 'meta',
                        name: 'msapplication-TileImage',
                        content: 'img/tancloud-logo.svg',
                    },
                    {
                        tagName: 'meta',
                        name: 'msapplication-TileColor',
                        content: '#000',
                    },
                ],
            },
        ],
    ],
    themes: ['@docusaurus/theme-live-codeblock'],
    scripts: [
        {
            src: 'https://hm.baidu.com/hm.js?b4fddf8425ec70c40aa0e7b64382fecf',
            async: true
        }
    ]
}
