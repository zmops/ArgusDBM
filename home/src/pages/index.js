import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import CodeBlock from '@theme/CodeBlock'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Translate, {translate} from '@docusaurus/Translate';

import Feature from './components/Feature'
import Section from './components/Section'
import cdnTransfer from '../CdnTransfer'

import styles from './styles.module.css'
import { features} from '../constants'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Navigation, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Home() {
    const context = useDocusaurusContext()
    const {siteConfig = {}} = context
    return (
        <Layout
            title={`${siteConfig.title} · ${siteConfig.tagline}`}
            description={`${siteConfig.tagline}`}>
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">
                        <img style={{width: '500px', marginTop: '100px'}} src={cdnTransfer('img/tancloud-brand.svg')} alt={'#'}/>
                    </h1>
                    <p className="hero__subtitle"><Translate>易用友好的高性能监控云</Translate></p>
                    <div className={styles.social}>
                        <a href="https://gitter.im/hertzbeat/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge"><img src={'https://badges.gitter.im/hertzbeat/community.svg'} alt={''}/></a>
                        <a href="https://console.tancloud.cn"><img src={cdnTransfer('img/badge/web-monitor.svg')} alt={''}/></a>
                        <a href="https://console.tancloud.cn"><img src={cdnTransfer('img/badge/ping-connect.svg')} alt={''}/></a>
                        <a href="https://console.tancloud.cn"><img src={cdnTransfer('img/badge/port-available.svg')} alt={''}/></a>
                        <a href="https://console.tancloud.cn"><img src={cdnTransfer('img/badge/database-monitor.svg')} alt={''}/></a>
                        <a href="https://console.tancloud.cn"><img src={cdnTransfer('img/badge/os-monitor.svg')} alt={''}/></a>
                        <a href="https://console.tancloud.cn"><img src={cdnTransfer('img/badge/custom-monitor.svg')} alt={''}/></a>
                        <a href="https://console.tancloud.cn"><img src={cdnTransfer('img/badge/threshold.svg')} alt={''}/></a>
                        <a href="https://console.tancloud.cn"><img src={cdnTransfer('img/badge/alert.svg')} alt={''}/></a>
                    </div>
                    <div className={styles.buttons}>
                        <Link
                            to="https://console.tancloud.cn"
                            className={clsx(
                                'button button--primary button--lg',
                                styles.getStarted,
                            )}>
                            <Translate>即刻登录免费使用</Translate>
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                <div className={styles.sectionDashboard}>
                    <Swiper
                        modules={[Autoplay, EffectFade, Navigation]}
                        watchSlidesProgress={true}
                        navigation={{
                            nextEl: '.user-swiper-button-next',
                            prevEl: '.user-swiper-button-prev',
                        }}
                        grabCursor
                        // 轮播下用这个效果会失效
                        // effect={'fade'}
                        // fadeEffect={{
                        //   crossFade: true
                        // }}
                        // slidesPerView={1}
                        // 自动轮播
                        loop={true}
                        speed={0}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            waitForTransition: false,
                        }}
                    >
                        <SwiperSlide>
                            <img
                                style={{ width: '1000px', display: 'block', margin: '0 auto' }}
                                src={useBaseUrl('/img/home/1.png')}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                style={{ width: '1000px', display: 'block', margin: '0 auto' }}
                                src={useBaseUrl('/img/home/9.png')}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                style={{ width: '1000px', display: 'block', margin: '0 auto' }}
                                src={useBaseUrl('/img/home/2.png')}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                style={{ width: '1000px', display: 'block', margin: '0 auto' }}
                                src={useBaseUrl('/img/home/3.png')}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                style={{ width: '1000px', display: 'block', margin: '0 auto' }}
                                src={useBaseUrl('/img/home/4.png')}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                style={{ width: '1000px', display: 'block', margin: '0 auto' }}
                                src={useBaseUrl('/img/home/5.png')}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                style={{ width: '1000px', display: 'block', margin: '0 auto' }}
                                src={useBaseUrl('/img/home/6.png')}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                style={{ width: '1000px', display: 'block', margin: '0 auto' }}
                                src={useBaseUrl('/img/home/7.png')}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                style={{ width: '1000px', display: 'block', margin: '0 auto' }}
                                src={useBaseUrl('/img/home/8.png')}
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div
                    className="swiper-button-prev user-swiper-button-prev"
                    style={{top: '880px', left: '50px', color: '#000033'}}
                />
                <div
                    className="swiper-button-next user-swiper-button-next"
                    style={{top: '880px', right: '50px', color: '#000033'}}
                />
                {features && features.length > 0 && (
                    <Section isDark>
                        {features.map((props, idx) => (
                            <Feature key={idx} {...props} />
                        ))}
                    </Section>
                )}

                {/*who is using*/}
                {/*<Section>*/}
                {/*    <LogoCarousel logos={logos}></LogoCarousel>*/}
                {/*</Section>*/}

                {/*Friend Links*/}
                {/*<Section>*/}
                {/*    <LogoCarousel logos={friendLinks} headerTitle={translate({message: 'Friend Links'})}></LogoCarousel>*/}
                {/*</Section>*/}
                {/*/!*Media Partners*!/*/}
                {/*<Section>*/}
                {/*    <LogoCarousel logos={mediaPartners} headerTitle={translate({message: 'Media Partners'})}></LogoCarousel>*/}
                {/*</Section>*/}
            </main>
        </Layout>
    )
}

export default Home
