import * as React from "react";
import { connect } from "react-redux";

import {
    Button,
    Well,
} from "react-bootstrap";
import Msg from "../../config/messages";

class ToDoWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addItemModal: false,
        };

        this.addItemModalToggle = this.addItemModalToggle.bind(this);
    }

    addItemModalToggle() {
        this.setState({
            addItemModal: !this.state.addItemModal,
        })
    }

    render() {
        console.log("State:", this.state);
        return (
            <Well>
                {this.props.toDoItems ? <h3>THERE ARE SOME ITEMS</h3> : <h3>THERE IS NO ITEMS</h3>}
                <Button
                    bsStyle="primary"
                    onClick={this.addItemModalToggle}
                >
                    {Msg.todo.addNewItemBtn}
                </Button>
            </Well>
        )
    }
}

const mapStateToProps = state => ({
    toDoItems: state.items.toDoItems,
});

export default connect(
    mapStateToProps,
    null,
)(ToDoWrapper);