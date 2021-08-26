import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, Input, Button, Row, Col, Layout, message, Typography, Image, Spin} from 'antd';
import {LockFilled, UserAddOutlined} from "@ant-design/icons";

import * as actions from "../../actions";
import Text from "antd/es/typography/Text";

import './index.less';

const {Title} = Typography;

const FormItem = Form.Item;

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    };

    componentDidMount() {
        this.props.getAccountType();
    };

    handleSubmit = (values) => {
        this.setState({
            loading: true
        });
        setTimeout(
            function () {
                this.props.setAccountType(values);
            }
                .bind(this),
            1000
        );
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.account_type !== nextProps.account_type) {
            console.log('login success');
            console.log(this.props.account_type)
            // eslint-disable-next-line no-unused-expressions
            this.props.account_type === 'admin' ? this.props.history.push('/dashboard') : (this.props.account_type === 'user') ? this.props.history.push('/dashboard') : (this.props.account_type === null) ? message.error('Invalid username or password') && this.setState({
                loading: false
            }) : null
        }
        if (this.props.invalid_login !== nextProps.invalid_login) {
            if (this.props.invalid_login) {
                return message.error('Invalid username or password');
                this.setState({
                    loading: false
                });
            }
        }

    };

    toRegister() {
        this.props.history.push('/register');
    };

    render() {
        // const { getFieldDecorator } = this.props.form
        return (
            <div style={{backgroundColor: '#eeeefc', minHeight: '100vh'}}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="8" span="16" style={{marginTop: '5%'}}>
                        <Row justify="space-around">
                            <Col span="8" span="10">
                                <Image
                                    preview={false}
                                    src="https://images.unsplash.com/photo-1555116505-38ab61800975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                                    alt="background"/>
                            </Col>
                            <Col span="8" span="14"
                                 style={{backgroundColor: '#ffffff', padding: '20px'}}>
                                <Spin spinning={this.state.loading}>
                                    <Title style={3} style={{color: '#ffffff'}}><span>Sign Up</span></Title>
                                    <Form layout="horizontal" size='large' onFinish={this.handleSubmit}
                                          className="login-form"
                                          style={{width: '400px', margin: 'auto', textAlign: 'center'}}>
                                        <h2><span>Sign In</span></h2>
                                        <FormItem name="username">
                                            {/*{getFieldDecorator('user')(*/}
                                            {/*    <Input prefix={<UserAddOutlined type="user" style={{ fontSize: 13 }} />} placeholder='admin' />*/}
                                            {/*)}*/}
                                            <Input prefix={<UserAddOutlined type="user" style={{fontSize: 13}}/>}
                                                   placeholder='Username'/>
                                        </FormItem>
                                        <FormItem name="password">
                                            {/*{getFieldDecorator('password')(*/}
                                            {/*    <Input prefix={<LockFilled type="lock" style={{ fontSize: 13 }} />} type='password' placeholder='123456' />*/}
                                            {/*)}*/}
                                            <Input prefix={<LockFilled type="lock" style={{fontSize: 13}}/>}
                                                   type='password'
                                                   placeholder='123456'/>
                                        </FormItem>

                                        <div>
                                            <Button className="btn-login"
                                                    block
                                                    style={{backgroundColor: '#01c097', color: '#ffffff'}}
                                                    size="middle"
                                                    shape='round'
                                                    loading={this.state.loading}
                                                    htmlType='submit'>Login</Button>
                                        </div>
                                        <div style={{padding: '20px'}}>
                                            <Text>Don't have an account?</Text>
                                            <Button type="link" size='small'>
                                            <span style={{color: '#01c097'}}
                                                  onClick={this.toRegister.bind(this)}>Sign Up</span>
                                            </Button>
                                        </div>
                                    </Form>
                                </Spin>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type,
        invalid_login: state.auths.invalid_login
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAccountType: () => dispatch(actions.getAccountType()),
        setAccountType: (account) => dispatch(actions.setAccountType(account))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);