import React from 'react';
import HeaderComponent from './Header';
import IconIssueComponent from './IconIssue';
import DateIssueComponent from './DateIssue';
import getIssues from '../lib/api/getIssues';
import renderLoading from '../lib/renderLoading';
import renderError from '../lib/renderError';
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

        this.getIssues = getIssues.bind(this);    
    }

    // set state with props here
    componentWillMount() {
        this.setState({
            user: this.props.user,
            repo: this.props.repo,
            // ...
        });
    }
    componentDidMount() {
        getIssues(this.state)
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
        });;
    }



    renderIssues() {
        if (this.state.error) {
            return renderError(this.state);
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
                                    <span className="column show-body has-text-right is-pulled-right green-icon">
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
                        renderLoading()
                        : this.renderIssues()}
                </nav></div>);
    }
}

export default Issues;
