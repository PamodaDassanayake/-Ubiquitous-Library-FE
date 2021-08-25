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
    List,
    Form,
    Input,
    InputNumber, message, Modal
} from 'antd';
import * as actions from "../../../actions";
import {connect} from "react-redux";
import {CloudUploadOutlined} from "@ant-design/icons";

const {Title, Text, Paragraph} = Typography;

class EditBookDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            visibleUploadModal: false,
            imageUploaded: false,
            imageLink: '',
            editStatus: false
        };
    };

    componentDidMount() {
        const paths = window.location.pathname.split('/');
        this.props.getBookDetails(paths[3]);
    };

    onChange(date, dateString) {
        console.log(date, dateString);
    };

    edit = () => {
        this.setState({
            editStatus: true
        });
    };

    bookData = [];

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.book !== nextProps.book) {
            // eslint-disable-next-line no-unused-expressions
            this.props.book !== null ?
                this.bookData = [
                    this.props.book.author, this.props.book.publisher, this.props.book.isbn, this.props.book.edition, this.props.book.noOfCopies
                ] : null
        }
    };

    render() {
        const {visibleUploadModal, imageLink, imageUploaded, formSubmitted, editStatus} = this.state;

        const imageUploadModal = [
            <Modal title="Basic Modal" visible={visibleUploadModal} onOk={this.handleOk} onCancel={this.handleCancel}>
                <Text>Image Link</Text>
                <Input.TextArea onChange={this.getImageLink}/>
            </Modal>
        ];

        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Books</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.book.title}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    {
                        this.props.book != null ? (
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
                                        <Title level={3}>Book Details</Title>
                                        {
                                            !editStatus ? (<>
                                                <Row>
                                                    <Col span={8}>
                                                        <h3>Author</h3>
                                                        <h3>Publisher</h3>
                                                        <h3>ISBN</h3>
                                                        <h3>Edition</h3>
                                                        <h3>Copies</h3>
                                                    </Col>

                                                    <Col span={10}>
                                                        <h3>{this.props.book.author}</h3>
                                                        <h3>{this.props.book.publisher}</h3>
                                                        <h3>{this.props.book.isbn}</h3>
                                                        <h3>{this.props.book.edition}</h3>
                                                        <h3>{this.props.book.noOfCopies}</h3>
                                                    </Col>
                                                </Row>
                                                <Button type='primary' onClick={this.edit}>Edit</Button>
                                            </>) : (
                                                <>
                                                    <Form labelCol={{span: 4}}
                                                          wrapperCol={{span: 14}}
                                                          ref={this.formRef}
                                                          name="control-ref"
                                                          layout="horizontal"
                                                          onFinish={this.onFinish}
                                                          validateMessages={this.validateMessages}>
                                                        <Form.Item name={['book', 'name']} label="Book name"
                                                                   rules={[{type: 'string', required: true}]}>
                                                            <Input onChange={this.getBookName}
                                                                   value={this.props.book.title}/>
                                                        </Form.Item>
                                                        <Form.Item name={['book', 'author']} label="Author"
                                                                   rules={[{type: 'string', required: true}]}>
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item name={['book', 'publisher']} label="Publisher"
                                                                   rules={[{type: 'string', required: true}]}>
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item name={['book', 'isbn']} label="ISBN"
                                                                   rules={[{type: 'string', required: true}]}>
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item name={['book', 'edition']} label="Edition"
                                                                   rules={[{type: 'number', min: 1}]}>
                                                            <InputNumber/>
                                                        </Form.Item>
                                                        <Form.Item name={['book', 'Year']} label="Year"
                                                                   rules={[{type: 'number', min: 0, max: 2021}]}>
                                                            <InputNumber/>
                                                        </Form.Item>
                                                        <Form.Item name={['book', 'noOfCopies']} label="No of Copies">
                                                            <InputNumber/>
                                                        </Form.Item>
                                                        <Form.Item name={['user', 'image']} label="Image">
                                                            <div>
                                                                <Button type="dashed" shape="round"
                                                                        icon={<CloudUploadOutlined/>} size={"middle"}
                                                                        onClick={this.showUploadModal}>
                                                                    Upload
                                                                </Button>
                                                            </div>
                                                            {imageUploadModal}
                                                        </Form.Item>
                                                        <Form.Item wrapperCol={{span: 10, offset: 1}}>
                                                            <Button type="primary" htmlType="submit"
                                                                    loading={this.props.bookSubmitLoading}>
                                                                Submit
                                                            </Button>
                                                        </Form.Item>
                                                        {formSubmitted && this.props.bookSubmitSuccess && message.success('Book details has updated successfully!')}
                                                        {formSubmitted && this.props.bookSubmitError && message.error('Failed to update book details!')}
                                                    </Form>
                                                </>
                                            )
                                        }
                                    </Col>
                                </Row>
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
        book: state.books.book
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBookDetails: (bookId) => dispatch(actions.getBookDetails(bookId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditBookDetails);