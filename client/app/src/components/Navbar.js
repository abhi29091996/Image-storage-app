import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#1976D2',
    color: '#FFFFFF',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          My Photo App
        </Typography>
        <Button color="inherit" href="/home">Home</Button>
        <Button color="inherit" href="/upload">Add Image</Button>
        <Button color="inherit" href="/logout">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar