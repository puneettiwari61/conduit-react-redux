import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./header";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Profile from "./loogeduser/profile";
import Setting from "./loogeduser/setting";
import NewArticle from "./loogeduser/createArticle";
import ArticleDetails from "./articleDetails";
import "../assets/stylesheets/main.scss";
import { fetchUserInfo } from "../store/actions";

function Auth(newprops) {
  console.log(newprops, "auth");
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tags/:tag" component={Home} />
      <Route path="/user" render={() => <Profile />} />
      <Route path="/editor" component={NewArticle} />
      <Route path="/article/:slug" component={ArticleDetails} />
      <Route path="/setting" component={Setting} />
      <Route path="*" render={() => <h1>404 Page</h1>} />
    </Switch>
  );
}
function NoAuth() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tags/:tag" component={Home} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/signup" component={Signup} />
      \<Route path="/article/:slug" component={ArticleDetails} />
      <Route path="*" render={() => <h1>404 Page</h1>} />
    </Switch>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchUserInfo(this.props));
  }

  render() {
    console.log(this.props, "app props");
    return (
      <div className="home_page_devision">
        <Header />

        {this.props.userInfo ? <Auth /> : <NoAuth />}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state.userReducer.userInfo
    ? { userInfo: state.userReducer.userInfo }
    : null;
}
export default connect(mapStateToProps)(App);
