import ClassName from "classnames";
import * as React from "react";
import {WithTranslation, withTranslation} from "react-i18next";
import {NavLink as RRNavLink} from "react-router-dom";
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {CONTRACT_URL} from "../config/config";
import {IconButton} from "../reusable/index";

const Style = require("./Header.scss");
const logo = require("assets/images/logo.png");
const metamask = require("assets/images/metamask-fox.svg");
const ftLine1 = require("assets/images/ft-line-1.png");
const ftLine2 = require("assets/images/ft-line-2.png");

interface Props extends WithTranslation {
    authenticated: boolean;
    showChat: boolean;
    nightMode: boolean;
    toggleChat(show: boolean): void;
    authenticate(): void;   
    showRegisterModal(): void;
    toggleTheme(nightMode: boolean): void;
}

type State = {
    isOpen: boolean;
    showRegister: boolean;
};

class Header extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
            showRegister: false,
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    onToggleChat = () => {
        const {showChat, toggleChat} = this.props;
        toggleChat(!showChat);
    };

    onToggleTheme = () => {
        const {nightMode, toggleTheme} = this.props;
        toggleTheme(!nightMode);
    };

    render() {
        const {authenticated, showRegisterModal, showChat, nightMode, t} = this.props;
        const {isOpen} = this.state;

        const className = ClassName({
            "container-chat-open": showChat,
        });

        return (
            <Navbar id="header" expand="md" style={{height: "82px", backgroundColor: "#08090B"}}>
                <Container className={className}>
                    <NavbarBrand tag={RRNavLink} to="/">
                        <div className={Style.brandImageContainer}>
                            <img className={Style.brandImage} src={logo} />
                        </div>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar style={{position: "absolute", right: "100px"}}> {/* Change */}
                            <div className={Style.brandImageContainer}>
                                <img className={Style.metamaskImage} src={metamask} />
                            </div>
                            {authenticated
                                ? [
                                      <NavItem key="1">
                                          <NavLink tag={RRNavLink} to="/account" style={{color: "#FFE787"}}>
                                              {t("Account")}
                                          </NavLink>
                                      </NavItem>,
                                      <NavItem key="2">
                                          <NavLink tag={RRNavLink} to="/logout" style={{color: "#FFE787"}}>
                                              {t("Logout")}
                                          </NavLink>
                                      </NavItem>,
                                  ]
                                : [
                                      <NavItem key="1">
                                          <NavLink id="register" href="#" onClick={showRegisterModal} style={{color: "#FFE787"}}>
                                              {t("Register")}
                                          </NavLink>
                                      </NavItem>,
                                      <NavItem key="2">
                                          <NavLink href="#" onClick={this.props.authenticate} style={{color: "#FFE787"}}>
                                              {t("Login")}
                                          </NavLink>
                                      </NavItem>,
                                  ]}
                        </Nav>
                    </Collapse>
                </Container>
                <div>
                    <img className={Style.ftLine1} src={ftLine1} />
                    <img className={Style.ftLine2} src={ftLine2} />
                </div>
            </Navbar>
        );
    }
}

export default withTranslation()(Header);
