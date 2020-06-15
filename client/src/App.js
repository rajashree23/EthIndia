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
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/get_roles" component={MaticPage} />
          <Route exact path="/voter_section" component={VoterPage} />
        </Switch>
      </BrowserRouter>

    )
  }
}