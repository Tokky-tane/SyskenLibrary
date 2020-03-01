import React from 'react';

class Detail extends React.Component {
    render() {
        let urlParam = window.location.hash;
        let detailBt = '';

        if (urlParam) {
            urlParam = urlParam.substring(9); //"#/detail?"までで9文字 #使ってるからsearch使えない?

            detailBt = urlParam.split('=');
        }

        const detailbookstate = this.props.books.filter(function (item) {
            if (item.title === detailBt[1]) {
                return true;
            }
            return 0;
        })

        return (
            <>
                <h2>{detailBt[1] + " の詳細"}</h2>
                <h3>{"著者..." + detailbookstate[0].author}</h3>
                <h3>{"ISBNコード..." + detailbookstate[0].isbn}</h3>
            </>
        );
    };
}

export default Detail;