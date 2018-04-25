import * as React from "react";
import {
    ListGroupItem
} from "react-bootstrap";
import Msg from "../../../config/messages";

export default class ToDoItem extends React.Component {
    render() {
        const {key, itemId, item, mark} = this.props;

        return (
            <ListGroupItem
                href="#"
                key={key}
            >
                {item}
                <span className="pull-right" onClick={() => this.props.action(itemId)}>{mark}</span>
            </ListGroupItem>
        );
    }
}
