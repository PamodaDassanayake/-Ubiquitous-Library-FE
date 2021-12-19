import React from "react";
import {Table, Typography, Result, Breadcrumb, Input, Divider, Image, Button, message} from 'antd';
import * as actions from "../../../actions";
import {connect} from "react-redux";
import {ExclamationOutlined} from "@ant-design/icons";

class RequestedBooks extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.requestedBook();
    };

    editDetails = (id) => {
        this.props.history.push(`/dashboard/admin/editBookDetails/${id}`);
    };

    columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (link) => <Image src={link} width={40}/>
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Edition',
            dataIndex: 'edition',
            key: 'edition',
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn',
        },
        {
            title: 'Publisher',
            dataIndex: 'publisher',
            key: 'publisher',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (book) => <Button type="primary" onClick={() => this.updateStore(book)}>Update Store</Button>
        }
    ];

    data = [];

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        console.log(this.props.requestedBooksList.length)
        if (this.props.requestedBooksList !== nextProps.requestedBooksList) {
            // eslint-disable-next-line no-unused-expressions
            this.props.requestedBooksList.length > 0 ?
                this.props.requestedBooksList.map((row, index) => {
                    const csv = {
                        "key": index + 1,
                        "id": row.id,
                        "image": row.imageUrl,
                        "title": row.title,
                        "description": row.description,
                        "publisher": row.publisher,
                        "author": row.author,
                        "edition": row.edition,
                        "isbn": row.isbn,
                        "action": row,
                    };
                    this.data.push(csv);
                }) : null
        }

        if (this.props.purchaseBookSuccess && (this.props.purchaseBookSuccess !== nextProps.purchaseBookSuccess)) {
            message.success('Book is successfully purchased!');
            this.props.requestedBook();
        }
    };

    updateStore = (book) => {
        book.noOfCopies = 2;
        this.props.purchaseRequestedBook(book);
    };

    render() {
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Requested Books List</Breadcrumb.Item>
                </Breadcrumb>
                <Divider type='horizontal'/>
                {
                    this.data.length > 0 ? <Table columns={this.columns} dataSource={this.data}/> :
                        <Result
                            icon={<ExclamationOutlined />}
                            title="No requested books found"
                        />
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        requestedBooksList: state.books.requestedBooksList,
        purchaseBookLoading: state.books.purchaseBookLoading,
        purchaseBookSuccess: state.books.purchaseBookSuccess,
        purchaseBookError: state.books.purchaseBookError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestedBook: () => dispatch(actions.getRequestedBooks()),
        purchaseRequestedBook: (book) => dispatch(actions.purchaseBook(book)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestedBooks);