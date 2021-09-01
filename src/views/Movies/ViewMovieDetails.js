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
    Divider, message, Comment, Avatar, List, Form, Tooltip, Input
} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";
import moment from "moment";

const {Title, Text} = Typography;
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

class ViewMovieDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fromDate: '',
            toDate: '',
            availability: false,
            formSubmitted: false,
            comments: [],
            submitting: false,
            value: ''
        };
    };

    componentDidMount() {
        this.props.getUser();
        const paths = window.location.pathname.split('/');
        this.props.getMovieDetails(paths[3]);
        this.props.getCommentsForMovie(paths[3]);
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

    chekVideoAvailability = (movieDetails) => {
        const data = {
            "bookingStart": this.state.fromDate,
            "bookingEnd": this.state.toDate,
            "video": movieDetails.id
        };

        this.props.chekBookAvailability(data);
    };

    lendMovie = (movieDetails) => {
        this.setState({
            formSubmitted: true
        });
        const reserveDetails = {
            "video": movieDetails.id,
            "bookingEnd": this.state.toDate,
            "bookingStart": this.state.fromDate,
            "userId": this.props.user.id
        };
        console.log(reserveDetails)

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
            "video": {
                "id": this.props.movie.id
            },
            "comment": this.state.value,
            "rating": 0,
            "user": {
                "id": this.props.user.id
            }
        };

        this.props.postMovieComment(data);

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

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.bookAvailability !== nextProps.bookAvailability) {
            // eslint-disable-next-line no-unused-expressions
            this.props.bookAvailability !== null && this.props.bookAvailability.availableQty === 0 ?
                message.success('Movie is available') && this.setState({
                    availability: true
                })
                : message.error('Movie is not available') &&
                this.setState({
                    availability: false
                })
        }
    };

    render() {
        const {availability, formSubmitted, comments, submitting, value} = this.state;
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Movies</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.movie.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    {
                        this.props.movie != null ? (
                            <Col span={21} offset={3}>
                                <Row>
                                    <Col span={6}>
                                        <Image
                                            preview={{visible: false}}
                                            width={200}
                                            src={this.props.movie.imageUrl}
                                        />
                                    </Col>
                                    <Col span={16}>
                                        <Title level={1}>{this.props.movie.title}</Title>
                                        <Title level={4}>Published Year : {this.props.movie.publishYear}</Title>
                                        <Title level={4}>Studio : {this.props.movie.studio} presents</Title>
                                        <Title level={4}>Director : {this.props.movie.director}</Title>
                                    </Col>
                                    <Space direction="horizontal">
                                        <Text>From</Text>
                                        <DatePicker onChange={this.getFromDate}/>
                                        <Text>To</Text>
                                        <DatePicker onChange={this.getToDate}/>
                                        <Button type='primary' shape='round' size='middle'
                                                onClick={() => this.chekVideoAvailability(this.props.movie)}
                                        >Check Availability</Button>
                                        <Divider/>
                                    </Space>
                                </Row>
                                <div>
                                    <Space direction='vertical'>
                                        <Button type='primary' shape='round' size='large' disabled={!availability}
                                                onClick={() => this.lendMovie(this.props.movie)}>Lend This</Button>
                                    </Space>
                                </div>
                                <Divider/>
                                <Title level={3}>Description <span style={{color: 'grey'}}>Reviews (7)</span></Title>
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
                        ) : <p>Loading...</p>
                    }
                </Row>
                {formSubmitted && this.props.reserveBookSuccess && message.success('Video has been reserved successfully!')}
                {formSubmitted && this.props.reserveBookError && message.error('Failed to reserved video!')}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auths.user,
        account_type: state.auths.account_type,
        movie: state.movies.movie,
        bookAvailability: state.reservations.bookAvailability,
        reserveBookLoading: state.reservations.reserveBookLoading,
        reserveBookSuccess: state.reservations.reserveBookSuccess,
        reserveBookError: state.reservations.reserveBookError,
        reserveBookErrorMessage: state.reservations.reserveBookErrorMessage,
        comments: state.movies.comments,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.getLoggedUser()),
        getMovieDetails: (movieId) => dispatch(actions.getMovieDetails(movieId)),
        chekBookAvailability: (data) => dispatch(actions.chekBookAvailability(data)),
        reserveBook: (data) => dispatch(actions.reserveBook(data)),
        getCommentsForMovie: (bookId) => dispatch(actions.getMovieComments(bookId)),
        postMovieComment: (details) => dispatch(actions.postMovieComment(details))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewMovieDetails);