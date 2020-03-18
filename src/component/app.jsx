import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./header";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import UserDetails from "./userDetails";
import Setting from "./loogeduser/setting";
import NewArticle from "./loogeduser/createArticle";
import ArticleDetails from "./articleDetails";
import "../assets/stylesheets/main.scss";

function Auth() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tags/:tag" component={Home} />
      <Route path="/user" component={UserDetails} />
      <Route path="/editor" component={NewArticle} />
      <Route path="/setting" component={Setting} />
      <Route path="*" render={() => <h1>404 Page</h1>} />
    </Switch>
  );
}
function NoAuth(newprops) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tags/:tag" component={Home} />
      <Route
        path="/login"
        render={() => <Login updateLoggedIn={newprops.updateLoggedIn} />}
      />
      <Route path="/signup" component={Signup} />
      \<Route path="/article/:slug" component={ArticleDetails} />
      <Route path="*" render={() => <h1>404 Page</h1>} />
    </Switch>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  updateLoggedIn = value => {
    this.setState({ isLoggedIn: value });
  };
  componentDidMount() {
    console.log("cdm");
    console.log(localStorage["conduit-token"]);
    if (localStorage["conduit-token"]) {
      fetch(`https://conduit.productionready.io/api/user`, {
        method: "GET",
        headers: {
          authorization: `Token ${localStorage["conduit-token"]}`
        }
      })
        .then(res => res.json())
        // .then(res => console.log(res));
        .then(res => this.setState({ isLoggedIn: true }))
        .catch(err => this.setState({ isLoggedIn: false }));
    }
  }

  render() {
    console.log(this.state.isLoggedIn);
    return (
      <div className="home_page_devision">
        <Header isLoggedIn={this.state.isLoggedIn} />
        {this.state.isLoggedIn ? (
          <Auth />
        ) : (
          <NoAuth updateLoggedIn={this.updateLoggedIn} />
        )}

        {/* <Route exact path="/article/:slug" component={ArticleByTag} /> */}
      </div>
    );
  }
}

export default App;
