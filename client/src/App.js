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
import HomePage from "./project/homePage";
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>

    )
  }
}