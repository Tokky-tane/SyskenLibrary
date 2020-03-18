import React from 'react';
import './List.css';

class List extends React.Component {
    render() {
        const listtable = this.props.books.map((books) =>
                <tr key={books.title}>
                    <td>
                        <a href={"/#/detail?bt=" + books.title}>
                            {books.title}
                        </a>
                    </td>
                    <td>
                        {books.author}
                    </td>
                    <td>
                        {books.isbn}
                    </td>
                </tr>
        );

        return (
            <div>
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <th>タイトル</th>
                            <th>著者</th>
                            <th>isbnコード</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listtable}
                    </tbody>
                </table>
                <div className="regibutton">
                    <button className="registarbutton" onClick={()=>{window.location.href = '/#/submit'}}>新しい本を登録</button>
                </div>
            </div>
        );
    };
}

export default List;