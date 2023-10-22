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
import GoogleMapReact from 'google-map-react';
import DataService from '../../services/dataServices';
import User from '../../models/user';
import { ILookup, IUser, ILocation, lookupInitialValues, locationInitials } from '../../types';
import { toast } from 'react-toastify';

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
  },
};

const CreateShipment: React.FC<{}> = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
    const loggedInUser: IUser = User.getUser;
    const [fields, setFields] = useState<Record<string, any>>({
        fromCityId: '',
        toCityId: '',
        spaceInCMCube: '',
        weightInKG: '',
        userFromLocation: locationInitials,
        userToLocation : locationInitials
    });
  
  const [fromCountries,setFromCountries] = useState<ILookup[]>(new Array(lookupInitialValues));
  const [toCountries,setToCountries] = useState<ILookup[]>(new Array(lookupInitialValues));
  const [fromCities,setFromCities] = useState<ILookup[]>(new Array(lookupInitialValues));
  const [toCities,setToCities] = useState<ILookup[]>(new Array(lookupInitialValues));
    const handleChange = (e: any) => {
      setFields((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

  const navigate = useNavigate();

  const navigateToLandingPage = () => {
    navigate('/landing');
  };

  useEffect(() => {
    onLanding();
  },[]);

  const onLanding = async () =>{
    var countriesRequest = await DataService.get("api/lookups/countries",undefined,undefined,undefined,loggedInUser.token);
    if(countriesRequest.ok){
      const countries : ILookup[] = await  countriesRequest.json();
      setFromCountries(countries);
      setToCountries(countries);
    }else{
      toast("Problem Occuried.");
    }
  }

    const fromCountryChange = async (e: any) => {
      
        var citiesRequest = await DataService.get("api/lookups/countries/" + e.target.value + "/cities", undefined, undefined, undefined, loggedInUser.token);
        if(citiesRequest.ok){
          const cities : ILookup[] = await citiesRequest.json();
          setFromCities(cities);
        }
        else {
          toast.error('Problem Occured');
        }
    };

    const toCountryChange = async (e: any) => {
      var citiesRequest = await DataService.get("api/lookups/countries/" + e.target.value + "/cities", undefined, undefined, undefined, loggedInUser.token);
        if(citiesRequest.ok){
          const cities : ILookup[] = await citiesRequest.json();
          setToCities(cities);
        }
        else {
          toast.error('Problem Occured');
        }
    };

  const handleSubmit = async (event: any) => {
    
     await DataService.post("api/shipmentrequest",fields,undefined,undefined,undefined,loggedInUser.token)
    .then(async (result) =>
    {
      debugger;
      if(result.ok){
        const id:any = await result.text();
        navigate('/shipmentdetails/' + id);
      }else {
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
          <FormControl variant="outlined">
            <InputLabel id="fromCountry">From Country</InputLabel>
            <Select
                labelId="fromCountry"
                name="fromCountry"
                onChange={fromCountryChange}
                label="Model"
            >
              {fromCountries != null && fromCountries.length > 0 ? fromCountries.map(country=> {
                // Here goes your models option
                return <MenuItem value={country.id}>
                    <em>{country.name}</em>
                </MenuItem>
                }) : null
               }
            </Select>
        </FormControl>
        </Grid>
        <Grid item style={styles.gridItem}>
        <FormControl variant="outlined">
            <InputLabel id="fromCity">From City</InputLabel>
            <Select
                labelId="fromCity"
                name="fromCityId"
                label="Model"
                onChange={handleChange}
            >
              {fromCities != null && fromCities.length > 0 ? fromCities.map(city=> {
                // Here goes your models option
                return <MenuItem value={city.id}>
                    <em>{city.name}</em>
                </MenuItem>
                }) : null
               }
            </Select>
        </FormControl>
        </Grid>
        <Grid item style={styles.gridItem}>
        <FormControl variant="outlined">
            <InputLabel id="toCountry">To Country</InputLabel>
            <Select
                labelId="toCountry"
                name="toCountry"
                onChange={toCountryChange}
                label="Model"
            >
              {toCountries != null && toCountries.length > 0 ? toCountries.map(country=> {
                // Here goes your models option
                return <MenuItem value={country.id}>
                    <em>{country.name}</em>
                </MenuItem>
                }) : null
               }
            </Select>
        </FormControl>
        </Grid>
        <Grid item style={styles.gridItem}>
        <FormControl variant="outlined">
            <InputLabel id="toCity">To City</InputLabel>
            <Select
                labelId="toCity"
                name="toCityId"
                label="Model"
                onChange={handleChange}
            >
              {toCities != null && toCities.length > 0 ? toCities.map(city=> {
                // Here goes your models option
                return <MenuItem value={city.id}>
                    <em>{city.name}</em>
                </MenuItem>
                }) : null
               }
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
            id='user-from-location'
            label='User From Location'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
          />
        </Grid>
        <Grid item style={styles.mapItem}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {/* <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text='My Marker'
            /> */}
          </GoogleMapReact>
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
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {/* <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text='My Marker'
            /> */}
          </GoogleMapReact>
        </Grid>
        <Grid item style={styles.gridItem}>
          <Button variant='contained' style={styles.submitButton} onClick={handleSubmit}>
            Create
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateShipment;
