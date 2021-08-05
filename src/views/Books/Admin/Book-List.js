import React from "react";
import {Table, Typography, Space, Breadcrumb, Input, Divider, Image} from 'antd';
import * as actions from "../../../store/actions";
import {connect} from "react-redux";

const {Search} = Input;
const {Text} = Typography;

class BookList extends React.Component {

    componentDidMount() {
        this.props.getBooksList();
    };

    editDetails = (id) => {
        this.props.history.push(`/admin/editBookDetails/${id}`);
    };

    columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: 'Book Name',
            dataIndex: 'name',
            key: 'name',
            render: ([text, id]) => <a onClick={() => this.editDetails(id)}>{text}</a>,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Publisher',
            dataIndex: 'publisher',
            key: 'publisher',
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn',
        },
        {
            title: 'Edition',
            key: 'edition',
            dataIndex: 'edition'
        },
        {
            title: 'No of Copies',
            key: 'noOfCopies',
            dataIndex: 'noOfCopies'
        },
        {
            title: 'Image',
            key: 'image',
            dataIndex: 'image',
            render: (link) => <Image src={link} width={50}/>
        },
    ];

    data = [];

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.booksList !== nextProps.booksList) {
            // eslint-disable-next-line no-unused-expressions
            this.props.booksList.length > 0 ?
                this.props.booksList.map((row, index) => {
                    const book = {
                        "key": index + 1,
                        "id": row.id,
                        "name": [row.title, row.id],
                        "author": row.author,
                        "publisher": row.publisher,
                        "isbn": row.isbn,
                        "edition": row.edition,
                        "noOfCopies": row.noOfCopies,
                        "image": row.imageUrl
                    };
                    this.data.push(book);
                }) : null
        }
    };

    onSearch = value => console.log(value);

    render() {
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Book List</Breadcrumb.Item>
                </Breadcrumb>
                <Search
                    placeholder="Search movie here..."
                    allowClear
                    enterButton="Search"
                    size="large"
                    style={{width: 800}}
                    onSearch={this.onSearch}
                />
                <Divider type='horizontal'/>
                {
                    this.data.length > 0 && <Table columns={this.columns} dataSource={this.data}/>
                }
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auth.account_type,
        booksList: state.books.booksList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBooksList: () => dispatch(actions.getBooksList())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookList);