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
    Divider, message
} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";

const {Title, Text, Paragraph} = Typography;

class ViewMovieDetails extends React.Component {

    constructor(props) {
        super(props);
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
        this.props.getMovieDetails(paths[3]);
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
        const {availability, formSubmitted} = this.state;
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
                                <Paragraph>
                                    If you want to buy books online, you’ll get a better deal if you get them used.
                                    Depending on
                                    the condition you get them in, you may just end up paying a few cents plus shipping.
                                    Make
                                    sure you read through the description of the book to see if there are any damages
                                    you should
                                    be aware of.
                                </Paragraph>
                                <Paragraph>
                                    Be sure to read everything about the item that you want to buy. A picture of a
                                    product can
                                    be deceiving. They can make products look much smaller or bigger that they really
                                    are.
                                    Reading the description will allow you to be confident in the item you are
                                    purchasing.
                                </Paragraph>
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
        reserveBookErrorMessage: state.reservations.reserveBookErrorMessage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.getLoggedUser()),
        getMovieDetails: (movieId) => dispatch(actions.getMovieDetails(movieId)),
        chekBookAvailability: (data) => dispatch(actions.chekBookAvailability(data)),
        reserveBook: (data) => dispatch(actions.reserveBook(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewMovieDetails);