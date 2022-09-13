import axios from 'axios';
import { useRouter } from 'next/router';
import {useState, useEffect} from 'react';
import TerminalLayout from '../../../public/static/components/termin';

export default function Ip () {
    const router = useRouter();
    const { ipadd } = router.query
    const [dat, setData] = useState({})
    useEffect(() => {
        if (ipadd !== undefined) {
            axios({method: 'post', url: '/api/loc', data: {ip: ipadd}}).then(res => {
                setData(res.data)
                console.log(res.data)
            })
        }}, [ipadd])
    return(<div className='ot'>
        <h1>IP: {ipadd}</h1>
        <section>
        <p>City: {dat.city}</p>
        <p>Region: {dat.region} </p>
        <p>Country: {dat.country} </p>
        <p>Latitude: {dat.latitude} </p>
        <p>Longitude: {dat.longitude} </p>
        </section>
    </div>)
}

Ip.LayoutNest = TerminalLayout