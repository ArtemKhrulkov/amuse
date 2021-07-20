import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { logoutAsync } from '../authorization/authorizationSlice';

export default function Home() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(logoutAsync());
    history.push('/');
  };

  return (
    <Grid container component="main">
      <p>This is home</p>
      <div>
        <Button color="primary" variant="contained" onClick={logout}>
          Logout
        </Button>
      </div>
    </Grid>
  );
}
