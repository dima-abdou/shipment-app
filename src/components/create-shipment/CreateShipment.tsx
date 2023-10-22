import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DataService from '../../services/dataServices';
import User from '../../models/user';
import {
  ILookup,
  IUser,
  ILocation,
  lookupInitialValues,
  locationInitials,
} from '../../types';
import { toast } from 'react-toastify';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';
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
    paddingTop: '8px',
    width: '360px',
  },
  tripsGridItem: {
    paddingTop: '5px',
    width: '100%',
  },
  mapItem: {
    minWidth: '370px',
    height: '120px',
    paddingTop: '5px',
  },
  title: {
    width: '100%',
    color: 'white',
    backgroundColor: '#919bac',
    paddingTop: '5px',
    paddingBottom: '5px',
    fontWeight: '500',
    paddingLeft: '8%',
    marginTop: '5px',
  },
  submitButton: {
    width: '360px',
    backgroundColor: '#2c3e52',
    marginTop: '10px',
    marginButton: '10px',
  },
};

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const CreateShipment: React.FC<{}> = () => {
  const [currenMapProps, setCurrentMapProps] = useState({
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  });
  const loggedInUser: IUser = User.getUser;
  const [fields, setFields] = useState<Record<string, any>>({
    fromCityId: '',
    toCityId: '',
    spaceInCMCube: '',
    weightInKG: '',
    userFromLocation: locationInitials,
    userToLocation: locationInitials,
  });

  const [fromCountries, setFromCountries] = useState<ILookup[]>(
    new Array(lookupInitialValues),
  );
  const [toCountries, setToCountries] = useState<ILookup[]>(
    new Array(lookupInitialValues),
  );
  const [fromCities, setFromCities] = useState<ILookup[]>(
    new Array(lookupInitialValues),
  );
  const [toCities, setToCities] = useState<ILookup[]>(
    new Array(lookupInitialValues),
  );

  const [currentLocation, setCurrentLocation] =
    useState<ILocation>(locationInitials);

  const handleChange = (e: any) => {
    setFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

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

  const renderMarkers = (map:any, maps:any)  =>{
    let marker = new maps.Marker({
      position: currenMapProps.center,
      map,
      title: 'Hello World!'
    });
    map.setCenter(currenMapProps.center);
  };

  useEffect(() => {
    onLanding();
    getCurrentLocation();
  }, []);

  const onLanding = async () => {
    var countriesRequest = await DataService.get(
      'api/lookups/countries',
      undefined,
      undefined,
      undefined,
      loggedInUser.token,
    );
    if (countriesRequest.ok) {
      const countries: ILookup[] = await countriesRequest.json();
      setFromCountries(countries);
      setToCountries(countries);
    } else {
      toast('Problem Occuried.');
    }
  };

  const fromCountryChange = async (e: any) => {
    var citiesRequest = await DataService.get(
      'api/lookups/countries/' + e.target.value + '/cities',
      undefined,
      undefined,
      undefined,
      loggedInUser.token,
    );
    if (citiesRequest.ok) {
      const cities: ILookup[] = await citiesRequest.json();
      setFromCities(cities);
    } else {
      toast.error('Problem Occured');
    }
  };

  const toCountryChange = async (e: any) => {
    var citiesRequest = await DataService.get(
      'api/lookups/countries/' + e.target.value + '/cities',
      undefined,
      undefined,
      undefined,
      loggedInUser.token,
    );
    if (citiesRequest.ok) {
      const cities: ILookup[] = await citiesRequest.json();
      setToCities(cities);
    } else {
      toast.error('Problem Occured');
    }
  };
  const handleSubmit = async (event: any) => {
    await DataService.post(
      'api/shipmentrequest',
      fields,
      undefined,
      undefined,
      undefined,
      loggedInUser.token,
    ).then(async (result) => {
      debugger;
      if (result.ok) {
        const id: any = await result.text();
        navigate('/shipmentdetails/' + id);
      } else {
        toast.error('Problem Occured');
      }
    });
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
          <span>Create Shipment Request</span>
        </Grid>
        <Grid item style={styles.gridItem}>
          <FormControl variant='outlined' fullWidth={true}>
            <InputLabel id='fromCountry'>From Country</InputLabel>
            <Select
              labelId='fromCountry'
              name='fromCountry'
              onChange={fromCountryChange}
              label='Model'
            >
              {fromCountries != null && fromCountries.length > 0
                ? fromCountries.map((country) => {
                    // Here goes your models option
                    return (
                      <MenuItem value={country.id}>
                        <em>{country.name}</em>
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={styles.gridItem}>
          <FormControl variant='outlined' fullWidth={true}>
            <InputLabel id='fromCity'>From City</InputLabel>
            <Select
              labelId='fromCity'
              name='fromCityId'
              label='Model'
              onChange={handleChange}
            >
              {fromCities != null && fromCities.length > 0
                ? fromCities.map((city) => {
                    // Here goes your models option
                    return (
                      <MenuItem value={city.id}>
                        <em>{city.name}</em>
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={styles.gridItem}>
          <FormControl variant='outlined' fullWidth={true}>
            <InputLabel id='toCountry'>To Country</InputLabel>
            <Select
              labelId='toCountry'
              name='toCountry'
              onChange={toCountryChange}
              label='Model'
            >
              {toCountries != null && toCountries.length > 0
                ? toCountries.map((country) => {
                    // Here goes your models option
                    return (
                      <MenuItem value={country.id}>
                        <em>{country.name}</em>
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={styles.gridItem}>
          <FormControl variant='outlined' fullWidth={true}>
            <InputLabel id='toCity'>To City</InputLabel>
            <Select
              labelId='toCity'
              name='toCityId'
              label='Model'
              onChange={handleChange}
            >
              {toCities != null && toCities.length > 0
                ? toCities.map((city) => {
                    // Here goes your models option
                    return (
                      <MenuItem value={city.id}>
                        <em>{city.name}</em>
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='spaceInCMCube'
            label='Space In Cube'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            onChange={handleChange}
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='weightInKG'
            label='Weight In KG'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            onChange={handleChange}
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='user-from-location'
            label='User From Location'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={currentLocation.displayName}
          />
        </Grid>
        <Grid item style={styles.mapItem}>
          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            bootstrapURLKeys={{ key: 'AIzaSyCnkWjDu0SN6yJQ0KylJQ3GvqK-jhNj_1I' }}
            defaultCenter={currenMapProps.center}
            defaultZoom={currenMapProps.zoom}
            onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
          >
          </GoogleMapReact>
          {/* <Map
            zoom={14}
            style={styles.mapItem}
            initialCenter={{
              lat: currenMapProps.center.lat,
              lng: currenMapProps.center.lng,
            }}
          >
            <Marker onClick={() => {}} />
          </Map> */}
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            id='user-to-location'
            label='User To Location'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
          />
        </Grid>
        <Grid item style={styles.mapItem}>
          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            bootstrapURLKeys={{ key: 'AIzaSyCnkWjDu0SN6yJQ0KylJQ3GvqK-jhNj_1I' }}
            defaultCenter={currenMapProps.center}
            defaultZoom={currenMapProps.zoom}
            onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
          >
          </GoogleMapReact>
        </Grid>
        <Grid item style={styles.gridItem}>
          <Button
            variant='contained'
            style={styles.submitButton}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateShipment;
