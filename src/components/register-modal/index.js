import * as React from "react";
import {
    Col,
    Button,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
    HIDE_REGISTER_FORM
} from "../../modules/auth";
import Msg from "../../config/messages";
import { emailValidationRegex } from "../../utils/common";
import { fire } from "../../utils/fire";

class RegisterModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
        };

        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    nameChangeHandler(e) {
        const nameString = e.target.value;

        this.setState({
            ...this.state,
            name: nameString.charAt(0).toUpperCase() + nameString.slice(1),
        });
    }

    validateName() {
        const length = this.state.name.length;
        if (length > 5) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    emailChangeHandler(e) {
        this.setState({
            ...this.state,
            email: e.target.value,
        });
    }

    validateEmail() {
        const email = this.state.email;

        if (email.length === 0) {
            return null;
        }

        return emailValidationRegex.test(String(email).toLowerCase()) ? "success" : "error";
    }

    passwordChangeHandler(e) {
        this.setState({
            ...this.state,
            password: e.target.value,
        });
    }

    validatePassword() {
        const length = this.state.password.length;
        if (length > 5) return "success";
        else if (length > 0) return "error";
        return null;
    }

    handleError(err) {
        alert("Registration error:", err)
    }

    submitHandler(e) {
        e.preventDefault();

        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                user.updateProfile({
                    displayName: this.state.name,
                })
                .then(() => {
                    this.setState({
                        userName: fire.auth().currentUser.displayName,
                    });

                    console.log("Current user is:", fire.auth().currentUser.displayName);
                })
            })
            .catch((err) => {
                this.handleError(err);
            });
    };

    componentWillReceiveProps(nextProps) {
        // Reset form is it was closed and opened again
        if (!this.props.showRegisterForm && nextProps.showRegisterForm) {
            this.setState({
                name: "",
                email: "",
                password: "",
            });
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.showRegisterForm} onHide={this.props.hideRegisterHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>{ Msg.regForm.heading }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal onSubmit={this.submitHandler}>
                            <FormGroup
                                controlId="formHorizontalName"
                                onChange={this.nameChangeHandler}
                                validationState={this.validateName()}
                            >
                                <Col componentClass={ControlLabel} sm={2}>
                                    Name
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        type="text"
                                        placeholder="Name"
                                        value={this.state.name}
                                    />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup
                                controlId="formHorizontalEmail"
                                onChange={this.emailChangeHandler}
                                validationState={this.validateEmail()}
                            >
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" />
                                    <HelpBlock>
                                        {this.validateEmail() === "error" && Msg.regForm.emailValidErr}
                                    </HelpBlock>
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>

                            <FormGroup
                                controlId="formHorizontalPassword"
                                onChange={this.passwordChangeHandler}
                                validationState={this.validatePassword()}
                            >
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" />
                                    <HelpBlock>
                                        {this.validatePassword() === "error" && Msg.regForm.passwordValidErr}
                                    </HelpBlock>
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit">Register</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    showRegisterForm: state.auth.showRegisterForm,
});

const mapDispatchToProps = (dispatch) => ({
    hideRegisterHandler: () => dispatch({ type: HIDE_REGISTER_FORM }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterModal);
