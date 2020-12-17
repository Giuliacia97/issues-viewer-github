import React, { useEffect } from "react";
import Logo from "../img/logo.png"
import IssuesHook from "../hooks/IssuesHooks";


const HeaderComponent = ({user, repo}) => {
    const { avatarUrl, getAvatarUrl } = IssuesHook();

    useEffect(() => {
        getAvatarUrl(user, repo);
      }, []);
        return (
            <nav className="navbar is-fixed-top navbar-center panel-heading" role="navigation">
                <div className="navbar-brand navbar-left" >
                    <span className="navbar-item" >
                            <p className="gold-color">Name repository: </p><strong className="gold-color">{repo}</strong>
                    </span>
                </div>
                <div className="navbar-brand" >
                    <img className="img-item" src={Logo} alt="logo"/>
                </div>
                <div className="navbar-brand navbar-right" >
                    <span className="navbar-item pl-0">
                        <p className="gold-color pr-2">Name author: </p>
                        <img src={avatarUrl} alt={`${user}/${repo}`} width="30px"/>
                        <strong className="gold-color">{user}</strong>
                    </span>
                </div>
            </nav>
        );
}
export default HeaderComponent;