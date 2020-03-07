import React from 'react';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                email: '',
                pass: '',
            },
            logintoken: '',
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
                    <form>
                        <h3>メールアドレス</h3>
                        <input className="inEmailad" type="textbox" placeholder="メールアドレスを入力" name="email" value={this.state.login.email} onChange={(event) => this.set_logininfo(event)}></input>
                        <h3>パスワード</h3>
                        <input className="inPass" type="password" placeholder="パスワードを入力" name="pass" value={this.state.login.pass} onChange={(event) => this.set_logininfo(event)}></input>
                        <div className="loginbutton">
                            <button className="loginbutton" onClick={() => this.logincheck()}>GO</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }

    set_logininfo(event) {
        var logininfo = this.state.login;

        switch (event.target.name) {
            case 'inemailad':
                logininfo.email = event.target.value;
                break;
            case 'inpass': 
                logininfo.pass = event.target.value;
                break;
            default:
                break;
        }

        this.setState({login: logininfo});
    }

    logincheck() {
        const logindata = { email: (this.state.login.email),
                            pass: (this.state.login.pass)};
        const method = "POST";
        const mode = "cors";
        const body = JSON.stringify(logindata);
        const headers = {
                            'Content-Type': 'application/json',
                            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTeXNrZW5MaWJyYXkiLCJzdWIiOjEsImlhdCI6MTU4MzIzMDI5OSwiZXhwIjoxNTgzMjQxMDk5fQ.bvVrjfOoVtSNB3ldA6Q88FcOEj8_1qlIZkKTvhh28uU',
                        }
        const xhr = new XMLHttpRequest();
                        
        return fetch('http://localhost:3001/login', {method, headers, body, mode})
                        .then(() => {
                            
                            alert(xhr.status);
                            if (xhr.status === 200) {
                                var gettoken = xhr.responseText;
                                this.setState({token: gettoken});
                            }
                            else {
                                alert("メールアドレスまたはパスワードが違います\n");
                            }
                        })
                        .catch(() => {alert(xhr.status);})
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