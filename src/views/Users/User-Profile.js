import React from "react";
import {
    Breadcrumb,
    Image,
    Col,
    Typography,
    Row,
    Button,
    Divider,
    Input,
    Tag
} from 'antd';
import * as actions from "../../actions";
import {connect} from "react-redux";
import moment from 'moment';
import {UserOutlined, CreditCardOutlined, NumberOutlined} from "@ant-design/icons";

const {Title, Text, Paragraph} = Typography;
const {TextArea} = Input;

class UserProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fromDate: '',
            toDate: '',
            availability: false,
            formSubmitted: false,
            comments: [],
            submitting: false,
            value: '',
            paymentModalVisible: false
        };
    };

    componentDidMount() {
        this.props.getUser();
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.user !== nextProps.user) {

        }
    };

    render() {
        const {} = this.state;
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Books</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col span={21} offset={3}>
                        <Row>
                            <Col span={6}>
                                <Image
                                    width={100}
                                    src={this.props.user !== null && this.props.user.imageUrl !== null ? this.props.user.imageUrl : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                                />
                            </Col>
                            {
                                this.props.user !== null && (
                                    <>
                                        <Col span={6}>
                                            <Title level={3}>{this.props.user.firstName} {this.props.user.lastName}</Title>
                                            <Title level={5}>@{this.props.user.login}</Title>
                                            {
                                                this.props.user.activated ?  <Tag color="#87d068">Active</Tag>
                                                    :  <Tag color="#f50">Inactive</Tag>
                                            }

                                        </Col>
                                    </>
                                )
                            }
                        </Row>
                        <Divider/>
                        <Row>
                            <Col span={6}>

                            </Col>
                            {
                                this.props.user !== null && (
                                    <>
                                        <Col span={6}>
                                            <Title level={5}>First Name :</Title>
                                            <Title level={5}>Last Name :</Title>
                                            <Title level={5}>Email :</Title>
                                        </Col>
                                        <Col span={12}>
                                            <Title level={5}>{this.props.user.firstName}</Title>
                                            <Title level={5}>{this.props.user.lastName}</Title>
                                            <Title level={5}>{this.props.user.email}</Title>
                                        </Col>
                                    </>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auths.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(actions.getLoggedUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile);