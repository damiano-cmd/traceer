import Link from 'next/link';

function Starting ({log, notlog}){
    return(
        <main>
            <div className='mainbb'>
                <div className='lt'>
                    <section>
                        <h2>Shoten URLs and track the traffic</h2>
                        <div>
                            <Link href='/sign'><button style={notlog}>Sign Up</button></Link>
                            <Link href='/terminal/guide'><button style={log}>To Terminal</button></Link>
                        </div>
                    </section>
                </div>
                <img src="/static/mainBG.jpg" alt=""/>
            </div>
            <div className="subsum">
                <div></div>
                <div>
                    <h1>What is this site</h1>
                    <p className='p'>
                        This site is a platform that can help you shorten urls 
                        and track the IP Addresses of people that click on them, 
                        just sign up, shorten, track. <br/><br/>
                        NOTE: This platform or the plaforms creator is not liable for 
                        your actions, you can use this platform's to its full extent br 
                        but your action are your own. I'm not resposible for any 
                        misuse of this platform's features, its all your responsibility. 
                        <br/><br/><br/>
                        Read the Terms and Conditions and Privacy Polacy.
                        <br/><br/><br/>
                    </p>
                </div>
                <div></div>
            </div>
        </main>
    );
};

export default Starting