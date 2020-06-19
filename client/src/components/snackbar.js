import React from "react";
import Snackbar from '@material-ui/core/Snackbar';

export default class SnackBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }
  handleClose() {
    this.setState({
      open: false
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.open !== nextProps.open) {
      this.setState({
        open: true
      })
    }
  }
  render() {

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.open && this.state.open ? true : false}
        autoHideDuration={2000}
        onClose={this.handleClose.bind(this)}
        message={this.props.message}
      />


    )
  }
}