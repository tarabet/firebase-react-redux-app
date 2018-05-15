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
import Msg from "../../../config/messages";
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class AddToDoItemModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            dueDate: moment(),
        };

        this.textChangeHandler = this.textChangeHandler.bind(this);
        this.dueDateHandler = this.dueDateHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    textChangeHandler(e) {
        const taskString = e.target.value;

        this.setState({
            ...this.state,
            text: taskString,
        });
    }

    validateText() {
        const length = this.state.text.length;

        if (length > 5) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    dueDateHandler(date) {
        this.setState({
            ...this.state,
            dueDate: date,
        });
    }

    submitHandler(e) {
        e.preventDefault();
        this.props.addItemHandler(this.state);
    }

    componentWillReceiveProps(nextProps) {
        // Reset form is it was closed and opened again
        if (!this.props.showModal && nextProps.showModal) {
            this.setState({
                text: "",
            });
        }
    }

    render() {
        console.log("State:", this.state);

        return (
            <Modal show={this.props.showModal} onHide={this.props.modalToggleHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>{ Msg.todo.addNewItemHeader }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal onSubmit={this.submitHandler}>
                        <FormGroup
                            controlId="formHorizontalName"
                            onChange={this.textChangeHandler}
                            validationState={this.validateText()}
                        >
                            <Col componentClass={ControlLabel} sm={2}>
                                {Msg.todo.ItemText}
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder={Msg.todo.AddItemInputPlaceholder}
                                    value={this.state.name}
                                />
                                <FormControl.Feedback />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                {Msg.todo.dueDateText}
                            </Col>
                            <Col sm={10}>
                                <DatePicker
                                    selected={this.state.dueDate}
                                    onChange={this.dueDateHandler}
                                    placeholderText={Msg.todo.DueDateInputPlaceholder}
                                    className="form-control"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit">
                                    {Msg.todo.AddItemButtonText}
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}
