import * as React from "react";
import { connect } from "react-redux";
import { Route, Link, withRouter } from "react-router-dom";
import Home from "../home";
import About from "../about";
import { fire } from "../../utils/fire";
import { setAuth } from "../../modules/auth";
import { setItems } from "../../modules/items";
import { bindActionCreators } from "redux";
import {
    Grid,
} from "react-bootstrap";
import NavbarComponent from "../../components/navbar";
import ToDoWrapper from "../todo";
import PrivateRoute from "../../components/private-route";

class App extends React.Component {
    removeAuthListener = null;
    toDoItems = null;

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.removeAuthListener = fire.auth().onAuthStateChanged(user => {
            if (user) {
                this.toDoItems = fire.database().ref(`items/${user.uid}`);

                this.props.setAuth({
                    authenticated: true,
                    currentUser: user.displayName,
                });

                this.toDoItems.on('value', data => {
                    this.props.setItems({
                        items: data.val(),
                    });
                })
            } else {
                this.props.setAuth({
                    authenticated: false,
                    currentUser: null,
                });
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <NavbarComponent />
                <Grid>
                    <main>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about-us" component={About} />
                        <PrivateRoute exact path="/private" authed={this.props.authenticated} component={About} />
                        <PrivateRoute exact path="/todo" authed={this.props.authenticated} component={ToDoWrapper} />
                    </main>
                </Grid>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setAuth,
    setItems,
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(App));