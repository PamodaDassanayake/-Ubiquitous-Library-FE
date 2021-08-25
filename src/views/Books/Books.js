import React from "react";
import {Breadcrumb, Card, Col, Row, Typography, Image, Empty} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";
import Dashboard from "../Dashboard/Dashboard";

const {Text} = Typography;

class Books extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ellipsis: true
        }
    }

    componentDidMount() {
        this.props.getBooksList();
    };

    viewBookDetails = (bookId) => {
        if (this.props.account_type !== '')
            this.props.history.push(`/dashboard/bookInfo/${bookId}`);
    };

    render() {
        const {ellipsis} = this.state;
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Books</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-card-wrapper">
                    <Row gutter={[16, 24]}>
                        {
                            this.props.booksList.length !== 0 ?
                                this.props.booksList.map((row, index) => (
                                    <Col span={4} key={index}>
                                        <Card
                                            key={index}
                                            hoverable
                                            style={ellipsis ? {width: 160} : undefined}
                                            cover={<Image height={240} src={row.imageUrl} preview={false}/>}
                                            bordered={false} onClick={() => this.viewBookDetails(row.id)}>
                                            <Text ellipsis={ellipsis ? {tooltip: row.title} : false}>{row.title}</Text>
                                        </Card>
                                    </Col>
                                )) :
                               <div style={{margin: 'auto'}}>
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
        booksList: state.books.booksList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBooksList: () => dispatch(actions.getBooksList())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Books);