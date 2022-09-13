import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import TerminalLayout from '../../public/static/components/termin';

export default function Shorten (){
    const [newurl, setNewurl] = useState('')
    const [output, setOutput] = useState('')
    const changeUrl = (e) => {
        setNewurl(e.target.value)
    }
    const makeNewurl = (e) => {
        e.preventDefault();
        axios({method: 'post', url: '/api/mkurl', data: {to: newurl, token: Cookies.get('token')}}).then((res) => {
            if (res.data.status == 1) {
                setOutput(window.location.origin + '/to/' +res.data.url)
                sessionStorage.setItem( 'urls', sessionStorage.getItem('urls') + ',' + res.data.url )
            } else {
                setOutput(res.data.status)
            }
        })
    }
    return(
        <div className='ot'>
        <h1>Shorten</h1>
        <section>
            <form className='short' onSubmit={makeNewurl} >
                <div>
                    <label>Url:</label>
                    <input type="text" value={newurl} onChange={changeUrl} />
                    <button type='submit'>Shorten</button>
                </div>
                <div>
                    <p className='dt'>{output}</p>
                </div>
            </form>
        </section>
        </div>
    )
}

Shorten.LayoutNest = TerminalLayout