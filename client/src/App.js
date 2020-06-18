import React from "react";
import {
  Button,
  IconButton,
  Icon
} from "@material-ui/core"
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from "./components/homePage";
import MaticPage from "./components/rolesPage";
import VoterPage from "./components/voterPage";
import PublisherPage from "./components/publisherPage";
import Footer from "./components/footer";
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/get_roles" component={MaticPage} />
          <Route exact path="/voter_section" component={VoterPage} />
          <Route exact path="/publisher_section" component={PublisherPage} />
        </Switch>
      </BrowserRouter>

    )
  }
}