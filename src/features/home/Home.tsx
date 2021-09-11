import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import mapboxgl, { Map } from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getCurrentUserAsync,
  logoutAsync,
  selectUser,
} from 'features/authorization/authorizationSlice';
import { getMapboxAccessToken } from 'utils/getMapboxAccessToken';
import { stringsToNumber } from 'utils/stringsToNumber';
import { SHome } from './Home.styles';

mapboxgl.accessToken = getMapboxAccessToken() || '';

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

  const mapContainer = useRef<any>(null);
  const map = useRef<Map>();
  const [lng, setLng] = useState(60.59);
  const [lat, setLat] = useState(56.83);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    getUser();
  }, [lat, lng, zoom, getUser]);

  useEffect(() => {
    map.current?.on('move', () => {
      if (map.current) {
        setLng(stringsToNumber(map.current.getCenter().lng.toFixed(4)));
        setLat(stringsToNumber(map.current.getCenter().lat.toFixed(4)));
        setZoom(stringsToNumber(map.current.getZoom().toFixed(2)));
      }
    });
  }, []);

  useLayoutEffect(() => {
    if (map.current) {
      mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        (error) => console.log(error)
      );
      map.current.addControl(
        new MapboxLanguage({
          defaultLanguage: 'ru',
        })
      );
    }
  }, []);

  return (
    <Grid container component="main">
      <SHome>
        <Typography>This is a home</Typography>
        <Typography>{user?.name}</Typography>
        <Typography>{user?.email}</Typography>
        <Button color="primary" variant="contained" onClick={logout}>
          Logout
        </Button>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
      </SHome>
    </Grid>
  );
}
