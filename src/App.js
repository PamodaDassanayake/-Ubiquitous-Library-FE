import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Dashboard from "./views/Dashboard/Dashboard";

import * as actions from "./actions";
import indexRoutes from "./routes/indexRoutes";

class App extends React.Component {

    componentDidMount() {
        this.props.getAccountType();
    };

    render() {

        const routes = (
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return (
                        <Route path={prop.path} component={prop.component} key={key}/>
                    );
                })}
                <Redirect to="/dashboard"/>
            </Switch>
        );

        return (
            this.props.account_type === 'admin' || this.props.account_type === 'user' ? <Dashboard/> :
                <Router>
                    {routes}
                </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAccountType: () => dispatch(actions.getAccountType())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);