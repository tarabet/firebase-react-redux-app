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

class NavbarUserPanel extends React.Component {
    render() {
        return (
            !this.props.authenticated && (<Navbar.Form pullRight>
                <FormGroup>
                    <FormControl type="text" placeholder="Login" />
                </FormGroup>{' '}
                <FormGroup>
                    <FormControl type="password" placeholder="Password" />
                </FormGroup>{' '}
                <Button type="submit">Login</Button>{' '}
                <Button
                    type="button"
                    onClick={this.props.showRegisterHandler}
                >
                    Register
                </Button>{' '}
                <RegisterModal />
            </Navbar.Form>)
        )
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