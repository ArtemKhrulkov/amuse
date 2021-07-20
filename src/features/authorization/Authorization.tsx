import React, { useEffect } from 'react';

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
import Copyright from 'features/copyright/Copyright';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useStyles } from './Authorization.styles';
import { useAppDispatch } from 'app/hooks';
import { setGoogleTokensAsync } from './authorizationSlice';
import { goToServiceSSO } from 'utils/goToServiceSSO';

export default function Authorization() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const authTokens = () => dispatch(setGoogleTokensAsync());

  const redirectToGoogleSSO = goToServiceSSO(
    'api/auth/google/login',
    authTokens
  );

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
        <div className={classes.localization}>
          <Button color="primary" onClick={() => i18next.changeLanguage('ru')}>
            RU
          </Button>
          /
          <Button color="primary" onClick={() => i18next.changeLanguage('en')}>
            EN
          </Button>
        </div>
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
                onClick={() => redirectToGoogleSSO()}
              >
                {t('sign-in-with-gmail')}
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<VK color="white" />}
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
