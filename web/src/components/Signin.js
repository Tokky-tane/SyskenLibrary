import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Signin extends React.Component {
    ismounted = false;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            token: '',
        };
        this.render_loginform = this.render_loginform.bind(this);
        this.set_logininfo = this.set_logininfo.bind(this);
        this.logincheck = this.logincheck.bind(this);
    }

    render_loginform() {
        return(
            <>
                <div className="pagetitle">
                    <h2>ログイン</h2>
                </div>
                <div className="Loginform">
                    <h3>メールアドレス</h3>
                    <TextField 
                        required={true} 
                        type='text' 
                        value={this.state.email} 
                        onChange={(event) => this.set_logininfo('email', event)}
                    />
                    <h3>パスワード</h3>
                    <TextField 
                        required={true} 
                        type='password' 
                        value={this.state.pass} 
                        onChange={(event) => this.set_logininfo('pass', event)}
                    />
                    <div className="loginbutton">
                        <Button className="loginbutton" onClick={() => this.logincheck()}>GO</Button>
                    </div>
                </div>
            </>
        );
    }

    set_logininfo(name, event) {
        var logininfo = event.target.value;
        this.setState({[name]: logininfo});
    }

    logincheck() {
        const logindata = { 
                            email: (this.state.email),
                            password: (this.state.pass)
                          };
        const method = "POST";
        const mode = "cors";
        const body = JSON.stringify(logindata);
        const headers = {
                            'Content-Type': 'application/json',
                        }
                        
        return fetch('http://localhost:3001/login', {method, headers, body, mode})
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            this.setState({token: data});
                            this.ismounted = true;
                            if(this.ismounted === true){
                                this.ismounted = false;
                                this.props.settoken(this.state.token);
                                window.location.assign('/#/List'); 
                            }
                        });
                    }
                    else {
                        alert("メールアドレスまたはパスワードが違います\n");
                    }
                })
                .catch((error) => {
                    alert("認証に失敗しました...\n" + error);
                })
    }

    render() {
        return(
            <>
                <this.render_loginform />
            </>
        );
    }
}

export default Signin;