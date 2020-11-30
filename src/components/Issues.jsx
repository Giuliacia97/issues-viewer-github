import React from 'react';
import HeaderComponent from './Header';
import IconIssueComponent from './IconIssue';
import DateIssueComponent from './DateIssue';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as appHelpers from '../utils/appHelpers';
import 'bulma/css/bulma.css';
import '../css/Issues.css';
/**
 *
 *
 * @class Issues
 * @extends {React.Component}
 */
class Issues extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            repo: '',
            listFilter: { state: "open", choice: "issues" },
            per_page: 40,
            sort: "created",
            page: '',
            currentPageNumber: 1,
            pages: {},
            issues: [],
            loading: true,
            error: null,
            showBody: {},
        };

        this.getIssues = this.getIssues.bind(this);    }

    // set state with props here
    componentWillMount() {
        this.setState({
            user: this.props.user,
            repo: this.props.repo,
            // ...
        });
    }
    componentDidMount() {
        this.getIssues();
    }
    getIssues() {
        // Github API
        const headers = {
            headers: {
                Authorization: "token 60e07ff280c786e523a632be9af8f992270a5c5b",
                Accept: "application/vnd.github.v3+json,application/vnd.github.machine-man-preview+json",
            }
        };

        const baseUrl = "https://api.github.com/repos"

        const params = appHelpers.encodeQueryString({ state: this.state.listFilter.state, per_page: 40, sort: "created" })
        let repoOfUser = `${this.state.user}/${this.state.repo}/issues`
        let fullUrl = `${baseUrl}/${repoOfUser}${params}${this.state.page}`

        fetch(fullUrl, headers)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Request failed.');
            })
            .then(data => {
                // set our state with the response
                this.setState({
                    issues: data,
                    loading: false,
                    error: null,
                    showBody: {},
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error
                });
            });
    }
    renderLoading() {
        return <progress className="progress is-large is-dark" max="100"></progress>;
    }
    renderError() {
        return (
            <div>
                Oh no!  {this.state.error.message}
            </div>
        );
    }


    renderIssues() {
        if (this.state.error) {
            return this.renderError();
        }

        // set state to show or hide issue/pr body for a particular panel-block
        const isVisible = (id) => {
            return this.state.showBody["_" + id] ? " container bodyContainer" : " is-hidden"
        }
        const handleClick = (e) => {
            e.preventDefault();
            let obj = {}
            const id = e.currentTarget.dataset.id;
            obj["_" + id] = this.state.showBody["_" + id] === true ? false : true
            this.setState({ showBody: obj })
            if (obj["_" + id]) {
                this.state.issues.map(function (issues) {
                    if (issues.id === +id) {
                        return document.querySelector(`._${id}`).innerHTML = appHelpers.converter.makeHtml(issues.body)
                    }
                    return true
                })
            }

        }
        return (
            < React.Fragment >
                {
                    this.state.issues.map(function (data, index) {

                        return <a href="#" key={index} className={"panel-block panel-issue"}>
                            <span data-id={data.id} className="panel-ovr" onClick={handleClick} >
                                <span className="columns is-mobile is-multiline is-vcentered is-2 panel-issue">
                                    <span className=" column is-1">
                                        <span className="panel-icon icon is-small">
                                            <IconIssueComponent type={!data.pull_request} state={data.state} />
                                        </span>
                                    </span>
                                    <span className="column is-11 info-container">
                                        <span className="_title">{data.title}</span>
                                        <br className="is-hidden-tablet" />
                                        <span className="time is-hidden-tablet">
                                            <DateIssueComponent data={data} />
                                        </span>
                                        <br className="is-hidden-tablet" />
                                        <br className="is-hidden-mobile" />
                                        <span className="time is-hidden-mobile">
                                            <DateIssueComponent data={data} />
                                        </span>
                                    </span>
                                    <span className="column show-body has-text-right is-pulled-right purple-icon">
                                        <FontAwesomeIcon icon={faEye} />
                                    </span>
                                </span>
                            </span>
                            <span className={"_" + data.id + (isVisible(data.id))}></span>
                        </a>;
                    })
                }

            </ React.Fragment>
        );
    }
    render() {

        return (

            <div className="container">
                <nav className="panel">
                    <HeaderComponent listFilter={this.state.listFilter} user={this.state.user} repo={this.state.repo}/>
                    {this.state.loading ?
                        this.renderLoading()
                        : this.renderIssues()}
                </nav></div>);
    }
}

export default Issues;
