import React from "react";
import {
    Breadcrumb,
    Image,
    DatePicker,
    Space,
    Col,
    Typography,
    Row,
    Button,
    Divider,
    message,
    Form,
    Input,
    Avatar,
    Tooltip,
    Modal,
    List,
    Comment
} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";
import moment from 'moment';
import {UserOutlined, CreditCardOutlined, NumberOutlined} from "@ant-design/icons";

const {Title, Text, Paragraph} = Typography;
const {TextArea} = Input;

const CommentList = ({comments}) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);


const Editor = ({onChange, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const CustomComment = ({comment}) => (
    <Comment
        // actions={[<span key="comment-nested-reply-to">Reply to</span>]}
        author={<a>{comment.user.firstName} {comment.user.lastName}</a>}
        avatar={
            <Avatar
                src={comment.user.imageUrl !== null ? comment.user.imageUrl : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                alt="Han Solo"
            />
        }
        content={
            <p>
                {comment.comment}
            </p>
        }
        datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(comment.dateTime).fromNow()}</span>
            </Tooltip>
        }
    >
    </Comment>
);

class ViewBookDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fromDate: '',
            toDate: '',
            availability: false,
            formSubmitted: false,
            comments: [],
            submitting: false,
            value: '',
            paymentModalVisible: false
        };
    };

    componentDidMount() {
        this.props.getUser();
        const paths = window.location.pathname.split('/');
        this.props.getBookDetails(paths[3]);
        this.props.getCommentsForBook(paths[3]);
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

        if (this.state.fromDate === '' || this.state.toDate === '') {
            message.error("Please set From date and To date!");
            return;
        }

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


        this.props.reserveBook(reserveDetails);
    };

    submitComment = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        let data = {
            "book": {
                "id": this.props.book.id
            },
            "comment": this.state.value,
            "rating": 0,
            "user": {
                "id": this.props.user.id
            }
        };

        this.props.postCommentForBook(data);

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    ...this.state.comments,
                    {
                        author: this.props.user.firstName + " " + this.props.user.lastName,
                        avatar: this.props.user.imageUrl !== null ? this.props.user.imageUrl : "" +
                            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                ],
            });
        }, 1000);
    };

    onChangeComment = e => {
        this.setState({
            value: e.target.value,
        });
    };

    hideModal = () => {
        this.setState({
            paymentModalVisible: false,
        });
    };

    submitPayment = () => {
        this.props.settlePayment(this.props.reserveFee.id, this.props.reserveFee.fee);
    };

    componentDidUpdate(nextProps, nextContext) {
        if (this.props.bookAvailability !== nextProps.bookAvailability) {
            // eslint-disable-next-line no-unused-expressions
            this.props.bookAvailability !== null && this.props.bookAvailability.availableQty > 0 ?
                message.success('Book is available') && this.setState({
                    availability: true
                })
                : message.error('Book is not available') &&
                this.setState({
                    availability: false
                });
        }
        if (this.props.reserveBookSuccess !== nextProps.reserveBookSuccess) {
            this.setState({
                paymentModalVisible: true
            });
        }
        if (this.props.paymentSuccess) {
            this.setState({
                paymentModalVisible: false
            });
        }
    };

    disabledDate = (current) => {
        let customDate = new Date() - 1;
        return current && current < moment(customDate);
    };

    disabledToDate = (current) => {
        let customDate;
        if (this.state.fromDate === '') {
            customDate = new Date() - 1;
        } else {
            customDate = this.state.fromDate;
        }
        return current && current < moment(customDate);
    };

    render() {
        const {availability, formSubmitted, comments, submitting, value} = this.state;
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
                                    <DatePicker onChange={this.getFromDate} disabledDate={this.disabledDate}/>
                                    <Text>To</Text>
                                    <DatePicker onChange={this.getToDate} disabledDate={this.disabledToDate}/>
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
                                <Title level={3}>About The Book</Title>
                                <Paragraph>
                                    {this.props.book.description}
                                </Paragraph>
                            </Col>
                        </Row>
                        <Divider/>
                        <Title level={3}>Description <span
                            style={{color: 'grey'}}>Reviews ({this.props.comments.length})</span></Title>
                        <Divider/>
                        <Comment
                            avatar={
                                <Avatar
                                    src={this.props.user !== null && this.props.user.imageUrl !== null ? this.props.user.imageUrl : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                                    alt={this.props.user !== null && this.props.user.firstName !== null ? this.props.user.firstName : "User"}
                                />
                            }
                            content={
                                <Editor
                                    onChange={this.onChangeComment}
                                    onSubmit={this.submitComment}
                                    submitting={submitting}
                                    value={value}
                                />
                            }
                        />
                        {comments.length > 0 && <CommentList comments={comments}/>}
                        <Space direction='vertical'>
                            {
                                comments.length > 0 || (this.props.comments !== null && this.props.comments.length > 0) ?
                                    this.props.comments.map((row, index) => (
                                        <CustomComment comment={row}/>
                                    ))
                                    :
                                    null
                            }
                        </Space>
                    </Col>
                </Row>
                {
                    this.props.reserveFee !== null &&
                    (
                        <Modal
                            title="Payment"
                            width={600}
                            visible={this.state.paymentModalVisible}

                            okButtonProps={{hidden: true}}
                            cancelButtonProps={{hidden: this.state.current !== 0}}
                        >
                            <Form
                                initialValues={{remember: true}}
                                onFinish={this.submitPayment}
                                style={{width: '500px', margin: 'auto'}}
                                layout='vertical'
                            >
                                <Form.Item
                                    name="fee"
                                >
                                    <h2>Fee : Rs. {this.props.reserveFee.fee}</h2>
                                </Form.Item>
                                <Form.Item
                                    name="cardName"
                                    label='Name on Card'
                                    rules={[{required: true, message: 'Please input your Name on Card!'}]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="Name on Card"/>
                                </Form.Item>
                                <Form.Item
                                    name="cardNo"
                                    label='Card Number'
                                    rules={[{required: true, message: 'Please input your Card No!'}]}
                                >
                                    <Input
                                        prefix={<CreditCardOutlined className="site-form-item-icon"/>}
                                        placeholder="Card Number"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="cvv"
                                    label='CVV'
                                    rules={[{required: true, message: 'Please input your Card No!'}]}
                                >
                                    <Input
                                        prefix={<NumberOutlined className="site-form-item-icon"/>}
                                        placeholder="CVV"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        PAY RS. {this.props.reserveFee.fee}.00
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    )
                }
                {
                    this.props.reserveBookError && message.error(this.props.reserveBookErrorMessage.data.message)
                }
                {formSubmitted && this.props.paymentSuccess && message.success('Book has been reserved successfully!') && this.setState({
                    formSubmitted: false
                })}
                {formSubmitted && this.props.paymentError && message.error('Failed to reserved book!') && this.setState({
                    formSubmitted: false
                })}
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
        reserveBookErrorMessage: state.reservations.reserveBookErrorMessage,
        comments: state.books.comments,
        reserveFee: state.reservations.reserveFee,
        paymentLoading: state.reservations.paymentLoading,
        paymentSuccess: state.reservations.paymentSuccess,
        paymentError: state.reservations.paymentError,
        paymentErrorMessage: state.reservations.paymentErrorMessage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.getLoggedUser()),
        getBookDetails: (bookId) => dispatch(actions.getBookDetails(bookId)),
        chekBookAvailability: (data) => dispatch(actions.chekBookAvailability(data)),
        reserveBook: (data) => dispatch(actions.reserveBook(data)),
        getCommentsForBook: (bookId) => dispatch(actions.getCommentsForBook(bookId)),
        postCommentForBook: (details) => dispatch(actions.postCommentForBook(details)),
        settlePayment: (reserveId, fee) => dispatch(actions.settleBookPayment(reserveId, fee)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewBookDetails);