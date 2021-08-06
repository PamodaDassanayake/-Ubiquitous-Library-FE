import React from "react";
import {
    Breadcrumb,
    Image,
    Space,
    Col,
    Typography,
    Row,
    Button,
    Divider,
    Form,
    Input,
    InputNumber, message, Modal, Comment, Avatar, Tooltip
} from 'antd';
import * as actions from "../../../actions";
import {connect} from "react-redux";
import {CloudUploadOutlined} from "@ant-design/icons";
import moment from "moment";

const {Title, Text} = Typography;

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

class EditMovieDetails extends React.Component {

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
        this.props.getMovieDetails(paths[4]);
    };

    onChange(date, dateString) {
    };

    edit = () => {
        this.setState({
            editStatus: true
        });
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
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
                                        <Title level={1}>{this.props.movie.name}</Title>
                                        {
                                            !editStatus ? (
                                                <>
                                                    <Title level={4}>Published Year : {this.props.movie.publishYear}</Title>
                                                    <Title level={4}>Studio : {this.props.movie.studio} presents</Title>
                                                    <Title level={4}>Director : {this.props.movie.director}</Title>
                                                </>) : (
                                                <>
                                                    <Form labelCol={{span: 6}}
                                                          wrapperCol={{span: 12}}
                                                          layout="horizontal"
                                                          ref={this.formRef}
                                                          name="control-ref"
                                                          onFinish={this.onFinish}
                                                          validateMessages={this.validateMessages}>
                                                        <Form.Item name={'name'} label="Movie name"
                                                                   rules={[{required: true}]}>
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item name={'director'} label="Director"
                                                                   rules={[{type: 'string'}]}>
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item name={'publishYear'} label="Year">
                                                            <InputNumber/>
                                                        </Form.Item>
                                                        <Form.Item name={'studio'} label="Studio"
                                                                   rules={[{type: 'string'}]}>
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item name={'imageUrl'} label="Image">
                                                            <Button type="dashed" shape="round"
                                                                    icon={<CloudUploadOutlined/>} size={"middle"}
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
                                                            <Button type="primary" htmlType="submit"
                                                                    loading={this.props.movieSubmitLoading}>
                                                                Submit
                                                            </Button>
                                                        </Form.Item>
                                                        {formSubmitted && this.props.movieSubmitSuccess && message.success('New Movie has added successfully!')}
                                                        {formSubmitted && this.props.movieSubmitError && message.error('Failed adding new movie!')}
                                                    </Form>
                                                </>
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Divider/>
                                <Title level={3}>Description <span style={{color: 'grey'}}>Reviews ({this.props.comments.length})</span></Title>
                                <Divider/>
                                <Space direction='vertical'>
                                    {
                                        this.props.comments !== null && this.props.comments.length > 0 ?
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
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type,
        movie: state.movies.movie,
        comments: state.movies.comments,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMovieDetails: (movieId) => dispatch(actions.getMovieDetails(movieId)),
        getCommentsForMovie: (bookId) => dispatch(actions.getMovieComments(bookId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditMovieDetails);