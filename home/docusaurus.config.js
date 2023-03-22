const path = require('path')

const organizationName = 'zmops' // Usually your GitHub org/username.
const projectName = 'ArgusDBM' // Usually your repo name.
const branch = 'master'
const repoUrl = `https://github.com/zmops/${projectName}`
const editDocRepoUrl = 'https://github.com/zmops/ArgusDBM'
const cdnUrl = null

module.exports = {
    title: 'ArgusDBM',
    tagline: 'Argus 开源数据库一体化监控平台。致力于监控所有数据库',
    url: 'https://zmops.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',
    favicon: '/img/argus.png',
    organizationName,
    projectName,
    customFields: {
        repoUrl,
        cdnUrl
    },
    i18n: {
        defaultLocale: 'zh-cn',
        locales: ['zh-cn'],
    },
    themeConfig: {
        image: '/img/argus.png',
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
                '<font style="font-size: medium; font-weight: bolder">如果您喜欢ArgusDBM,</font> <a target="_blank" style="font-size: medium; font-weight: bolder" rel="noopener noreferrer" href="https://github.com/zmops/ArgusDBM">欢迎在 GitHub </a> <font style="font-size: medium; font-weight: bolder"> 或 </font><a target="_blank" style="font-size: medium; font-weight: bolder" rel="noopener noreferrer" href="https://github.com/zmops/ArgusDBM">Gitee 给我们点赞! </a>⭐️',
            backgroundColor: '#7228B5',
            textColor: '#fafbfc',
            isCloseable: true,
        },
        navbar: {
            title: 'ArgusDBM',
            logo: {
                alt: '开源数据库一体化监控平台',
                src: '/img/argus.png',
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
                    type: 'localeDropdown',
                    position: 'right',
                },
                {
                    href: 'https://github.com/zmops/ArgusDBM',
                    position: 'right',
                    className: 'header-github-link'
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
                            label: '帮助文档',
                            to: 'docs/help/guide'
                        },
                    ],
                },
                {
                    title: '观纵科技',
                    items: [
                        {
                            label: '观纵科技',
                            href: 'https://www.walkingfunny.com/',
                        }
                    ],
                },
                {
                    title: '相关资源',
                    items: [
                        {
                            label: 'Github仓库',
                            href: 'https://github.com/zmops/ArgusDBM',
                        },
                        {
                            label: 'Gitee仓库',
                            href: 'https://github.com/zmops/ArgusDBM',
                        },
                    ],
                },
            ],
            logo: {
                alt: 'Argus 开源数据库一体化监控平台。致力于监控所有数据库',
                src: '/img/argus.png',
                href: 'https://github.com/zmops/ArgusDBM',
            }
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
                        copyright: `Copyright © ${new Date().getFullYear()} Argus, Inc.`,
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
        ]
    ],
    themes: ['@docusaurus/theme-live-codeblock'],
    scripts: []
}
