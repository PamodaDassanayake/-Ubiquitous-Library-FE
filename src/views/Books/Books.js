import React from "react";
import {Breadcrumb, Card, Col, Row, Typography, Image, Empty, Input, Divider, message, List, Button} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";

const {Search} = Input;
const {Text} = Typography;

class Books extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBooks: false,
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

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.searchBooks && (this.props.requestBookSuccess !== nextProps.requestBookSuccess)) {
            this.setState({searchBooks: false});
            message.success("Request successfully placed!");
            this.props.getBooksList();
        }
    };

    onSearch = (value) => {
        this.setState({
            searchBooks: true
        });
        this.props.searchBooks(value, '');
        this.props.googleBooks(value);
    };

    requestThisBook = (book) => {
        console.log(book)
        this.props.requestBook(book);
    };

    render() {
        const {ellipsis} = this.state;
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Books</Breadcrumb.Item>
                </Breadcrumb>
                <Search
                    placeholder="Search book here..."
                    allowClear
                    enterButton="Search"
                    size="large"
                    style={{width: 800}}
                    onSearch={this.onSearch}
                />
                <Divider type='horizontal'/>
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
                    {
                        this.state.searchBooks && (
                            <>
                                <Divider/>
                                <h3>More results...</h3>
                                <Row justify="space-around" gutter={[16, 24]}>
                                    {
                                        this.props.googleBooksList !== null && this.props.googleBooksList.length !== 0 ?
                                            this.props.googleBooksList.map((row, index) => (
                                                <Col key={index} className="gutter-row" span={6}>
                                                    <Card
                                                        key={index}
                                                        hoverable
                                                        style={ellipsis ? {width: 160} : undefined}
                                                        cover={<Image height={240} src={row.imageUrl} preview={false}/>}
                                                        bordered={false} onClick={() => this.viewBookDetails(row.id)}>
                                                        <Text ellipsis={ellipsis ? {tooltip: row.title} : false}>{row.title}</Text>
                                                    </Card>
                                                    <Button type='primary' shape='round'
                                                            onClick={() => this.requestThisBook(row)}>Request this</Button>
                                                </Col>
                                            )) : <List/>
                                    }
                                </Row>
                            </>
                        )
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type,
        booksList: state.books.booksList,
        googleBooksList: state.books.googleBooksList,
        requestBookLoading: state.books.requestBookLoading,
        requestBookSuccess: state.books.requestBookSuccess,
        requestBookError: state.books.requestBookError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBooksList: () => dispatch(actions.getBooksList()),
        searchBooks: (title, author) => dispatch(actions.searchBooks(title, author)),
        googleBooks: (bookName) => dispatch(actions.searchGoogleBooks(bookName)),
        requestBook: (book) => dispatch(actions.requestGoogleBook(book)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Books);