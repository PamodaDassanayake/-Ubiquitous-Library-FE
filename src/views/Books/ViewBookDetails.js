import React from "react";
import {Breadcrumb, Image, DatePicker, Space, Col, Typography, Row, Button, Divider, message} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";

const {Title, Text, Paragraph} = Typography;

class ViewBookDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fromDate: '',
            toDate: '',
            availability: false,
            formSubmitted: false
        };
    };

    componentDidMount() {
        this.props.getUser();
        const paths = window.location.pathname.split('/');
        this.props.getBookDetails(paths[3]);
    };

    getFromDate = (date, dateString) => {
        this.setState({
            fromDate: dateString
        });
    };

    getToDate = (date, dateString) => {
        this.setState({
            toDate: dateString
        });
    };

    chekBookAvailability = (bookDetails) => {
        const data = {
            "bookingStart": this.state.fromDate,
            "bookingEnd": this.state.toDate,
            "book": bookDetails.id
        };

        this.props.chekBookAvailability(data);
    };

    lendBook = (bookDetails) => {
        this.setState({
            formSubmitted: true
        });

        const reserveDetails = {
            "book": bookDetails.id,
            "bookingEnd": this.state.toDate,
            "bookingStart": this.state.fromDate,
            "userId": this.props.user.id
        };

        console.log(reserveDetails)

        this.props.reserveBook(reserveDetails);
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.bookAvailability !== nextProps.bookAvailability) {
            // eslint-disable-next-line no-unused-expressions
            this.props.bookAvailability !== null && this.props.bookAvailability.availableQty === null ?
                message.success('Book is available') && this.setState({
                    availability: true
                })
                : message.error('Book is not available') &&
                this.setState({
                    availability: false
                });
        }
    };

    render() {
        const {availability, formSubmitted} = this.state;
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Books</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.book.title}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col span={21} offset={3}>
                        <Row>
                            <Col span={6}>
                                <Image
                                    preview={{visible: false}}
                                    width={200}
                                    src={this.props.book.imageUrl}
                                />
                            </Col>
                            <Col span={16}>
                                <Title level={1}>{this.props.book.title}</Title>
                                <div>
                                    <Text level={5}>Categories: Culture, Life Style</Text><br/>
                                    <Text level={5}>Tags: Dream, Music, Sound</Text>
                                </div>
                                <Space direction="horizontal">
                                    <Text>From</Text>
                                    <DatePicker onChange={this.getFromDate}/>
                                    <Text>To</Text>
                                    <DatePicker onChange={this.getToDate}/>
                                    <Button type='primary' shape='round' size='middle'
                                            onClick={() => this.chekBookAvailability(this.props.book)}>Check
                                        Availability</Button>
                                    <Divider/>
                                </Space>
                                <div>
                                    <Space direction='vertical'>
                                        <Button type='primary' shape='round' size='large' disabled={!availability}
                                                onClick={() => this.lendBook(this.props.book)}>Lend
                                            This</Button>
                                    </Space>
                                </div>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row>
                            <Col span={10}>
                                <Title level={3}>Book Details</Title>
                                <Row>
                                    <Col span={6}>
                                        <Title level={5}>Author</Title>
                                        <Title level={5}>Publisher</Title>
                                        <Title level={5}>ISBN</Title>
                                        <Title level={5}>Edition</Title>
                                        <Title level={5}>No of Copies</Title>
                                    </Col>
                                    <Col span={18}>
                                        <Title level={5}>: {this.props.book.author}</Title>
                                        <Title level={5}>:{this.props.book.publisher}</Title>
                                        <Title level={5}>:{this.props.book.isbn}</Title>
                                        <Title level={5}>:{this.props.book.edition}</Title>
                                        <Title level={5}>:{this.props.book.noOfCopies}</Title>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={10}>
                                <Title level={3}>About The Author</Title>
                                <Title level={4}>Saifudin A.</Title>
                                <Paragraph>
                                    How to Build a Successful Blog Business is a straight forward guide to building a
                                    publishing business online that covers everything from choosing a niche to hiring
                                    staff, registering a business to selling it.
                                    Finding traffic to monetizing it whether you are interested in creating an
                                    additional income stream or building a fully-fledged business, this is an essential
                                    read for web entrepreneurs and online publishers.
                                </Paragraph>
                            </Col>
                        </Row>
                        <Divider/>
                        <Title level={3}>Description <span style={{color: 'grey'}}>Reviews (7)</span></Title>
                        <Divider/>
                        <Paragraph>
                            If you want to buy books online, you’ll get a better deal if you get them used. Depending on
                            the condition you get them in, you may just end up paying a few cents plus shipping. Make
                            sure you read through the description of the book to see if there are any damages you should
                            be aware of.
                        </Paragraph>
                        <Paragraph>
                            Be sure to read everything about the item that you want to buy. A picture of a product can
                            be deceiving. They can make products look much smaller or bigger that they really are.
                            Reading the description will allow you to be confident in the item you are purchasing.
                        </Paragraph>
                    </Col>
                </Row>
                {formSubmitted && this.props.reserveBookSuccess && message.success('Book has been reserved successfully!')}
                {formSubmitted && this.props.reserveBookError && message.error('Failed to reserved book!')}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auths.user,
        book: state.books.book,
        bookAvailability: state.reservations.bookAvailability,
        reserveBookLoading: state.reservations.reserveBookLoading,
        reserveBookSuccess: state.reservations.reserveBookSuccess,
        reserveBookError: state.reservations.reserveBookError,
        reserveBookErrorMessage: state.reservations.reserveBookErrorMessage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.getLoggedUser()),
        getBookDetails: (bookId) => dispatch(actions.getBookDetails(bookId)),
        chekBookAvailability: (data) => dispatch(actions.chekBookAvailability(data)),
        reserveBook: (data) => dispatch(actions.reserveBook(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewBookDetails);