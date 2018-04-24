import * as React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import {
    Button,
    Well,
} from "react-bootstrap";
import Msg from "../../../config/messages";
import {bindActionCreators} from "redux";

class HomeAuthorised extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Well bsSize="large">
                    <h3>{Msg.homeUsrWelcome + this.props.userName}</h3>
                    <Button bsStyle="primary" bsSize="large" block onClick={() => this.props.changePage("/todo")}>
                        {Msg.homeUsrMyToDoButton}
                    </Button>
                </Well>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (route) => push(route),
}, dispatch);

export default connect(
    null,
    mapDispatchToProps,
)(HomeAuthorised);