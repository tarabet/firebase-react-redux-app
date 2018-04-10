import * as React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    increment,
    decrement,
    incrementAsync,
    decrementAsync,
} from "../../modules/counter";
import {
    Grid,
    Row,
    Col,
    Jumbotron,
    Button,
} from "react-bootstrap";
import Msg from "../../config/messages";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8} mdPush={2}>
                        {!this.props.authenticated && (
                            <Jumbotron>
                                <p>{Msg.pleaseAuthorize}</p>
                                <p>
                                    <Button bsStyle="primary" onClick={this.props.changePage}>Learn more</Button>
                                </p>
                            </Jumbotron>
                        )}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    increment,
    incrementAsync,
    decrement,
    decrementAsync,
    changePage: () => push("/about-us"),
}, dispatch);

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
