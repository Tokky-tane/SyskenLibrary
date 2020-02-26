import React from 'react';

class List extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const listtable = this.props.books.map((books) =>
                <tr key={"book:" + books.title}>
                    <td>
                        <a>
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
        )
    };
}

export default List;