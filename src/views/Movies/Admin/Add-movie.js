import React from "react";
import {Breadcrumb, Form, Input, InputNumber, Button, Modal, Typography, Image, message} from 'antd';
import {CloudUploadOutlined} from "@ant-design/icons";
import * as actions from "../../../actions";
import {connect} from "react-redux";

const {Text} = Typography;

class AddMovie extends React.Component {

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
        if (this.props.movieSubmitSuccess !== nextProps.movieSubmitSuccess) {
            this.setState({
                imageUploaded: false,
                imageLink: ''
            });
            this.props.getMoviesList();
            this.formRef.current.resetFields();
        }
    };

    onFinish = (values) => {
        values.imageUrl = this.state.imageLink;
        this.setState({
            formSubmitted: true
        });
        this.props.addMovie(values);
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
                    <Breadcrumb.Item>Add-new-movie</Breadcrumb.Item>
                </Breadcrumb>
                <Form labelCol={{span: 6}}
                      wrapperCol={{span: 12}}
                      layout="horizontal"
                      ref={this.formRef}
                      name="control-ref"
                      onFinish={this.onFinish}
                      validateMessages={this.validateMessages}>
                    <Form.Item name={'title'} label="Movie name" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'director'} label="Director" rules={[{type: 'string'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'publishYear'} label="Year">
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name={'studio'} label="Studio" rules={[{type: 'string'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'imageUrl'} label="Image">
                        <Button type="dashed" shape="round" icon={<CloudUploadOutlined/>} size={"middle"}
                                onClick={this.showUploadModal}>
                            Upload Movie Thumbnail
                        </Button>
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
                    <Form.Item name={'videoUrl'} label="Video URL">
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item wrapperCol={{span: 14, offset: 6}}>
                        <Button type="primary" htmlType="submit" loading={this.props.movieSubmitLoading}>
                            Submit
                        </Button>
                    </Form.Item>
                    {formSubmitted && this.props.movieSubmitSuccess && message.success('New Movie has added successfully!') && this.setState({formSubmitted : false})}
                    {formSubmitted && this.props.movieSubmitError && message.error('Failed adding new movie!')}
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type,
        movieSubmitError: state.movies.movieSubmitError,
        movieSubmitErrorMessage: state.movies.movieSubmitErrorMessage,
        movieSubmitSuccess: state.movies.movieSubmitSuccess,
        movieSubmitLoading: state.movies.movieSubmitLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addMovie: (movie) => dispatch(actions.addMovie(movie)),
        getMoviesList: () => dispatch(actions.getMoviesList())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddMovie);