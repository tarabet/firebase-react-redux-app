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
    Col,
} from "react-bootstrap";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <div>
                    <h1>Home</h1>
                    <p>Count: {this.props.count}</p>

                    <p>
                        <button onClick={this.props.increment} disabled={this.props.isIncrementing}>Increment</button>
                        <button onClick={this.props.incrementAsync} disabled={this.props.isIncrementing}>Increment Async</button>
                    </p>

                    <p>
                        <button onClick={this.props.decrement} disabled={this.props.isDecrementing}>Decrement</button>
                        <button onClick={this.props.decrementAsync} disabled={this.props.isDecrementing}>Decrement Async</button>
                    </p>


                    <p>
                        <button onClick={() => this.props.changePage()}>Go to About page via Redux</button>
                    </p>
                </div>
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
