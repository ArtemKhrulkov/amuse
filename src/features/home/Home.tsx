import React, { useCallback, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getCurrentUserAsync,
  logoutAsync,
  selectUser,
} from '../authorization/authorizationSlice';
import Typography from '@material-ui/core/Typography';

export default function Home() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const logout = () => {
    dispatch(logoutAsync());
    history.push('/');
  };

  const getUser = useCallback(() => {
    dispatch(getCurrentUserAsync());
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Grid container component="main">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography>This is home</Typography>
        <Typography>{user?.name}</Typography>
        <Typography>{user?.email}</Typography>
        <Button color="primary" variant="contained" onClick={logout}>
          Logout
        </Button>
      </div>
    </Grid>
  );
}
