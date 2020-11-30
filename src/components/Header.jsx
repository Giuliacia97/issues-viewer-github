import React from 'react';
import Logo from "../img/logo.png"

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: ""
        };
    }

    render() {
        return (
            <nav className="navbar is-fixed-top navbar-center panel-heading" role="navigation">
                <div className="navbar-brand navbar-left" >
                    <span className="navbar-item" >
                            <p className="gold-color">Name repository: </p><strong className="gold-color">{this.props.repo}</strong>
                    </span>
                </div>
                <div className="navbar-brand" >
                    <img className="img-item" src={Logo} alt="logo"/>
                </div>
                <div className="navbar-brand navbar-right" >
                    <span className="navbar-item" >
                            <p className="gold-color">Name author: </p><strong className="gold-color">{this.props.user}</strong>
                    </span>
                </div>
            </nav>
        );
    }
}
export default HeaderComponent;