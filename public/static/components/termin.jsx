import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect } from 'react'
    
export default function TerminalLayout ({children}) {
    useEffect(() => {
        if (Cookies.get('token') == null) {
            window.location = '/sign'
        }
    }, [])
    return(
        <div className='terminal'>   
            <section className='navig'>
                <h2>Terminal</h2>
                <hr/>
                <Link href='/terminal/guide'>
                    <div>
                        <a>Guide</a>
                    </div>
                </Link>
                <hr/>
                <Link href='/terminal/track'>
                    <div>
                        <a>Track</a>
                    </div>
                </Link>
                <hr/>
                <Link href='/terminal/short'>
                    <div>
                        <a>Shorten</a>
                    </div>
                </Link>
                <hr/>
                <Link href='/terminal/account'>
                    <div>
                        <a>Account</a>
                    </div>
                </Link>
                <hr/>
                <Link href='/terminal/loc'>
                    <div>
                        <a>IP Locator</a>
                    </div>
                </Link>
                <hr/>
            </section>
            <section className='output'>
                {children}
            </section> 
        </div>
    )
}
