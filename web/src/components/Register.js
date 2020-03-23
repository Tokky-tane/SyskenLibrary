import React from 'react';
import './Register.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Register extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        title: '',
        author: '',
        isbn: '',
      };

      this.submitbookform = this.submitbookform.bind(this);
      this.submitnewbook = this.submitnewbook.bind(this);
      this.postnewbook = this.postnewbook.bind(this);
  }

  submitbookform() {
    return ( 
      <div className="newbookform">
        <h2>登録する本のデータを入力してください</h2>
        <form id="newbook">
          <h3>タイトル</h3>
          <TextField required={true} type='text' value={this.state.title} onChange={(event) => this.submitnewbook('title', event)}/>
          <h3>著者</h3>
          <TextField required={true} type='text' value={this.state.author} onChange={(event) => this.submitnewbook('author', event)}/>
          <h3>isbnコード</h3>
          <TextField required={false} type='text' value={this.state.isbn} onChange={(event) => this.submitnewbook('isbn', event)}/>
          <br />
          <div className="postbutton">
          <Button className="postbutton" onClick={() => this.submitConfirm()}>登録</Button>
          </div>
        </form>
      </div>
    );
  }

  submitConfirm() {
    var ischecked = 1;
    if(this.state.title === '' || this.state.author === '')
    {
      alert("タイトルまたは著者名は必ず入力する必要があります...");
      ischecked = 0;
    }

    if(ischecked === 1) {
      if(window.confirm("このデータで登録します。よろしいですか?\ntitle : "+this.state.title+"\nauthor: "+this.state.author+"\nisbn  : "+this.state.isbn)) {
        this.postnewbook();
      }
    }
  }

  submitnewbook(name, event) {
    var changestate = event.target.value;
    this.setState({[name]: changestate});
  }
    
  postnewbook() {
    const newbookdata = { title: (this.state.title),
                          author: (this.state.author),
                          isbn: (this.state.isbn) || null ,
                        };
    const method = "POST";
    const mode = "cors";
    const body = JSON.stringify(newbookdata);
    const headers = {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
    var ismovepage = 0               
    return fetch('http://localhost:3001/books', {method, headers, body, mode})
                    .then((res) => {
                      if(res.ok){
                        ismovepage = 1;
                        alert("本の登録が完了しました!");
                      }
                      else if(res.status === 401){
                        alert("ログイン有効期限が過ぎています。\nもう一度ログインをやり直してください。")
                      }
                      else {
                        alert("本の登録に失敗しました...");
                      }

                      if(ismovepage === 1){
                        window.location.assign('/#/List');
                      }
                    })
                    .catch((err) => {
                      alert(err);
                    })
  }

  render() {
      return(
          <div>
              <this.submitbookform />
          </div>
      );
  }
}
export default Register;