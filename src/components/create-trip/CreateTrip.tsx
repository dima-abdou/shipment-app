import {
  Avatar,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// import GoogleMapReact from 'google-map-react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import User from '../../models/user';
import {
  ILookup,
  IUser,
  locationInitials,
  lookupInitialValues,
} from '../../types';
import { toast } from 'react-toastify';
import DataService from '../../services/dataServices';

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
    width: '360px',
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
  },
  title: {
    width: '100%',
    color: 'white',
    backgroundColor: 'lightslategray',
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

const CreateTrip = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
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
  const [fromAirports, setFromAirports] = useState<ILookup[]>(
    new Array(lookupInitialValues),
  );
  const [toAirports, setToAirports] = useState<ILookup[]>(
    new Array(lookupInitialValues),
  );
  const navigate = useNavigate();

  const navigateToLandingPage = () => {
    navigate('/landing');
  };

  const loggedInUser: IUser = User.getUser;
  const [fields, setFields] = useState<Record<string, any>>({
    fromAirportId: '',
    toAirportId: '',
    fromDate: '2023-10-21T21:28:47.569Z',
    toDate: '2023-10-21T21:28:47.569Z',
    availableSpaceInCMCube: 0,
    availableWeightInKG: 0,
    userFromLocation: locationInitials,
    userToLocation: locationInitials,
  });

  useEffect(() => {
    onLanding();
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

  const handleFromDateChange = (e: any) => {
    setFields((prevState) => ({
      ...prevState,
      fromDate: e.toISOString(),
    }));
  };

  const handleToDateChange = (e: any) => {
    setFields((prevState) => ({
      ...prevState,
      toDate: e.toISOString(),
    }));
  };

  const handleChange = (e: any) => {
    setFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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

  const fromCityChange = async (e: any) => {
    var airportsRequest = await DataService.get(
      'api/lookups/cities/' + e.target.value + '/airports',
      undefined,
      undefined,
      undefined,
      loggedInUser.token,
    );
    if (airportsRequest.ok) {
      const airports: ILookup[] = await airportsRequest.json();
      setFromAirports(airports);
    } else {
      toast.error('Problem Occured');
    }
  };

  const toCityChange = async (e: any) => {
    var airportsRequest = await DataService.get(
      'api/lookups/cities/' + e.target.value + '/airports',
      undefined,
      undefined,
      undefined,
      loggedInUser.token,
    );
    if (airportsRequest.ok) {
      const airports: ILookup[] = await airportsRequest.json();
      setToAirports(airports);
    } else {
      toast.error('Problem Occured');
    }
  };

  const handleSubmit = async (event: any) => {
    var result = await DataService.post(
      'api/trip',
      fields,
      undefined,
      undefined,
      undefined,
      loggedInUser.token,
    );
    if (result.ok) {
      const id: string = await result.text();
      navigate('/tripdetails/' + id);
    } else {
      toast.error('Problem Occured');
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
          <span>Create Trip</span>
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
              name='fromCity'
              label='Model'
              onChange={fromCityChange}
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
            <InputLabel id='fromAirport'>From Airport</InputLabel>
            <Select
              labelId='fromAirport'
              name='fromAirportId'
              label='Model'
              onChange={handleChange}
            >
              {fromAirports != null && fromAirports.length > 0
                ? fromAirports.map((airport) => {
                    // Here goes your models option
                    return (
                      <MenuItem value={airport.id}>
                        <em>{airport.name}</em>
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
              name='toCity'
              label='Model'
              onChange={toCityChange}
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
          <FormControl variant='outlined' fullWidth={true}>
            <InputLabel id='toAirport'>to Airport</InputLabel>
            <Select
              labelId='toAirport'
              name='toAirportId'
              label='Model'
              onChange={handleChange}
            >
              {toAirports != null && toAirports.length > 0
                ? toAirports.map((airport) => {
                    // Here goes your models option
                    return (
                      <MenuItem value={airport.id}>
                        <em>{airport.name}</em>
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={styles.datePickerGridItem}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['MobileDatePicker']}>
              <MobileDatePicker
                label='From Date'
                defaultValue={dayjs(new Date())}
                onChange={handleFromDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item style={styles.datePickerGridItem}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['MobileDatePicker']}>
              <MobileDatePicker
                label='To Date'
                defaultValue={dayjs(new Date())}
                onChange={handleToDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='availableSpaceInCMCube'
            label='Space In Cube'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            onChange={handleChange}
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='availableWeightInKG'
            label='Weight In KG'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            onChange={handleChange}
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            id='user-from-location'
            label='User From Location'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
          />
        </Grid>
        <Grid item style={styles.mapItem}>
          {/* <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
          </GoogleMapReact> */}
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
          {/* <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
          </GoogleMapReact> */}
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

export default CreateTrip;
