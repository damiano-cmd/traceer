import  { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Sign () {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [confirm, setConfirm] = useState('')
    const [check, setCheck] = useState(false)
    const [err, setErr] = useState('')
    useEffect(() => {
        if (sessionStorage.getItem('status') == 1) {
            window.location = '/terminal/account'
        }
    }, [])
    const changeConfirm = (e) => {
        setConfirm(e.target.value)
    }
    const changeMail = (e) => {
        setEmail(e.target.value)
    };
    const changePass = (e) => {
        setPass(e.target.value)
    };
    const checkCheck = () => {
        if (check == false) {
            setCheck(true)
        } else {
            setCheck(false)
        };
    };
    const submit = (e) => {
        e.preventDefault();
        let registery = {email: email, password: password}
        if (email !== '' && password !== '') {
            if (check == true) {
                if (confirm === password) {
                    axios({method: 'post', url: '/api/register', data: registery}).then(res => {
                        if (res.data.status === 1) {
                            sessionStorage.setItem('status', 1)
                            sessionStorage.setItem('email', res.data.email)
                            sessionStorage.setItem('urls', res.data.urls)
                            Cookies.set('token', res.data.token, { expires: 30 })
                            window.location = '/terminal/guide'
                        } else {
                            setErr(res.data.status)
                        }
                    })
                } else {
                    setErr('Passwords dont match!!!')
                }
            } else if (check == false) {
                axios({method: 'post', url: '/api/login', data: registery}).then(res => {
                    if (res.data.status == 1) {
                        sessionStorage.setItem('status', 1)
                        sessionStorage.setItem('email', res.data.email)
                        sessionStorage.setItem('urls', res.data.urls)
                        Cookies.set('token', res.data.token, { expires: 30 })
                        window.location = '/terminal/guide'
                    } else {
                        setErr(res.data.status)
                    }
                })
            }
        } else {
            setErr('Not valid email or password!!!')
        }
    };
    return(
        <div className='form'>
            <form onSubmit={submit}>
                <label>To Login</label>
                <div>
                    <label>Email:  </label>
                    <input type="text" value={email} onChange={changeMail} />
                </div>
                <div>
                    <label>Password:  </label>
                    <input type="password" value={password} onChange={changePass} />
                </div>
                <label>To Register</label>
                <div>
                    <label>Confirm Password:  </label>
                    <input type="password" value={confirm} onChange={changeConfirm} />
                </div>
                <div>
                    <input type="checkbox" checked={check} onChange={checkCheck} className='check' />
                    <label>You agree to <a href="/tac.html">Terms and Conditions</a>
                        and want to REGISTER</label>
                </div>
                <button type='submit'>Advance</button>
                <p className='red-text'>{err}</p>
            </form>
        </div>
    );
};

export default Sign