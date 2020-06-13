import React from "react";

import {
  Button,
  IconButton,
  Icon,
  Grid
} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export default class QuestionsCard extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    console.log(this.props.data.question[this.props.i]);
    console.log(this.props);
    // console.log(this.props.i);
    return (
      <Card style={{ borderRadius: 10 }} >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={10} md={10}>
              <Typography variant="title" color="inherit" >
                {"Public Address :-" + this.props.data.address}
              </Typography>
            </Grid>
            <Grid item xs={2} md={2}>
              <Typography variant="subheading" color="inherit" >
                {"Date :-" + this.props.data.timestamp}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography color="textSecondary" variant="h6" gutterBottom>
              <a href={"https://ipfs.infura.io/ipfs/" + this.props.data.question} target="_blank" >
              {this.props.data.question}  </a>
              </Typography>

            </Grid>

          </Grid>




        </CardContent>
        <CardActions>
          <Button color="primary" variant="outlined" size="small">Solve</Button>
          <Button color="primary" variant="outlined" size="small">Vote</Button>
          {/* <Button color="primary" variant="outlined" size="small"  onClick={() => { this.props.refresh  }}>Get Question</Button> */}
        </CardActions>
      </Card>

    )
  }
}