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
    Divider
} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";

const {Title, Text, Paragraph} = Typography;

class ViewMovieDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    componentDidMount() {
        const paths = window.location.pathname.split('/');
        this.props.getMovieDetails(paths[2]);
    };

    onChange(date, dateString) {
        console.log(date, dateString);
    };

    render() {
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
                                        <DatePicker onChange={this.onChange}/>
                                        <Text>To</Text>
                                        <DatePicker onChange={this.onChange}/>
                                        <Button type='primary' shape='round' size='middle'>Check Availability</Button>
                                        <Divider/>
                                    </Space>
                                </Row>
                                <div>
                                    <Space direction='vertical'>
                                        <Button type='primary' shape='round' size='large' disabled>Lend This</Button>
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
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type,
        movie: state.movies.movie
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMovieDetails: (movieId) => dispatch(actions.getMovieDetails(movieId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewMovieDetails);