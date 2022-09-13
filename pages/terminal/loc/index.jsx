import { useState } from 'react';
import TerminalLayout from '../../../public/static/components/termin';

export default function Home () {
    const [urlip, setIp] = useState();
    function submit (e) {
        e.preventDefault()
        window.location = `/terminal/loc/${urlip}`
    }
    function change (e) {
        setIp(e.target.value)
    }
    return(<div className='ot'>
        <h1>IP Locator</h1>
        <section>
            <form className='short' onSubmit={submit} >
                <label>Enter IP:</label><input type="text" value={urlip} onChange={change} />
                <button type='submit'>Locate</button>
            </form>
        </section>
    </div>)
}

Home.LayoutNest = TerminalLayout