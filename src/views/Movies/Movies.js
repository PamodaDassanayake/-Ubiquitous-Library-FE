import React from "react";
import {Breadcrumb, Card, Col, Empty, Image, Row, Typography} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";

const {Text, Title} = Typography;

class Movies extends React.Component {

    viewMovieDetails = (movieId) => {
        if (this.props.account_type !== '')
            this.props.history.push(`/dashboard/movieInfo/${movieId}`);
    };

    componentDidMount() {
        this.props.getMoviesList();
    };

    render() {
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Movies</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-card-wrapper">
                    <Row gutter={[16, 24]}>
                        {
                            this.props.moviesList.length !== 0 ?
                                this.props.moviesList.map((row, index) => (
                                    <Col span={6} key={index}>
                                        <Card
                                            key={index}
                                            hoverable
                                            style={{width: 160, height: 340}}
                                            cover={<Image height={240} src={row.imageUrl} preview={false}/>}
                                            bordered={false} onClick={() => this.viewMovieDetails(row.id)}>
                                            <Text ellipsis={row.title.length > 20 ? true : false}
                                                  style={{fontSize: '16px'}}><b>{row.title}</b></Text>
                                            <p>{row.publishYear}</p>
                                        </Card>
                                    </Col>
                                )) :      <div style={{margin: 'auto'}}>
                                    <Empty />
                                </div>
                        }
                    </Row>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type,
        moviesList: state.movies.moviesList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMoviesList: () => dispatch(actions.getMoviesList())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Movies);