import '../public/static/styles/styles.css';
import Layout from '../public/static/components/Layout';
import Head from 'next/head';
import Cookies from 'js-cookie'
import axios from 'axios';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
    const [logd, setLog] = useState({});
    const [notlogd, setNotlog] = useState({});
    useEffect(() => {
            if (Cookies.get('token') == undefined) {
                console.log('no login')
                sessionStorage.setItem('status', 0)
                setLog({display: 'none'})
                setNotlog({display: 'block'})
            } else {
                axios({method: 'post', url: '/api/logdin', data: {token: Cookies.get('token')}}).then((res) => {
                    console.log('login')
                    if (res.data.status == 1) {
                        console.log('logdin')
                        sessionStorage.setItem('status', 1)
                        sessionStorage.setItem('email', res.data.email)
                        sessionStorage.setItem('urls', res.data.urls)
                        setLog({display: 'block'})
                        setNotlog({display: 'none'})
                    } else {
                        console.log('no user')
                        sessionStorage.setItem('status', 0)
                        setLog({display: 'none'})
                        setNotlog({display: 'block'})
                    }
                })
            }
            if("serviceWorker" in navigator) {
                window.addEventListener("load", function () {
                 navigator.serviceWorker.register("/sw.js")
                });
            }
    }, [])
    const LayoutNest = Component.LayoutNest || EmptyLayout;
    return (
        <Layout log={logd} notlog={notlogd} >
            <Head>
                <title>Traceer</title>
                <link rel='icon' sizes="32x32" href='/static/favicon.png' />
                <link rel="manifest" href="/manifest.json"></link>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="A IP tracking app"/>
                <meta name="theme-color" content="#0066ff"/>
                <link rel="apple-touch-icon" href="/icons/apple-icon-180.png"></link>
                <meta name="apple-mobile-web-app-capable" content="yes"></meta>
                <link rel="apple-touch-startup-image" href="/icons/apple-splash-2048-2732.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ortrait)"></link>
                <link rel="apple-touch-startup-image" href="/icons/apple-splash-2732-2048.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-andscape)"></link>
                <link rel="apple-touch-startup-image" href="/icons/apple-splash-1668-2388.jpg" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-rrtrait)"></link>
                <link rel="apple-touch-startup-image" href="/icons/apple-splash-2388-1668.jpg" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-rndscape)"></link>
            </Head>
            <LayoutNest>
                <Component {...pageProps} log={logd} notlog={notlogd} />
            </LayoutNest>
        </Layout>
    )
}

const EmptyLayout = ({ children }) => <>{children}</>

export default MyApp