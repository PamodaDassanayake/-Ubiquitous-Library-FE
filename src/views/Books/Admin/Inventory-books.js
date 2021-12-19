import React from "react";
import {Table, Typography, Space, Breadcrumb, Input, Divider, Image, Button, message} from 'antd';
import * as actions from "../../../actions";
import {connect} from "react-redux";

class InventoryBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            scrap: false
        }
    };

    componentDidMount() {
        this.props.getScrap();
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

            this.data = [];
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

    startScrap = () => {
        if (this.props.scrapStatus === 'Running'){
            message.warn('Previous scrapping service is still running!');
            return;
        }
        this.setState({scrap: true});
        this.props.startScrapList();
        this.props.getScrapStatus();
    };

    refreshScrape = () => {
        this.setState({scrap: true});
        this.props.getScrapStatus();
    };

    render() {
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Inventory Books List</Breadcrumb.Item>
                </Breadcrumb>
                <Space>
                    <Button type="primary" key="console" onClick={this.startScrap}>
                        Scrape Inventory
                    </Button>
                    <Button type="primary" key="console" onClick={this.refreshScrape}>
                       Check Status
                    </Button>
                </Space>
                <Divider type='horizontal'/>
                <Table columns={this.columns} dataSource={this.data}/>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        scrap: state.csv.scrap,
        scrapStatus: state.csv.scrapStatus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        startScrapList: () => dispatch(actions.startScrap()),
        getScrapStatus: () => dispatch(actions.getScrapStatus()),
        getScrap: () => dispatch(actions.getScrapResources()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InventoryBooks);