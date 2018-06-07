import * as React from "react";
import {
    ListGroupItem
} from "react-bootstrap";

import moment from 'moment';

export default class ToDoItem extends React.Component {
    render() {
        const {key, itemId, item, dueDate, mark} = this.props;

        const momentDate = moment(dueDate);

        return (
            <ListGroupItem
                href="#"
                key={key}
            >
                {item} {dueDate ? `| ${momentDate.format("MMM Do YY") }`: ""}
                <span className="pull-right" onClick={() => this.props.action(itemId)}>{mark}</span>
            </ListGroupItem>
        );
    }
}
