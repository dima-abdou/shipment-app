import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
// import GoogleMapReact from 'google-map-react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useParams } from 'react-router-dom';
import { ILocation, IUser, locationInitials } from '../../types';
import User from '../../models/user';
import { useEffect, useState } from 'react';
import DataService from '../../services/dataServices';
import GoogleMapReact from 'google-map-react';

const styles = {
  container: {
    width: '100%',
    marginTop: '3%',
  },
  itemWidth: {
    width: '350px',
  },
  gridItem: {
    paddingTop: '5px',
  },
  tripsGridItem: {
    paddingTop: '5px',
    width: '100%',
  },
  datePickerGridItem: {
    paddingTop: '5px',
    width: '360px',
  },
  mapItem: {
    minWidth: '370px',
    height: '120px',
    paddingTop: '5px',
    marginButton: '10px',
  },
  title: {
    width: '100%',
    color: 'white',
    backgroundColor: '#919bac',
    paddingTop: '5px',
    paddingBottom: '5px',
    fontWeight: '500',
    paddingLeft: '8%',
    marginTop: '15px',
  },
  submitButton: {
    width: '360px',
    backgroundColor: '#2c3e52',
  },
};

const TripDetails = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  const params = useParams();
  const loggedInUser: IUser = User.getUser;
  const [fields, setFields] = useState<Record<string, any>>({
    fromCountry: '',
    fromCity: '',
    fromAirport: '',
    toCountry: '',
    toCity: '',
    toAirport: '',
    fromDate: dayjs(new Date()),
    toDate: dayjs(new Date()),
    spaceInCMCube: '',
    weightInKG: '',
    userFromLocation: locationInitials,
    userToLocation: locationInitials,
  });
  const navigate = useNavigate();

  const navigateToLandingPage = () => {
    navigate('/landing');
  };

  const [currentLocation, setCurrentLocation] =
    useState<ILocation>(locationInitials);

  const [currenMapProps, setCurrentMapProps] = useState({
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  });

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
      const currLocation: ILocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        displayName: 'Lebanon',
      };
      setCurrentLocation(currLocation);
      let currentProps = {
        center: {
          lat: currLocation.latitude,
          lng: currLocation.longitude,
        },
        zoom: 11,
      };
      setCurrentMapProps(currentProps);
    });
  };

  const renderMarkers = (map: any, maps: any) => {
    let marker = new maps.Marker({
      position: currenMapProps.center,
      map,
      title: 'Marker',
    });
    map.setCenter(currenMapProps.center);
  };

  useEffect(() => {
    getTripDetails();
    getCurrentLocation();
  }, []);

  const getTripDetails = async () => {
    var tripR = await DataService.get(
      'api/trip/' + params.id,
      undefined,
      undefined,
      undefined,
      loggedInUser.token,
    );
    if (tripR.ok) {
      var trip = await tripR.json();
      const newValues = { ...fields };
      newValues.fromCountry = trip?.fromCountry?.name;
      newValues.fromCity = trip?.fromCity?.name;
      newValues.fromAirport = trip?.fromAirport?.name;
      newValues.toCountry = trip?.toCountry?.name;
      newValues.toCity = trip?.toCity?.name;
      newValues.toAirport = trip?.toAirport?.name;
      newValues.spaceInCMCube = trip?.availableSpaceInCMCube;
      newValues.weightInKG = trip?.availableWeightInKG;
      newValues.fromDate = dayjs(trip?.fromDate);
      newValues.toDate = dayjs(trip?.toDate);
      setFields(newValues);
    }
  };

  return (
    <div style={styles.container}>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={1.5}
      >
        <Grid item style={styles.title}>
          <span>Trip Details</span>
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='fromCountry'
            label='From Country'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={fields.fromCountry}
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'></InputAdornment>
              ),
            }}
            disabled
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='fromCity'
            label='From City'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={fields.fromCity}
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'></InputAdornment>
              ),
            }}
            disabled
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='fromAirport'
            label='From Airport'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={fields.fromAirport}
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'></InputAdornment>
              ),
            }}
            disabled
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='toCountry'
            label='To Country'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={fields.toCountry}
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'></InputAdornment>
              ),
            }}
            disabled
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='toCity'
            label='To City'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={fields.toCity}
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'></InputAdornment>
              ),
            }}
            disabled
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='toAirport'
            label='To Airport'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={fields.toAirport}
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'></InputAdornment>
              ),
            }}
            disabled
          />
        </Grid>
        <Grid item style={styles.datePickerGridItem}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['MobileDatePicker']}>
              <MobileDatePicker
                label='From Date'
                value={fields.fromDate}
                disabled
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item style={styles.datePickerGridItem}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['MobileDatePicker']}>
              <MobileDatePicker
                label='To Date'
                value={fields.toDate}
                disabled
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='spaceInCMCube'
            label='Space In Cube'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={fields.spaceInCMCube}
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'></InputAdornment>
              ),
            }}
            disabled
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='weightInKG'
            label='Weight In KG'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={fields.weightInKG}
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'></InputAdornment>
              ),
            }}
            disabled
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            id='user-from-location'
            label='User From Location'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={currentLocation?.displayName}
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'></InputAdornment>
              ),
            }}
            disabled
          />
        </Grid>
        <Grid item style={styles.mapItem}>
          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            bootstrapURLKeys={{
              key: 'AIzaSyCnkWjDu0SN6yJQ0KylJQ3GvqK-jhNj_1I',
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
          ></GoogleMapReact>
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            id='user-to-location'
            label='User To Location'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={fields.userToLocation.displayName}
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'></InputAdornment>
              ),
            }}
            disabled
          />
        </Grid>
        <Grid item style={styles.mapItem}>
          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            bootstrapURLKeys={{
              key: 'AIzaSyCnkWjDu0SN6yJQ0KylJQ3GvqK-jhNj_1I',
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
          ></GoogleMapReact>
        </Grid>
        {/* <Grid item style={styles.gridItem}>
          <Button variant='contained' style={styles.submitButton}>
            Create
          </Button>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default TripDetails;
