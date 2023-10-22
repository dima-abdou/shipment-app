import {
  Avatar,
  Button,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import GoogleMapReact from 'google-map-react';
import DataService from '../../services/dataServices';
import { ILookup, IUser, lookupInitialValues } from '../../types';
import User from '../../models/user';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

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
};

const ShipmentDetails: React.FC = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  interface matchedTrip {
    id: string,
    userFirstName: string,
    userLastName: string,
    fromAirport: ILookup,
    toAirport : ILookup,
    fromDate: dayjs.Dayjs,
    toDate: dayjs.Dayjs,
    availableSpaceInCMCube: number,
    availableWeightInKG: number
  };

 const matchedTripInitials : matchedTrip = {
  id: '',
  userFirstName: '',
  userLastName: '',
  fromAirport: lookupInitialValues,
  toAirport: lookupInitialValues,
  fromDate: dayjs(new Date()),
  toDate: dayjs(new Date()),
  availableSpaceInCMCube: 0,
  availableWeightInKG: 0
 };

  const params = useParams();
  const loggedInUser: IUser = User.getUser;
  const [fields, setFields] = useState<Record<string, any>>({
    fromCountry: '',
    fromCity: '',
    toCountry: '',
    toCity: '',
    spaceInCMCube: '',
    weightInKG: '',
    userFromLocation: '',
    userToLocation : ''
});
  const [matchedTrips, setMatchedTrips] = useState<matchedTrip[]>(new Array(matchedTripInitials));
  const [make,setMake] = useState<boolean>(false);

useEffect(() => {
  getShipmentDetails();
},[]);

const getShipmentDetails = async() => {
  var shipmentRequestR = await DataService.get("api/shipmentrequest/"+ params.id,undefined,undefined,undefined,loggedInUser.token);
  if(shipmentRequestR.ok){
    var shipmentData = await shipmentRequestR.json();
    const newValues = {... fields};
    newValues.fromCountry = shipmentData?.fromCountry?.name;
    newValues.fromCity = shipmentData?.fromCity?.name;
    newValues.toCountry = shipmentData?.toCountry?.name;
    newValues.toCity = shipmentData?.toCity?.name;
    newValues.spaceInCMCube = shipmentData?.spaceInCMCube;
    newValues.weightInKG = shipmentData?.weightInKG;
    setFields(newValues);
  }
  var matchedTripsR = await DataService.get("api/Trip/shipmentrequests/"+ params.id,undefined,undefined,undefined,loggedInUser.token);
  if(matchedTripsR.status == 200){
    setMake(true);
    const mTrips : matchedTrip[] = await matchedTripsR.json();
    const tripsValues = new Array();
    mTrips.forEach(element => {
      element.fromDate = dayjs(element.fromDate);
      element.toDate = dayjs(element.toDate);
      tripsValues.push(element);
    });
    setMatchedTrips(tripsValues);
  }
};
  const navigate = useNavigate();

  const navigateToLandingPage = () => {
    navigate('/landing');
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
          <span>Shipment Request Details</span>
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='fromCountry'
            label='From Country'
            variant='outlined'
            sx={{ m: 0.5, width: '25ch' }}
            style={styles.itemWidth}
            size='small'
            value={fields.fromCountry}
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
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
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
            value={fields.fromCity}
            disabled
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            name='toCountry'
            label='To-Country'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
            value={fields.toCountry}
            sx={{ m: 0.5, width: '25ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
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
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
            disabled
          />
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
              startAdornment: <InputAdornment position="start"></InputAdornment>,
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
              startAdornment: <InputAdornment position="start"></InputAdornment>,
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
            disabled
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
        <Grid item style={styles.title}>
          <span>Matched Trips</span>
        </Grid>
        <Grid item style={styles.tripsGridItem}>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              paddingTop: '0px',
            }}
          >
            {make ? matchedTrips.map(m => {
              return <ListItem alignItems='flex-start'>
              {/* <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar> */}
              <ListItemText
                primary={m.userFirstName + ' ' + m.userLastName}
                secondary={
                  <>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color='text.secondary'
                      gutterBottom
                    >
                      From: {m.fromAirport.name} To: {m.toAirport.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color='text.secondary'
                      gutterBottom
                    >
                     {m.fromDate.format('MM/DD/YYYY')} - {m.toDate.format('MM/DD/YYYY')}
                    </Typography>
                    <Typography variant='body2'>Available Space in cm Cube : {m.availableSpaceInCMCube}</Typography>
                    <Typography variant='body2'>Available Weight in Kg: {m.availableWeightInKG}</Typography>
                  </>
                }
              />
            </ListItem>
            }) : null}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShipmentDetails;
