import {defineConfig,UserConfig} from "vitepress";


export default defineConfig({
    title: 'olongfen dev note',
    lastUpdated: true,
    themeConfig: {
        repo: 'olongfen/olongfen.github.io',
        logo:'/logo.png',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
            {text: 'Home',link:'/'},
            {text: 'GOLANG',link:'/go/'},
            {text: 'PYTHON',link:'/python/'},
            {text: 'DOCKER',link:'/docker/'},
            {text: 'LINUX',link:'/linux/'},
            {text: 'K8S',link:'/k8s/'},
            {text: 'SQL',link:'/sql/'},
            {text: 'GIS',link:'/gis/'},
            {text: '数据库系统工程师笔记',link:'/db-system-engineer/'},
        ],
        sidebar: {
            '/go/': [
                {
                    text: 'go快速入门',link:'/go/golang'
                },
                {
                    text: 'go基本排序算法',link:'/go/sort'
                },
                {
                    text: 'go领域驱动入坑',link:'/go/golang_ddd'
                },
                {
                    text: 'go tcp入坑',link:'/go/gotcp'
                },
                {
                    text: '时间包使用',link:'/go/time'
                }
            ],
            '/python/':[
                {text: 'WTI原油数据爬虫',link: '/python/wti_day'},
                {text: '亚马逊商品爬虫',link: '/python/ymx'},
            ],
            '/linux/':[
                {text: 'fedora',link: '/linux/fedora'},
                {text: '常用指令1',link: '/linux/cmd'},
                {text: 'ubuntu22.04系统问题修复日志',link: '/linux/ubuntu'},
                {text: 'ubuntu_服务器日常问题处理备忘录',link: '/linux/ubuntu_服务器日常问题处理备忘录'},
            ],
            '/docker/':[
                {text: 'docker安装',link: '/docker/install'},
                {text: 'docker-compose项目部署',link: '/docker/docker-compose'},
            ],
            '/sql/':[
                {text: 'MYSQL',link: '/sql/mysql/', children:[{text:'基本操作',link:'/sql/mysql/mysql'}]},
                {text: 'POSTGRES',link: '/sql/postgresql/' ,children:[{text:'常用sql',link:'/sql/postgresql/note'}]},
            ],
            '/gis/':[
                {text: 'GIS_Detail',link: '/gis/gis_detail'},
                {text: 'GDAL',link: '/gis/gdal'},
                {text: 'OGR',link: '/gis/ogr'},
                {text: 'spatialite',link: '/gis/spatialite'},
            ],
            '/db-system-engineer/':[
                {text:"第一章计算机系统知识",link: '/db-system-engineer/chapter-one/computer-system'}
            ]

        }
    },
})