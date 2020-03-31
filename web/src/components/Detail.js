import React from 'react';
import './Detail.css';
import Button from '@material-ui/core/Button';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          books: [],
        };
    }

    componentDidMount() {
        return fetch('http://localhost:3001/books')
          .then((res) => res.json())
          .then((resJson) => {
            this.setState({
              books: resJson.books,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } 

    render() {
        let urlParam = window.location.hash;
        let detailBt = '';

        if (urlParam) {
            urlParam = urlParam.substring(9); //"#/detail?"までで9文字 #使ってるからsearch使えない?

            detailBt = urlParam.split('=');
        }

        const detailbookstate = this.state.books.filter(function (item) {
            if (item.title === detailBt[1]) {
                return true;
            }
            return 0;
        })

        return (
            <>
                <div className="printDetail">
                    <h2>{detailBt[1] + " の詳細"}</h2>
                    <h3>{"著者..." + detailbookstate[0].author}</h3>
                    <h3>{"ISBNコード..." + detailbookstate[0].isbn}</h3>
                </div>

                <div className="controlButtons">
                    <Button className="jumptoBorrow">この本を借りる</Button>
                    <Button classNAme="backtoList" onClick={()=>{window.location.href = '/#/List/'}}>一覧に戻る</Button>
                </div>
            </>
        );
    };
}

export default Detail;