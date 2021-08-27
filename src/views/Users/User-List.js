import React from "react";
import {Table, Typography, Tag, Breadcrumb, Input, Divider, Image} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";

const {Search} = Input;
const {Text} = Typography;

class UserList extends React.Component {

    componentDidMount() {
        this.props.getUsersList();
    };

    editDetails = (id) => {
        // this.props.history.push(`/admin/editBookDetails/${id}`);
    };

    columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: 'First Name',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) =>  status ? <Tag color="success">Activated</Tag> : <Tag color="error">Deactivated</Tag>
        },
        {
            title: 'Image',
            key: 'image',
            dataIndex: 'image',
            render: (link) => <Image src={link} width={40}/>
        },
    ];

    data = [];

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.usersList !== nextProps.usersList) {
            // eslint-disable-next-line no-unused-expressions
            this.props.usersList.length > 0 ?
                this.props.usersList.map((row, index) => {
                    console.log(row.activated)
                    const user = {
                        "key": index + 1,
                        "id": index + 1,
                        "firstname":row.firstName,
                        "lastname": row.lastName,
                        "email": row.email,
                        "createdDate": row.createdDate,
                        "createdBy": row.createdBy,
                        "status": row.activated,
                        "image": row.imageUrl
                    };
                    this.data.push(user);
                }) : null
        }
    };

    onSearch = value => console.log(value);

    render() {
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>User List</Breadcrumb.Item>
                </Breadcrumb>
                <Search
                    placeholder="Search users here..."
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
        account_type: state.auths.account_type,
        usersList: state.users.usersList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUsersList: () => dispatch(actions.getUsersList())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);