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
import HomeUnauthorised from "../../components/home/unauthorised";
import HomeAuthorised from "../../components/home/authorised";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8} mdPush={2}>
                        {this.props.authenticated
                            ? <HomeAuthorised userName={this.props.currentUser} />
                            : <HomeUnauthorised />
                        }
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
    currentUser: state.auth.currentUser,
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
