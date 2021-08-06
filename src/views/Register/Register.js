import React from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Card,
    Typography,
    Badge,
    Divider,
    Spin,
    message,
    Modal,
    Empty,
    Image
} from 'antd';
import {LockFilled, MailFilled, UserAddOutlined, CheckCircleTwoTone, UploadOutlined} from "@ant-design/icons";
import {connect} from "react-redux";

import * as actions from "../../actions";

const {Title, Text} = Typography;

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            step: 1,
            pricePlan: '',
            colorCode: '',
            submitted: false,
            visibleUploadModal: false,
            isWelcomeModalVisible: false,
            imageUploaded: false,
            imageLink: ''
        }
    };

    componentDidMount() {
        this.props.getMemberships();
    };

    handleSubmit = (values) => {
        this.setState({
            submitted: true
        });

        const userData = {
            "activated": true,
            "authorities": [
                "ROLE_USER"
            ],
            "createdBy": "System",
            "email": values.email,
            "firstName": values.firstName,
            "imageUrl": this.state.imageLink,
            "langKey": "en",
            "lastName": values.lastName,
            "login": values.login,
            "password": values.password
        };

        this.props.registerUser(this.state.pricePlan.type, userData);

    };

    toLogin = () => {
        this.props.history.push('/login');
    };

    choosePricingPlan = (plan, colorCode) => {
        this.setState({
            loading: true,
            pricePlan: plan,
            colorCode: colorCode
        });
        setTimeout(
            function () {
                this.setState({
                    loading: false,
                    step: 2
                });
            }
                .bind(this),
            1000
        );

    };

    changePricePlan = () => {
        this.setState({
            step: 1
        });
    };


    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.userRegisterSuccess !== nextProps.userRegisterSuccess) {
            this.setState({
                submitted: false,
                isWelcomeModalVisible: true
            });
        } else if (this.props.userRegisterError) {
            this.setState({
                submitted: false
            });
        }
    };

    signIn = () => {
        this.props.history.push('/login');
    };

    applyPlanColor = (plan) => {
        switch (plan) {
            case "Platinum":
                return "#FF5733";
            case "Gold":
                return "#DAA520";
            case "Silver":
                return "#C0C0C0";
            case "Bronze":
                return "#cd7f32";
        }
    };

    uploadImage = () => {
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

    render() {
        const {visibleUploadModal, imageLink, imageUploaded} = this.state;

        const imageUploadModal = [
            <Modal title="Uploader" visible={visibleUploadModal} onOk={this.handleOk} onCancel={this.handleCancel}>
                <Text>Image Link</Text>
                <Input.TextArea onChange={this.getImageLink}/>
            </Modal>
        ];

        const customerPlan = [
            <Row className="register-row" type="flex" justify="space-around" align="middle">
                <Col span="16" style={{marginTop: '10%'}}>
                    <div className="site-card-wrapper">
                        <Text style={{color: '#fa3b3a', fontWeight: 'bold'}}>BEST PRICING</Text>
                        <h1 style={{fontSize: '33px', fontWeight: 'bold'}}>Check our Pricing Plan</h1>
                        <Spin spinning={this.state.loading}>
                            <Row gutter={16}>
                                {
                                    this.props.memberships.length > 0 ?
                                        this.props.memberships.map((row, index) => (
                                            <Col span={6}>
                                                <Badge.Ribbon text={row.type + ' Plan'} placement='start'
                                                              color={this.applyPlanColor(row.type)}>
                                                    <Card bordered hoverable>
                                                        <Divider/>
                                                        <p style={{
                                                            fontSize: '30px',
                                                            fontWeight: 'bold',
                                                            margin: '0'
                                                        }}>Rs. {row.annualFee}</p>
                                                        <p style={{color: 'gray'}}>per year</p>
                                                        <h4>{row.booksPerUser} Books per user</h4>
                                                        <h4>{row.videosPerUser} Videos per user</h4>
                                                        <h4>{row.bookLendingDurationDays} days Book lending
                                                            duration</h4>
                                                        <h4>{row.videoLendingDurationDays} days Video lending
                                                            duration</h4>
                                                        <Button type='primary' danger
                                                                onClick={() => this.choosePricingPlan(row, this.applyPlanColor(row.type))}>GET
                                                            NOW</Button>
                                                    </Card>
                                                </Badge.Ribbon>
                                            </Col>
                                        )) : <Empty/>
                                }
                            </Row>
                        </Spin>
                    </div>
                </Col>
            </Row>
        ];

        const regForm = [
            <Row type="flex" justify="space-around" align="middle">
                <Col span="8" span="16" style={{marginTop: '10%'}}>
                    <Spin tip="Loading..." spinning={this.state.submitted}>
                        <Row justify="space-around">
                            <Col span="8" span="12" style={{backgroundColor: '#01c097', padding: '50px'}}>
                                <Title style={3} style={{color: '#ffffff'}}><span>Sign Up</span></Title>
                                <p style={{color: '#ffffff'}}>Selected Plan</p>
                                <Badge>
                                    <Badge.Ribbon text={this.state.pricePlan.type + ' Plan'} placement='start'
                                                  color={this.state.colorCode}
                                                  style={{width: 'fit-content', margin: 'auto'}}>
                                        <Card bordered hoverable style={{width: 'fit-content', margin: 'auto'}}>
                                            <Divider/>
                                            <p style={{
                                                fontSize: '30px',
                                                fontWeight: 'bold',
                                                margin: '0'
                                            }}>Rs.{this.state.pricePlan.annualFee}</p>
                                            <p style={{color: 'gray'}}>per year</p>
                                            <h4>{this.state.pricePlan.booksPerUser} Books per user</h4>
                                            <h4>{this.state.pricePlan.videosPerUser} Videos per user</h4>
                                            <h4>{this.state.pricePlan.bookLendingDurationDays} days Book lending
                                                duration</h4>
                                            <h4>{this.state.pricePlan.videoLendingDurationDays} days Video lending
                                                duration</h4>
                                            <a style={{color: '#01c097'}} onClick={this.changePricePlan}>Change</a>
                                        </Card>
                                    </Badge.Ribbon>
                                </Badge>
                            </Col>
                            <Col span="8" span="12"
                                 style={{backgroundColor: '#ffffff', padding: '50px', paddingTop: '100px'}}>

                                <Form layout="horizontal" className="register-form" onFinish={this.handleSubmit}>
                                    {/*<Form.Item*/}
                                    {/*    name='image'*/}
                                    {/*>*/}
                                    {/*    <Button type="dashed" shape="round" icon={<UploadOutlined/>}*/}
                                    {/*            onClick={this.uploadImage}>Upload Image</Button>*/}
                                    {/*    {imageUploadModal}*/}
                                    {/*    {imageUploaded != '' ?*/}
                                    {/*        (<div style={{marginTop: '10px'}}>*/}
                                    {/*            <Image*/}
                                    {/*                width={150}*/}
                                    {/*                src={imageLink}/>*/}
                                    {/*        </div>)*/}
                                    {/*        : null*/}
                                    {/*    }*/}
                                    {/*</Form.Item>*/}
                                    <Form.Item
                                        name='login'
                                        rules={[{
                                            required: true,
                                            message: 'Please input your username!',
                                            whitespace: false
                                        }]}
                                    >
                                        <Input prefix={<UserAddOutlined style={{fontSize: 13}}/>}
                                               placeholder='Username'/>
                                    </Form.Item>
                                    <Form.Item
                                        name="firstName"
                                        rules={[{
                                            required: true,
                                            message: 'Please input your first name!',
                                            whitespace: true
                                        }]}
                                    >
                                        <Input prefix={<UserAddOutlined style={{fontSize: 13}}/>}
                                               placeholder='First Name'/>
                                    </Form.Item>
                                    <Form.Item
                                        name="lastName"
                                        rules={[{
                                            required: true,
                                            message: 'Please input your last name!',
                                            whitespace: true
                                        }]}
                                    >
                                        <Input prefix={<UserAddOutlined style={{fontSize: 13}}/>}
                                               placeholder='Last Name'/>
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                            {whitespace: true}
                                        ]}
                                    >
                                        <Input prefix={<MailFilled style={{fontSize: 13}}/>}
                                               placeholder='Email'/>
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!'
                                            },
                                            {
                                                min: 4,
                                                message: 'Please enter password with minimum 4 character 4'
                                            }
                                        ]}
                                        hasFeedback
                                    >
                                        <Input prefix={<LockFilled style={{fontSize: 13}}/>} type='password'
                                               placeholder='Password'/>
                                    </Form.Item>
                                    <Form.Item
                                        name="confirm"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            {
                                                min: 4,
                                                message: 'Please enter password with minimum 4 character 4'
                                            },
                                            ({getFieldValue}) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input prefix={<LockFilled style={{fontSize: 13}}/>} type='password'
                                               placeholder='Confirm password'/>
                                    </Form.Item>
                                    <>
                                        <Button className="btn-register" size="large"
                                                loading={this.state.loading} htmlType='submit' shape='round'
                                                style={{backgroundColor: '#01c097', color: '#ffffff'}}>Sign
                                            up</Button> or

                                        <Button type="link" size='large' onClick={this.toLogin}>
                                            <span style={{color: '#01c097'}}>Log in</span>
                                        </Button>
                                    </>
                                </Form>
                            </Col>
                        </Row>
                    </Spin>
                </Col>
            </Row>
        ];

        return (
            <div style={{backgroundColor: '#eeeefc', minHeight: '100vh'}}>
                {this.state.step === 1 ?
                    <div style={{
                        textAlign: 'center'
                    }}>
                        {customerPlan}
                    </div> :
                    <div style={{
                        textAlign: 'center'
                    }}>
                        {regForm}
                    </div>}
                {this.props.userRegisterError && message.error("Something went Wrong...")}
                <Modal title="Hooray!!!" visible={this.state.isWelcomeModalVisible}
                       footer={
                           [
                               <Button
                                   style={{backgroundColor: '#01c097', color: '#ffffff'}}
                                   shape='round'
                                   size='large'
                                   onClick={this.signIn}
                               >
                                   Sign in
                               </Button>,
                           ]}
                >
                    <div style={{textAlign: 'center'}}>
                        <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: '70px'}}/>
                        <Title level={2}>Success</Title>
                        <Title level={4}>Congratulations, your account has been successfully created.</Title>
                    </div>
                </Modal>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        memberships: state.auths.memberships,
        newUser: state.auths.newUser,
        userRegisterError: state.auths.userRegisterError,
        userRegisterErrorMessage: state.auths.userRegisterErrorMessage,
        userRegisterSuccess: state.auths.userRegisterSuccess,
        userRegisterLoading: state.auths.userRegisterLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMemberships: () => dispatch(actions.getMemberships()),
        registerUser: (membership, userDetails) => dispatch(actions.registerUser(membership, userDetails))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
