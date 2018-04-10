import * as React from "react";
import { connect } from "react-redux";
import {
    Navbar,
    FormGroup,
    FormControl,
    Button,
} from "react-bootstrap";
import RegisterModal from "../register-modal";
import {SHOW_REGISTER_FORM} from "../../modules/auth";
import { fire } from "../../utils/fire";

class NavbarUserPanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };

        this.logoutHandler = this.logoutHandler.bind(this);
        this.emailAndPasswordAuthentication = this.emailAndPasswordAuthentication.bind(this);
        this.loginChangeHandler = this.loginChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    }

    emailAndPasswordAuthentication(e) {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;

        fire.auth().fetchProvidersForEmail(email)
            .then(provider => {
                if (provider.length === 0) {
                    return fire.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
                } else if (provider.indexOf("password") === -1) {
                    console.log("you already have an account with " + provider[0]);
                } else {
                    return fire.auth().signInWithEmailAndPassword(email, password);
                }
            })
            .catch((err) => {
                this.handleError(err);
            })
    };

    handleError(err) {
        alert("Login error:", err);
    }

    logoutHandler() {
        fire.auth().signOut().then((user) => {
            //listener will update username
        });
    };

    loginChangeHandler(e) {
        this.setState({
            ...this.state,
            email: e.target.value,
        })
    };

    passwordChangeHandler(e) {
        this.setState({
            ...this.state,
            password: e.target.value,
        })
    };

    loginForm() {
        return (
            <Navbar.Form pullRight>
                <FormGroup>
                    <FormControl type="text" placeholder="Email" onChange={this.loginChangeHandler}/>
                </FormGroup>{' '}
                <FormGroup>
                    <FormControl type="password" placeholder="Password" onChange={this.passwordChangeHandler}/>
                </FormGroup>{' '}
                <Button
                    type="submit"
                    onClick={this.emailAndPasswordAuthentication}
                >
                    Login
                </Button>{' '}
                <Button
                    type="button"
                    onClick={this.props.showRegisterHandler}
                >
                    Register
                </Button>{' '}
                <RegisterModal />
            </Navbar.Form>
        );
    }

    userPanel() {
        return (
            <Navbar.Form pullRight>
                <Button
                    type="button"
                    onClick={this.logoutHandler}
                >
                    Logout
                </Button>
            </Navbar.Form>
        );
    }

    render() {
        return this.props.authenticated ? this.userPanel() : this.loginForm();
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
    showRegisterHandler: () => dispatch({ type: SHOW_REGISTER_FORM }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavbarUserPanel);