import React from "react";
import {Breadcrumb, Form, Input, InputNumber, Button, Modal, Typography, Image, message} from 'antd';
import * as actions from "../../../actions";
import {connect} from "react-redux";
import {CloudUploadOutlined} from "@ant-design/icons";

const {Text} = Typography;

class AddBook extends React.Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            visibleUploadModal: false,
            imageUploaded: false,
            imageLink: ''
        };
    };

    onFinish = (values) => {
        console.log(values);
        this.setState({
            formSubmitted: true
        });
        const data = {
            title: values.book.name,
            author: values.book.author,
            edition: values.book.edition,
            isbn: values.book.isbn,
            publishYear: values.book.year,
            publisher: values.book.publisher,
            noOfCopies: values.book.noOfCopies,
            imageUrl: this.state.imageLink
        };

        this.props.addBook(data);
    };

    validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    showUploadModal = () => {
        this.setState({
            imageUploaded: false,
            visibleUploadModal: true
        });
    };

    handleOk = () => {
        this.setState({
            imageUploaded: true,
            visibleUploadModal: false
        });
    };

    handleCancel = () => {
        this.setState({
            visibleUploadModal: false
        });
    };

    getImageLink = (value) => {
        this.setState({
            imageLink: value.target.value
        });
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.bookSubmitSuccess !== nextProps.bookSubmitSuccess) {
            this.setState({
                imageUploaded: false,
                imageLink: ''
            });
            this.props.getBooksList();
            this.formRef.current.resetFields();
        }
    };

    render() {
        const {visibleUploadModal, imageLink, imageUploaded, formSubmitted} = this.state;

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
                    <Breadcrumb.Item>Add-new-book</Breadcrumb.Item>
                </Breadcrumb>
                <Form labelCol={{span: 6}}
                      wrapperCol={{span: 12}}
                      ref={this.formRef}
                      name="control-ref"
                      layout="horizontal"
                      onFinish={this.onFinish}
                      validateMessages={this.validateMessages}>
                    <Form.Item fieldKey='name' name={['book', 'name']} label="Book name"
                               rules={[{type: 'string', required: true}]}>
                        <Input onChange={this.getBookName}/>
                    </Form.Item>
                    <Form.Item fieldKey='author' name={['book', 'author']} label="Author"
                               rules={[{type: 'string', required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item fieldKey='publisher' name={['book', 'publisher']} label="Publisher"
                               rules={[{type: 'string', required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item fieldKey='isbn' name={['book', 'isbn']} label="ISBN"
                               rules={[{type: 'string', required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item fieldKey='edition' name={['book', 'edition']} label="Edition"
                               rules={[{type: 'number', min: 1}]}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item fieldKey='Year' name={['book', 'year']} label="Year"
                               rules={[{type: 'number', min: 0, max: 2021}]}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item fieldKey='noOfCopies' name={['book', 'noOfCopies']} label="No of Copies">
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item fieldKey='image' name={['user', 'image']} label="Image">
                        <div>
                            <Button type="dashed" shape="round" icon={<CloudUploadOutlined/>} size={"middle"}
                                    onClick={this.showUploadModal}>
                                Upload
                            </Button>
                        </div>
                        {imageUploadModal}
                        {imageUploaded != '' ?
                            (<div style={{marginTop: '10px'}}>
                                <Image
                                    width={150}
                                    src={imageLink}/>
                            </div>)
                            : null
                        }
                    </Form.Item>
                    <Form.Item fieldKey='submit' wrapperCol={{span: 14, offset: 6}}>
                        <Button type="primary" htmlType="submit" loading={this.props.bookSubmitLoading}>
                            Submit
                        </Button>
                    </Form.Item>
                    {formSubmitted && this.props.bookSubmitSuccess && message.success('New Book has added successfully!') && this.setState({formSubmitted : false})}
                    {formSubmitted && this.props.bookSubmitError && message.error('Failed adding new book!')}
                </Form>
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type,
        booksList: state.books.booksList,
        bookSubmitError: state.books.bookSubmitError,
        bookSubmitErrorMessage: state.books.bookSubmitErrorMessage,
        bookSubmitSuccess: state.books.bookSubmitSuccess,
        bookSubmitLoading: state.books.bookSubmitLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addBook: (book) => dispatch(actions.addBook(book)),
        getBooksList: () => dispatch(actions.getBooksList())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBook);