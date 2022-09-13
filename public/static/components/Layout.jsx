import Navbar from './navbar';
import Foot from './foot';

function Layout (props) {
    return(
        <div>
            <Navbar logdin={props.log} notlogdin={props.notlog} ></Navbar>
            {props.children}
            <Foot></Foot>
        </div>
    )
}

export default Layout