import React from "react";
import {Layout, Menu, Modal} from 'antd';
import {
    TeamOutlined,
    UserOutlined, OrderedListOutlined, ExclamationCircleOutlined, LoginOutlined, BookFilled, VideoCameraFilled,
} from '@ant-design/icons';
import {Route, Redirect, Link, withRouter, Switch} from "react-router-dom";
import {connect} from "react-redux";

import Books from "../Books/Books";
import Movies from "../Movies/Movies";
import Reservations from "../Reservations/Reservations";
import AddBook from "../Books/Admin/Add-book";
import BookList from "../Books/Admin/Book-List";
import AddMovie from "../Movies/Admin/Add-movie";
import MovieList from "../Movies/Admin/Movie-List";

import * as actions from "../../actions";
import ViewBookDetails from "../Books/ViewBookDetails";
import EditBookDetails from "../Books/Admin/EditBookDetails";
import InventoryBooks from "../Books/Admin/Inventory-books";
import EditMovieDetails from "../Movies/Admin/EditMovieDetails";
import ViewMovieDetails from "../Movies/ViewMovieDetails";
import UserList from "../Users/User-List";
import UserReservations from "../Reservations/Admin/User-Reservations";
import UserProfile from "../Users/User-Profile";
import CsvBooks from "../Books/Admin/Csv-books";
import RequestedBooks from "../Books/Admin/Requested-books";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const {confirm} = Modal;

class Dashboard extends React.Component {
    state = {
        collapsed: false,
        user: 'admin'
    };

    componentDidMount() {
        this.props.getAccountType();
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    signOut = () => {
        return confirm({
            title: 'Do you sign out?',
            icon: <ExclamationCircleOutlined/>,
            content: '',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(
                        function () {
                            this.props.signOutSystem();
                            this.props.history.push('/');
                        }
                            .bind(this),
                        2000
                    );
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {
            },
        });
    };

    signIn = () => {
        this.props.history.push('/login');
    };

    render() {
        const {collapsed} = this.state;

        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        {
                            this.props.account_type === 'admin' ? (
                                <>
                                    <SubMenu key="books" icon={<UserOutlined/>} title="Books">
                                        <Menu.Item key="1">
                                            <Link to='/dashboard/admin/book-list'/>
                                            Book List
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Link to='/dashboard/admin/add-new-book'/>
                                            Add Book
                                        </Menu.Item>
                                        <Menu.Item key="3">
                                            <Link to='/dashboard/admin/inventory'/>
                                            Inventory
                                        </Menu.Item>
                                        <Menu.Item key="4">
                                            <Link to='/dashboard/admin/csv'/>
                                            CSV
                                        </Menu.Item>
                                        <Menu.Item key="10">
                                            <Link to='/dashboard/admin/requested'/>
                                            Requested Books
                                        </Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="movies" icon={<TeamOutlined/>} title="Movies">
                                        <Menu.Item key="3">
                                            <Link to='/dashboard/admin/movie-list'/>
                                            Movie List
                                        </Menu.Item>
                                        <Menu.Item key="4">
                                            <Link to='/dashboard/admin/add-new-movie'/>
                                            Add Movie
                                        </Menu.Item>
                                    </SubMenu>
                                    <Menu.Item key="5" icon={<UserOutlined/>}>
                                        <Link to='/dashboard/admin/user-list'/>
                                        Users
                                    </Menu.Item>
                                    <Menu.Item key="6" icon={<OrderedListOutlined/>}>
                                        <Link to='/dashboard/admin/user-reservation-list'/>
                                        Reservations
                                    </Menu.Item>
                                </>
                            ) : (<>
                                <Menu.Item key="1" icon={<BookFilled/>}>
                                    <Link to='/dashboard/books'/>
                                    Books
                                </Menu.Item>
                                <Menu.Item key="2" icon={<VideoCameraFilled/>}>
                                    <Link to='/dashboard/movies'/>
                                    Movies
                                </Menu.Item>
                                {this.props.account_type === 'user' &&
                                <Menu.Item key="3" icon={<OrderedListOutlined/>}>
                                    <Link to='/reservations'/>
                                    Reservations
                                </Menu.Item>}
                            </>)
                        }

                        {
                            this.props.account_type !== '' &&
                           <>
                               <Menu.Item key="7" icon={<UserOutlined/>}>
                                   <Link to='/profile'/>
                                   Profile
                               </Menu.Item>
                               <Menu.Item key="8" icon={<LoginOutlined/>} onClick={() => this.props.signOutSystem()}>
                                   Sign Out
                               </Menu.Item>
                           </>
                        }
                        {
                            this.props.account_type === '' &&
                            <Menu.Item key="8" icon={<LoginOutlined/>} onClick={this.signIn}>
                                Sign In
                            </Menu.Item>
                        }

                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{backgroundColor: '#edf3f4'}}>
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Switch>
                                {/*user routes*/}
                                <Route exact path='/dashboard/books' component={Books}/>
                                <Route exact path='/dashboard/bookInfo/:bookId' component={ViewBookDetails}/>
                                <Route exact path='/dashboard/movies' component={Movies}/>
                                <Route exact path='/dashboard/movieInfo/:movieId' component={ViewMovieDetails}/>
                                <Route exact path='/reservations' component={Reservations}/>
                                <Route exact path='/profile' component={UserProfile}/>

                                {/*admin routes*/}
                                <Route path='/dashboard/admin/add-new-book' component={AddBook}/>
                                <Route exact path='/dashboard/admin/book-list' component={BookList}/>
                                <Route exact path='/dashboard/admin/editBookDetails/:bookId'
                                       component={EditBookDetails}/>
                                <Route exact path='/dashboard/admin/inventory' component={InventoryBooks}/>
                                <Route exact path='/dashboard/admin/csv' component={CsvBooks}/>
                                <Route exact path='/dashboard/admin/requested' component={RequestedBooks}/>
                                <Route exact path='/dashboard/admin/csv' component={BookList}/>
                                <Route exact path='/dashboard/admin/requested' component={BookList}/>
                                <Route exact path='/dashboard/admin/add-new-movie' component={AddMovie}/>
                                <Route exact path='/dashboard/admin/movie-list' component={MovieList}/>
                                <Route exact path='/dashboard/admin/editMovieDetails/:movieId'
                                       component={EditMovieDetails}/>
                                <Route exact path='/dashboard/admin/user-list' component={UserList}/>
                                <Route exact path='/dashboard/admin/user-reservation-list'
                                       component={UserReservations}/>
                                {
                                    this.props.account_type === 'admin' ?
                                        <Redirect to='/dashboard/admin/book-list'/> : <Redirect to='/dashboard/books'/>
                                }
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ubiquitous ©2021</Footer>
                </Layout>
            </Layout>
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
        getAccountType: () => dispatch(actions.getAccountType()),
        signOutSystem: () => dispatch(actions.signOut()),
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Dashboard)
);