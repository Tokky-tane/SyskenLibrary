import React from 'react';
import './Home.css';

class Home extends React.Component {
    render() {
        return(
            <>
                <h1>Welcome to "Sysken Library" !!</h1>
                <div className="jumpButtons">
                    <button className="jumptoSignup" onClick={()=>{alert("実装までもう少し待ってね")}}>sign up</button>
                    <button className="jumptoSignin" onClick={()=>{window.location.href = '/#/Login'}}>sign in</button>
                </div>
            </>
        );
    }
}

export default Home;