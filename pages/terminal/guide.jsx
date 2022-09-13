import TerminalLayout from '../../public/static/components/termin'

export default function Guide (){
    return(
        <div className='ot'>
        <h1>Guide</h1>
        <section>
            <p className='dt'>
                <b style={{color: 'red'}}>!!!This site can be used for trasing IPs of certian individuals for nefarious purposes 
                this site or the owner does not encourage or support this type of behavior what you choose ti 
                do in this site is up to you and you soul responsibility!!!</b>
                <br/><br/>
                Guide:
                <br/>
                <br/>
                Track tab is used to see your masked urls, you can delete them(the red Delete button) and see the IPs of people that  
                clicked on them(the green button View),on the View page you are given a list IPs that clicked on the url, by clicking  
                the IPs you can geolocate them.
                <br/>
                <br/>
                The Shorten tab is used to shorten any !VALIDE! url on the net and it gets added to the Track tab url list.
                <br/><br/>
                Account tab contains the account info the the abillity to change the the email and password.
                <br/>
                <br/>
                IP Locator tab is used to find the geolocation of a IP address. <br/>
                Just enter the valide IP address and it vill try to find its location. <br/>
            </p>
        </section>
        </div>
    )
}

Guide.LayoutNest = TerminalLayout;