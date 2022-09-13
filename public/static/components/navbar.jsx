import  Link  from 'next/link';
import Cookies from 'js-cookie';
import {useState} from 'react';

function toHome () {
    window.location = '/'
}
function toAcc () {
    window.location = '/terminal/account'
}
function logout () {
    sessionStorage.clear()
    sessionStorage.setItem('status', 0)
    Cookies.remove('token')
    window.location ='/'
}

function Navbar ({logdin, notlogdin}){
    const [dropDown, setDown] = useState(-80)
    function slide () {
        if (dropDown == 55) {
            setDown(-80)
        } else {
            setDown(55)
        }
    }
    return(
        <>
            <div id="logot" style={{top: dropDown}}>
                <button onClick={toAcc} className='greenbut'>To Account</button>
                <img src="/static/quit.png" style={{width: 36, height: 36}} alt="#" className='yellowButton' onClick={logout} />
            </div>
            <header className='nav'>
                <img src="/static/Logo.png" alt='#' onClick={toHome} />
                <div className='login' style={notlogdin}>
                    <Link href="/sign"><button>Sign Up</button></Link>
                    <Link href="/sign"><button>Login</button></Link>
                </div>
                <img className='JD' src="/static/JhonDoe.png" style={logdin} onClick={slide} />
            </header>
        </>
    )
}

export default Navbar