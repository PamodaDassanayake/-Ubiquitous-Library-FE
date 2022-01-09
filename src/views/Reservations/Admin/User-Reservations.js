import React from "react";
import {Breadcrumb, Tabs, Divider, Table, Form, Button, Typography, DatePicker, Image} from 'antd';
import * as actions from "../../../actions";
import {connect} from "react-redux";

const {Title} = Typography;
const {TabPane} = Tabs;

class UserReservations extends React.Component {
    componentDidMount() {
        this.props.getAdminBookReservations();
        this.props.getAdminBookReservations();
        this.props.getAdminVideoReservations();
        this.props.getAdminVideoReservations();
    };

    onChange(date, dateString) {
    };

    viewBookDetails = (id) => {
        this.props.history.push(`/admin/editBookDetails/${id}`);
    };

    movieColumns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: 'Movie Name',
            dataIndex: 'movieName',
            key: 'movieName',
        },
        {
            title: 'Director',
            dataIndex: 'director',
            key: 'director',
        },
        {
            title: 'Image',
            dataIndex: 'movieImage',
            key: 'movieImage',
            render: (link) => <Image src={link} width={50}/>
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

    bookColumns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: 'Book Name',
            dataIndex: 'bookName',
            key: 'bookName',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Image',
            dataIndex: 'bookImage',
            key: 'bookImage',
            render: (link) => <Image src={link} width={50}/>
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

    movieData = [];
    bookData = [];

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.bookReservationList !== nextProps.bookReservationList) {
            // eslint-disable-next-line no-unused-expressions
            this.props.bookReservationList.length > 0 ?
                this.props.bookReservationList.map((row, index) => {
                    const bookReservation = {
                        "key": index + 1,
                        "id": row.id,
                        "bookName": row.book.title,
                        "author": row.book.author,
                        "bookImage": row.book.imageUrl,
                        "lendDate": row.bookingStart,
                        "returnDate": row.bookingEnd,
                        "user": row.user.firstName + " " + row.user.lastName
                    };
                    this.bookData.push(bookReservation);
                }) : null
        }
        if (this.props.videoReservationList !== nextProps.videoReservationList) {
            // eslint-disable-next-line no-unused-expressions
            this.props.videoReservationList.length > 0 ?
                this.props.videoReservationList.map((row, index) => {
                    const movieReservation = {
                        "key": index + 1,
                        "id": row.id,
                        "movieName": row.video.title,
                        "director": row.video.director,
                        "movieImage": row.video.imageUrl,
                        "lendDate": row.bookingStart,
                        "returnDate": row.bookingEnd,
                        "user": row.user.firstName + " " + row.user.lastName
                    };
                    this.movieData.push(movieReservation);
                }) : null
        }

    };

    onSearch = value => console.log(value);

    render() {
        const books = [
            <>
                <Title level={5}>All Book Reservations</Title>
                <Divider type='horizontal'/>
                {
                    this.bookData.length > 0 && <Table columns={this.bookColumns} dataSource={this.bookData}/>
                }
            </>
        ];

        const movies = [
            <>
                <Title level={5}>All Movie Reservations</Title>
                <Divider type='horizontal'/>
                {
                    this.movieData.length > 0 && <Table columns={this.movieColumns} dataSource={this.movieData}/>
                }
            </>
        ];

        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>User Reservation List</Breadcrumb.Item>
                </Breadcrumb>
                <Tabs type="card">
                    <TabPane tab="Books List" key="1">
                        {books}
                    </TabPane>
                    <TabPane tab="Movies List" key="2">
                        {movies}
                    </TabPane>
                </Tabs>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type,
        userReservationList: state.reservations.userReservationList,
        bookReservationList: state.reservations.bookReservationList,
        videoReservationList: state.reservations.videoReservationList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAdminBookReservations: () => dispatch(actions.getAllBookReservations()),
        getAdminVideoReservations: () => dispatch(actions.getAllVideoReservations()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserReservations);