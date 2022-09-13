import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import TerminalLayout from '../../public/static/components/termin';

function logout () {
    sessionStorage.clear()
    sessionStorage.setItem('status', 0)
    Cookies.remove('token')
    window.location ='/'
}

export default function Custom (){
    const [error, setError] = useState('')
    const [password, setPass] = useState('')
    const [newMail, setMail] = useState('')
    const [newPass, setNewPass] = useState('')
    const [data0, setData0] = useState('')
    useEffect(() => {
        setData0(sessionStorage.getItem('email'))
    })
    function deleteAcc () {
        axios({method: 'post', url: '/api/delete', data: {token: Cookies.get('token')}}).then(res => {
            if (res.data.status == 1) {
                sessionStorage.clear()
                sessionStorage.setItem('status', 0)
                Cookies.remove('token')
                window.location ='/'
            } else {
                setError(res.data.status)
            }
        })
    }
    function subMail (e) {
        e.preventDefault();
        axios({method: 'post', url: '/api/change', data: {token: Cookies.get('token'), email: newMail, password: password}}).then(res => {
            if (res.data.status == 1) {
                sessionStorage.setItem('email', res.data.email)
                setError('Change sucsessful')
                location.reload()
            } else {
                setError(res.data.status)
            }
        })
    }
    function subPass (e) {
        e.preventDefault();
        axios({method: 'post', url: '/api/change', data: {token: Cookies.get('token'), newPassword: newPass, password: password}}).then(res => {
            if (res.data.status == 1) {
                setError('Change sucsessful')
            } else {
                setError(res.data.status)
            }
        })
    }
    function chMail (e) {
        setMail(e.target.value)
    }
    function chNewpass (e) {
        setNewPass(e.target.value)
    }
    function chPass (e) {
        setPass(e.target.value)
    }
    return(
        <div className='ot'>
        <h1>Account</h1>
        <section className='custom'>
            <p>Email: {data0} </p>
            <hr className='hr'/>
            <p>{error}</p>
            <p>Required to be abel to change the things below</p>
            <form>
                <div><label>Your curent password:  </label><input type="text" value={password} onChange={chPass} /></div>
            </form>
            <hr className='hr'/>
            <p>Change Email </p> 
            <form onSubmit={subMail}>
                <div><label>Your new email:  </label><input type="text" value={newMail} onChange={chMail} /></div>
                <button type='submit'>Change</button>
            </form>
            <hr className='hr'/>
            <p>Change Password</p> 
            <form onSubmit={subPass}>
                <div><label>Your new password:  </label><input type="text" value={newPass} onChange={chNewpass} /></div>
                <button type='submit'>Change</button>
            </form>
            <hr className='hr'/>
            <p>Logout or DELETE account</p>
            <img src="/static/quit.png" alt="#" className='yellowButton' onClick={logout} />
            <img src="/static/NoUser.png" alt="#" className='redButton yellowButton' onClick={deleteAcc} />
        </section>
        </div>
    )
}

Custom.LayoutNest = TerminalLayout