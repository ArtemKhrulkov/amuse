import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Instagram from '@material-ui/icons/Instagram';
import Email from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import Copyright from 'features/copyright/Copyright';
import VK from './icons/VK';
import { Root, SForm, SLocalization, SPaper } from './Authorization.styles';
import { goToServiceSSO } from 'utils/goToServiceSSO';

export default function Authorization() {
  const { t } = useTranslation();

  const redirectToGoogleSSO = goToServiceSSO('api/auth/google/login');

  return (
    <Root>
      <Grid container component="main" className="root">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="image">
          <Typography className="header" variant="h1" align="left" gutterBottom>
            {'Amuse'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <SLocalization>
            <Button
              color="primary"
              onClick={() => i18next.changeLanguage('ru')}
            >
              RU
            </Button>
            /
            <Button
              color="primary"
              onClick={() => i18next.changeLanguage('en')}
            >
              EN
            </Button>
          </SLocalization>
          <SPaper>
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t('sign-in')}
            </Typography>
            <SForm noValidate>
              <Grid item className="socials">
                <Button
                  className="button"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  startIcon={<Email />}
                  onClick={() => redirectToGoogleSSO()}
                >
                  {t('sign-in-with-gmail')}
                </Button>
                <Button
                  className="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<VK color="white" />}
                >
                  {t('sign-in-with-vk')}
                </Button>
                <Button
                  className="button"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  startIcon={<Instagram />}
                >
                  {t('sign-in-with-instagram')}
                </Button>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </SForm>
          </SPaper>
        </Grid>
      </Grid>
    </Root>
  );
}
