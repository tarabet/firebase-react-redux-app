import * as React from "react";
import {
    Button,
    Modal,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
    HIDE_REGISTER_FORM
} from "../../modules/auth";

class RegisterModal extends React.Component {
    render() {
        return (
            <div>
                <Modal show={this.props.showRegisterForm} onHide={this.props.hideRegisterHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </p>

                        <hr />

                        <h4>Overflowing text to show scroll behavior</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                            ac consectetur ac, vestibulum at eros.
                        </p>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur
                            et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                            auctor.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.hideRegisterHandler}>Close</Button>
                    </Modal.Footer>
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
