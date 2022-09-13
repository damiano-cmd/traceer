
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import TerminalLayout from '../../../public/static/components/termin';

export default function Tch (){
    const [urldata, setUrldata] = useState({});
    const router = useRouter()
    useEffect(() => {
        if(router.query.url !== null){
            axios({method: 'post', url: '/api/getUrl', data: {url: router.query.url, token: Cookies.get('token')}}).then(res => {
                if (res.data.status == 1) {
                    setUrldata({h: window.location.origin + "/to/" + router.query.url, to: res.data.to, count: res.data.count, ips: res.data.ips.map(r => {
                        return(<><b>{r['date']}:</b> <Link href={`/terminal/loc/${r['ip']}`}><i>{r['ip']}, </i></Link></> )
                    })})
                } else {
                    setUrldata({h: res.data.status})
                }
            })
        }
    }, [router.query.url])
    return(
        <div className='urls ot'>
        <h1>Url: {urldata.h} </h1>
        <section>
            <p>Destination: {urldata.to} </p>
            <p>Traffic: {urldata.count} clicks </p>
            <p>IP Addresses:</p>
            <p>{urldata.ips}</p>
        </section>
        </div>
    )
}
Tch.LayoutNest = TerminalLayout
