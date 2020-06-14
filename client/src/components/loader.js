import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Loader extends React.Component {

  render() {

    return (
      <Dialog
        style={{ backgroundColor: "#E6F9F9" }}
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ paddingTop: 10 }}>
          <CircularProgress />
        </DialogContent>


      </Dialog>


    )
  }
}