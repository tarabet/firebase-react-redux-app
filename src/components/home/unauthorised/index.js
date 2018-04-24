import * as React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import {
    Jumbotron,
    Button,
} from "react-bootstrap";
import Msg from "../../../config/messages";
import {bindActionCreators} from "redux";

class HomeUnauthorised extends React.Component {
    render() {
        return (
            <Jumbotron>
                <p>{Msg.pleaseAuthorize}</p>
                <p>
                    <Button bsStyle="primary" onClick={this.props.changePage}>Learn more</Button>
                </p>
            </Jumbotron>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push("/about-us"),
}, dispatch);

export default connect(
    null,
    mapDispatchToProps,
)(HomeUnauthorised);