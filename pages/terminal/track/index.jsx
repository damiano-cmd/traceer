import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import TerminalLayout from '../../../public/static/components/termin';

export default function Url (){
    const [urlsArr, setUrlsArr] = useState([])
    function delUrl (e) {
        axios({method: 'post', url:'/api/delUrl', data : {url: e.target.value, token: Cookies.get('token')}}).then(res => {
            let newurlArr = [];
            for (let key in urlsArr) {
                if (urlsArr[key] !== e.target.value) {
                    newurlArr.push(urlsArr[key])
                }
            }
            setUrlsArr(newurlArr)
            sessionStorage.setItem('urls', newurlArr)
        })
    }
    useEffect(() => {
        setUrlsArr(sessionStorage.getItem('urls').split(','))
    })
    return(
        <div className='urls ot'>
        <h1>Urls</h1>
        <section>
            {
                urlsArr.map(r => {
                    if (sessionStorage.getItem('urls') == '') {
                        return(<p>no urls</p>)
                    } else {
                        if (r !== '') {
                            return (
                                <article key={r}>
                                    <Link href={'/to/[url]'} as={`/to/${r}`}>{"/to/" + r}</Link>
                                    <a href={`/terminal/track/${r}`}><button>View</button></a>
                                    <button onClick={delUrl} value={r} className='delBut'>Delete</button>
                                </article>
                            )
                        }
                    }
                })
            }
        </section>
        </div>
    )
}
Url.LayoutNest = TerminalLayout
