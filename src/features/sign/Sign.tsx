import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Instagram from '@material-ui/icons/Instagram';
import Email from '@material-ui/icons/Email';
import VK from './icons/VK';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from 'features/copyright/Copyright';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured/?music,guitar)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  header: {
    margin: theme.spacing(5),
    color: 'white',
    textShadow: '5px 5px 8px #000',
  },
  socials: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Sign() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <Typography
          className={classes.header}
          variant="h1"
          align="left"
          gutterBottom
        >
          {'Amuse'}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('sign-in')}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid item className={classes.socials}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<Email />}
              >
                {t('sign-in-with-gmail')}
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<VK />}
              >
                {t('sign-in-with-vk')}
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<Instagram />}
              >
                {t('sign-in-with-instagram')}
              </Button>
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t('remember-me')}
            />
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}