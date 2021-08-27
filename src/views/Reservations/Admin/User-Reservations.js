import React from "react";
import {Breadcrumb, Input, Divider, Table, Form, Button, Typography, DatePicker} from 'antd';
import * as actions from "../../../actions";
import {connect} from "react-redux";

const {Title} = Typography;

class UserReservations extends React.Component {
    componentDidMount() {
        this.props.getAllUserReservations();
    };

     onChange(date, dateString) {
        console.log(date, dateString);
    };

    viewBookDetails = (id) => {
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
            dataIndex: 'bookName',
            key: 'bookName',
            render: ([text, id]) => <a onClick={() => this.viewBookDetails(id)}>{text}</a>,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Lend Date',
            dataIndex: 'lendDate',
            key: 'lendDate',
        },
        {
            title: 'Return Date',
            dataIndex: 'returnDate',
            key: 'returnDate',
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
        }
    ];

    data = [];

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.userReservationList !== nextProps.userReservationList) {
            // eslint-disable-next-line no-unused-expressions
            this.props.userReservationList.length > 0 ?
                this.props.userReservationList.map((row, index) => {
                    const reservation = {
                        "key": index + 1,
                        "id": row.id,
                        "bookName":  [row.Book.title, row.Book.id],
                        "author": row.Book.author,
                        "lendDate": row.lendDate,
                        "returnDate": row.returnDate,
                        "user": row.user.first_name + " " + row.user.last_name
                    };
                    this.data.push(reservation);
                }) : null
        }
    };

    onSearch = value => console.log(value);

    render() {
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>User Reservation List</Breadcrumb.Item>
                </Breadcrumb>
                <Title level={5}>Filter From</Title>
                <Form
                    layout='inline'
                >
                    <Form.Item>
                        <DatePicker onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item>
                        <DatePicker onChange={this.onChange} picker="week" />
                    </Form.Item>

                    <Form.Item>
                        <DatePicker onChange={this.onChange} picker="month" />
                    </Form.Item>
                    <Form.Item>
                        <DatePicker onChange={this.onChange} picker="year" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Filter</Button>
                    </Form.Item>
                </Form>
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
        userReservationList: state.reservations.userReservationList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserReservations: () => dispatch(actions.getAllUserReservations())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserReservations);