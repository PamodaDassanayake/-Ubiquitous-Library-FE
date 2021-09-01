import React from "react";
import {Breadcrumb, Button, Card, Col, DatePicker, Divider, Empty, Image, Row, Space, Tabs, Typography} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";

const {TabPane} = Tabs;
const {Title, Text} = Typography;

class Reservations extends React.Component {

    componentDidMount() {
        this.props.getBooksReservationsByUser();
        this.props.getVideosReservationsByUser();
    };

    currentReservations = (reservation, index) => {
        return (
            <Card
                key={index}
                style={{width: '100%'}}
            >
                <Row>
                    <Col span={21} offset={3}>
                        <Row>
                            <Col span={6}>
                                <Image
                                    preview={{visible: false}}
                                    width={100}
                                        src={reservation.book.imageUrl}
                                />
                            </Col>
                            <Col span={16}>
                                <Title level={3}>{reservation.book.title}</Title>
                                <Space direction="horizontal">
                                    <Text style={{fontWeight: 'bold'}}>Lent Date : {reservation.bookingStart}</Text>
                                   <Text>{reservation.lendDate}</Text>
                                    <Text style={{fontWeight: 'bold'}}>Return Date : {reservation.bookingEnd}</Text>
                                    <Text>{reservation.returnDate}</Text>
                                    <Divider/>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        );
    };

    pastReservations = (reservation, index) => {
        return (
            <Card
                key={index}
                style={{width: '100%'}}
            >
                <Row>
                    <Col span={21} offset={3}>
                        <Row>
                            <Col span={6}>
                                <Image
                                    preview={{visible: false}}
                                    width={100}
                                    src={reservation.video.imageUrl}
                                />
                            </Col>
                            <Col span={16}>
                                <Title level={3}>{reservation.video.title}</Title>
                                <Space direction="horizontal">
                                    <Text style={{fontWeight: 'bold'}}>Lent Date : {reservation.bookingStart}</Text>
                                    <Text style={{fontWeight: 'bold'}}>Return Date : {reservation.bookingEnd}</Text>
                                    <Divider/>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        );
    };


    render() {

        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Reservations</Breadcrumb.Item>
                </Breadcrumb>
                <Tabs type="card">
                    <TabPane tab="Reserved Books" key="1">
                        {
                            this.props.userBooksReservationList.length > 0 ? this.props.userBooksReservationList.map((row, index) => (
                                this.currentReservations(row, index)
                            )) : (<div>
                                <Empty/>
                            </div>)
                        }
                    </TabPane>
                    <TabPane tab="Reserved Movies" key="2">
                        {
                            this.props.userVideosReservationList.length > 0 ?  this.props.userVideosReservationList.map((row, index) => (
                                this.pastReservations(row, index)
                            )) : (<div>
                                <Empty/>
                            </div>)
                        }
                    </TabPane>
                </Tabs>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type,
        userBooksReservationList: state.reservations.userBooksReservationList,
        userVideosReservationList: state.reservations.userVideosReservationList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBooksReservationsByUser: () => dispatch(actions.getBooksReservationsByUser()),
        getVideosReservationsByUser: () => dispatch(actions.getVideosReservationsByUser()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reservations);