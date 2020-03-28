import React from 'react';

class Signin extends React.Component {
    ismounted = false;

    constructor(props) {
        super(props);
        this.state = {
            login: {
                email: '',
                pass: '',
            },
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
                    <input className="inEmailad" type="textarea" placeholder="メールアドレスを入力" name="email" value={this.state.login.email} onChange={event => this.set_logininfo(event)}></input>
                    <h3>パスワード</h3>
                    <input className="inPass" type="password" placeholder="パスワードを入力" name="password" value={this.state.login.pass} onChange={event => this.set_logininfo(event)}></input>
                    <div className="loginbutton">
                        <button className="loginbutton" onClick={() => this.logincheck()}>GO</button>
                    </div>
                </div>
            </>
        );
    }

    set_logininfo(event) {
        var logininfo = this.state.login;

        switch (event.target.name) {
            case 'email':
                logininfo.email = event.target.value;
                break;
            case 'password': 
                logininfo.pass = event.target.value;
                break;
            default:
                break;
        }

        this.setState({login: logininfo});
    }

    logincheck() {
        const logindata = { 
                            email: (this.state.login.email),
                            password: (this.state.login.pass)
                          };
        const method = "POST";
        const mode = "cors";
        const body = JSON.stringify(logindata);
        const headers = {
                            'Content-Type': 'application/json',
                        }
                        
        return fetch('http://localhost:3001/login', {method, headers, body, mode})
                .then((response) => {
                    if (response.status === 200) {
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