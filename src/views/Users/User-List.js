import React from "react";
import {Table, Typography, Tag, Breadcrumb, Input, Divider, Image, Button, message} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";

const {Search} = Input;
const {Text} = Typography;

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blockUserSubmitted: false
        };
    };

    componentDidMount() {
        this.props.getUsersList();
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => status ? <Tag color="success">Activated</Tag> : <Tag color="error">Deactivated</Tag>
        },
        {
            title: 'Image',
            key: 'image',
            dataIndex: 'image',
            render: (link) => <Image src={link} width={40}/>
        },
        {
            title: 'Action',
            key: 'block',
            dataIndex: 'block',
            render: (user) => user.authorities.includes("ROLE_ADMIN") ?
                <Button type="primary" danger disabled>Block</Button> :
                user.activated ?
                    <Button type="primary" onClick={() => this.blockUser(user.login)} danger>Block</Button> :
                    <Button type="primary" onClick={() => this.activeUser(user.login)}>Active</Button>
        },
    ];

    data = [];

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.usersList !== nextProps.usersList) {
            // eslint-disable-next-line no-unused-expressions
            this.props.usersList.length > 0 ?
                this.props.usersList.map((row, index) => {
                    const user = {
                        "key": index + 1,
                        "id": index + 1,
                        "firstname": row.firstName,
                        "lastname": row.lastName,
                        "email": row.email,
                        "status": row.activated,
                        "image": row.imageUrl,
                        "block": row
                    };
                    this.data.push(user);
                }) : null
        }
        if (this.props.userBlockSuccess !== nextProps.userBlockSuccess) {
            setTimeout(
                function () {
                    this.setState({blockUserSubmitted: false});
                }
                    .bind(this),
                2000
            );
        }
    };

    blockUser = (login) => {
        this.setState({
            blockUserSubmitted: true
        });
        this.props.blockUser(login);
    };

    activeUser = (login) => {
        this.setState({
            blockUserSubmitted: true
        });
        this.props.activeUser(login);
    };

    render() {
        const {blockUserSubmitted} = this.state;
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>User List</Breadcrumb.Item>
                </Breadcrumb>
                {
                    this.data.length > 0 && <Table columns={this.columns} dataSource={this.data}/>
                }
                {blockUserSubmitted && this.props.userBlockSuccess ? message.success('User has been blocked successfully!') : null}
                {blockUserSubmitted && this.props.userBlockError && message.error('Failed block user!')}
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type,
        usersList: state.users.usersList,
        userBlockLoading: state.users.userBlockLoading,
        userBlockSuccess: state.users.userBlockSuccess,
        userBlockError: state.users.userBlockError,
        userBlockErrorMessage: state.users.userBlockErrorMessage,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUsersList: () => dispatch(actions.getUsersList()),
        blockUser: (login) => dispatch(actions.blockUser(login)),
        activeUser: (login) => dispatch(actions.activeUser(login)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);