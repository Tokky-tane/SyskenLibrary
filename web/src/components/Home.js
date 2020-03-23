import React from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';

class Home extends React.Component {
    render() {
        return(
            <>
                <h1>Welcome to "Sysken Library" !!</h1>
                <div className="jumpButtons">
                    <Button className="jumptoSignup" onClick={()=>{alert("実装までもう少し待ってね")}}>sign up</Button>
                    <Button className="jumptoSignin" onClick={()=>{window.location.href = '/#/Login'}}>sign in</Button>
                </div>
            </>
        );
    }
}

export default Home;