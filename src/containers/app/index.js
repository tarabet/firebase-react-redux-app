import * as React from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import Home from "../home";
import About from "../about";
import { fire } from "../../utils/fire";
import { setAuth } from "../../modules/auth";
import { bindActionCreators } from "redux";
import {
    Grid,
} from "react-bootstrap";
import NavbarComponent from "../../components/navbar";

class App extends React.Component {
    removeAuthListener = null;

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.removeAuthListener = fire.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setAuth(true);
            } else {
                this.props.setAuth(false);
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <NavbarComponent />
                <Grid>
                    <header>
                        <Link to="/">Home</Link>
                        <Link to="/about-us">About</Link>
                    </header>
                    <main>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about-us" component={About}/>
                    </main>
                </Grid>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setAuth,
}, dispatch);

export default connect(
    null,
    mapDispatchToProps,
)(App);