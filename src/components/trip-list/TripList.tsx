import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import DataService from '../../services/dataServices';
import {
  ILocation,
  ILookup,
  IUser,
  locationInitials,
  lookupInitialValues,
} from '../../types';
import User from '../../models/user';
import { arrayBuffer } from 'stream/consumers';
import internal from 'stream';

const styles = {
  MyCard: {
    marginTop: '20px',
    minWidth: '340px',
    borderRadius: '10px',
    height: '160px',
  },
  MyCardContent: {
    paddingTop: '5px',
  },
  submitButton: {
    width: '360px',
    backgroundColor: '#2c3e52',
    marginTop: '20px',
    marginButton: '10px',
  },
};

const TripList = () => {
  const loggedInUser: IUser = User.getUser;
  interface trip {
    id: string;
    fromAirport: ILookup;
    toAirport: ILookup;
    fromDate: dayjs.Dayjs;
    toDate: dayjs.Dayjs;
    availableSpaceInCMCube: '';
    availableWeightInKG: '';
    UserFromLocation: ILocation;
    UserToLocation: ILocation;
  }

  const tripInitials: trip = {
    id: '',
    fromAirport: lookupInitialValues,
    toAirport: lookupInitialValues,
    fromDate: dayjs(new Date()),
    toDate: dayjs(new Date()),
    availableSpaceInCMCube: '',
    availableWeightInKG: '',
    UserFromLocation: locationInitials,
    UserToLocation: locationInitials,
  };
  const [make, setMake] = useState<boolean>(false);
  const [trips, setTrips] = useState<trip[]>(new Array(tripInitials));
  const navigate = useNavigate();

  const navigateToTripDetails = (id: string) => {
    navigate('/tripdetails/' + id);
  };

  const navigateToCreateTrip = () => {
    navigate('/createtrip');
  };

  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = async () => {
    var tripR = await DataService.get(
      'api/trip',
      undefined,
      undefined,
      undefined,
      loggedInUser.token,
    );
    if (tripR.ok && tripR.status == 200) {
      setMake(true);
      const trip: trip[] = await tripR.json();
      const newValues: any = [];
      trip.forEach((element) => {
        element.fromDate = dayjs(element.fromDate);
        element.toDate = dayjs(element.toDate);
        newValues.push(element);
      });
      setTrips(newValues);
    }
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={1}
    >
      {make
        ? trips.map((t) => {
            return (
              <Grid item>
                <Card style={styles.MyCard}>
                  <CardActionArea onClick={() => navigateToTripDetails(t.id)}>
                    <CardContent style={styles.MyCardContent}>
                      <Typography variant='h6' component='div'>
                        Trip
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color='text.secondary'>
                        From {t.fromAirport.name} - To {t.toAirport.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                        {t.fromDate.format('MM/DD/YYYY')} -{' '}
                        {t.toDate.format('MM/DD/YYYY')}
                      </Typography>
                      <Typography variant='body2'>
                        Available Space in cm Cube : {t.availableSpaceInCMCube}
                      </Typography>
                      <Typography variant='body2'>
                        Available Weight in Kg: {t.availableWeightInKG}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
                </Card>
              </Grid>
            );
          })
        : null}
      <Grid item>
        <Button
          variant='contained'
          style={styles.submitButton}
          onClick={navigateToCreateTrip}
        >
          Submit Trip
        </Button>
      </Grid>
    </Grid>
  );
};
export default TripList;
