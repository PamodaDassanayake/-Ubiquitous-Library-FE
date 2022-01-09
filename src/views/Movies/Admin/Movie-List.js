import React from "react";
import {Table, Tag, Input, Breadcrumb, Image, Divider} from 'antd';
import * as actions from "../../../actions";
import {connect} from "react-redux";

const {Search} = Input;

class MovieList extends React.Component {
    componentDidMount() {
        this.props.getMoviesList();
        this.props.getMoviesList();
    };


    editDetails = (id) => {
        this.props.history.push(`/dashboard/admin/editMovieDetails/${id}`);
    };

    columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: 'Movie Name',
            dataIndex: 'name',
            key: 'name',
            render: ([text, id]) => <a onClick={() => this.editDetails(id)}>{text}</a>,
        },
        {
            title: 'Director',
            dataIndex: 'director',
            key: 'director',
        },
        {
            title: 'Year',
            dataIndex: 'publishYear',
            key: 'publishYear',
        },
        {
            title: 'Studio',
            dataIndex: 'studio',
            key: 'studio',
        },
        {
            title: 'URL',
            dataIndex: 'videoUrl',
            key: 'videoUrl',
            render: (link) => <a href={link} target='_blank'>{link}</a>,
        },
        {
            title: 'Image',
            key: 'imageUrl',
            dataIndex: 'imageUrl',
            render: (link) => <Image src={link} width={50}/>
        },
    ];

    data = [];

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.moviesList !== nextProps.moviesList) {
            // eslint-disable-next-line no-unused-expressions
            this.props.moviesList.length > 0 ?
                this.props.moviesList.map((row, index) => {
                    const movie = {
                        "key": index + 1,
                        "id": row.id,
                        "name": [row.title, row.id],
                        "director": row.director,
                        "publishYear": row.publishYear,
                        "studio": row.studio,
                        "videoUrl": row.videoUrl,
                        "imageUrl": row.imageUrl,
                    };
                    this.data.push(movie);
                }) : null
        }
    };

    onSearch = value => console.log(value);

    render() {
        return (
            <>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Library</Breadcrumb.Item>
                    <Breadcrumb.Item>Movie List</Breadcrumb.Item>
                </Breadcrumb>
                <Search
                    placeholder="Search movie here..."
                    allowClear
                    enterButton="Search"
                    size="large"
                    style={{width: 800}}
                    onSearch={this.onSearch}
                />
                <Divider type='horizontal'/>
                {
                    this.data.length > 0 && <Table columns={this.columns} dataSource={this.data}/>
                }
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        account_type: state.auths.account_type,
        moviesList: state.movies.moviesList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMoviesList: () => dispatch(actions.getMoviesList())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieList);