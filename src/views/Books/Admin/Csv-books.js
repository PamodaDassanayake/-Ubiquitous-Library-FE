import React from "react";
import {Table, Typography, Space, Breadcrumb, Input, Divider, Image, Button, message} from 'antd';
import * as actions from "../../../actions";
import {connect} from "react-redux";

class CsvBooks extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.loadCsv();
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
            title: 'Difference',
            dataIndex: 'difference',
            key: 'difference',
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (status) => status ? <Tag color="success">Activated</Tag> : <Tag color="error">Deactivated</Tag>
        // },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (id) => <Button type="primary" onClick={() => this.approve(id)}>Approve</Button>
        }
    ];

    data = [];

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.csv !== nextProps.csv) {
            // eslint-disable-next-line no-unused-expressions
            this.props.csv.length > 0 ?
                this.props.csv.map((row, index) => {
                    const csv = {
                        "key": index + 1,
                        "id": row.id,
                        "image": row.image,
                        "title": row.title,
                        "publisher": row.publisher,
                        "author": row.author,
                        "edition": row.edition,
                        "isbn": row.isbn,
                        "difference": row.difference,
                        "action": row.id,
                    };
                    this.data.push(csv);
                }) : null
        }
        if (this.props.saveOne !== nextProps.saveOne && this.props.saveOne !== null) {
            message.success("Inventory successfully updated!");
        }
    };

    approve = (id) => {
        let array = [];
        array.push(id);
        this.props.updateInventory(array);
    };

    render() {
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>CSV List</Breadcrumb.Item>
                </Breadcrumb>
                <Divider type='horizontal'/>
                {
                    this.data.length > 0 ?  <Table columns={this.columns} dataSource={this.data}/> : null
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        csv: state.csv.csv,
        saveOne: state.csv.saveOne
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCsv: () => dispatch(actions.loadCsv()),
        updateInventory: () => dispatch(actions.saveCsv()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CsvBooks);