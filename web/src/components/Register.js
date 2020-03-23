import React from 'react';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          newbooks: {
              title: '',
              author: '',
              isbn: '',
          },
      };
      this.submitbookform = this.submitbookform.bind(this);
      this.submitnewbook = this.submitnewbook.bind(this);
      this.postnewbook = this.postnewbook.bind(this);
  }

  submitbookform() {
    return (
      <div className="newbookform">
          <form id="newbook">
            <h3>タイトル</h3>
            <input className="inputstring" name="title" type="textbox" value={this.state.newbooks.title} onChange={event => this.submitnewbook(event)}></input>
            <h3>著者</h3>
            <input className="inputstring" name="author" type="textbox" value={this.state.newbooks.author} onChange={event => this.submitnewbook(event)}></input>
            <h3>isbnコード</h3>
            <input className="inputnumber" name="isbn" type="textbox" value={this.state.newbooks.isbn} onChange={event => this.submitnewbook(event)}></input>
            <br />
            <div className="postbutton">
            <button className="postbutton" onClick={() => this.postnewbook()}>登録</button>
            </div>
        </form>
      </div>
    );
  }

  submitnewbook(event) {
    var book = this.state.newbooks;

    switch (event.target.name)
    {
      case 'title':
        book.title = event.target.value;
        break;
      case 'author':
        book.author = event.target.value;
        break;
      case 'isbn':
        book.isbn = event.target.value;
        break;
      default :
        break;
    }

    this.setState({newbooks: book});
  }
    
  postnewbook() {
    const newbookdata = { title: (this.state.newbooks.title),
                          author: (this.state.newbooks.author),
                          isbn: (this.state.newbooks.isbn) || null ,
                        };
    const method = "POST";
    const mode = "cors";
    const body = JSON.stringify(newbookdata);
    const headers = {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
    var ismovepage = 0               
                    console.log(headers);
    return fetch('http://localhost:3001/books', {method, headers, body, mode})
                    .then((res) => {
                      alert(res.status);
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