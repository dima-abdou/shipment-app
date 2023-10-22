import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Rating, Typography } from '@mui/material';
import ShipmentList from '../shipment-list/ShipmentList';
import TripList from '../trip-list/TripList';
import { useState } from 'react';
import { isEmpty } from '../../utils';
import User from '../../models/user';
import { IUser } from '../../types';

const Landing = () => {
  const styles = {
    welcome: {
      display: 'grid',
      justifyContent: 'center',
      gridGap: '5px',
    },
    navButton: {
      width: '95%',
      margin: '5px',
      height: '80px',
      backgroundColor: '#2c3e52',
      marginTop: '30px',
    },
  };

  const navigate = useNavigate();

  const [isShipment, toggleIsShipment] = useState<boolean>();
  const loggedInUser: IUser = User.getUser;
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={6} md={6}>
          <Grid item>
            <Button
              variant='contained'
              style={styles.navButton}
              startIcon={<CardTravelIcon />}
              onClick={() => {
                toggleIsShipment(true);
              }}
            >
              My Shipments
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6} md={6}>
          <Grid item>
            <Button
              variant='contained'
              style={styles.navButton}
              startIcon={<ConnectingAirportsIcon />}
              onClick={() => {
                toggleIsShipment(false);
              }}
            >
              My Trips
            </Button>
          </Grid>
        </Grid>
        {loggedInUser !== null && isEmpty(isShipment) && (
          <Grid style={styles.welcome} margin={3} item xs={12} md={6}>
            <Typography variant='h4' fontWeight={700}>
              Welcome,
            </Typography>
            <Typography variant='h5' fontWeight={700}>
              {loggedInUser?.firstName}
            </Typography>
            <Typography component='legend'>Your Rating</Typography>
            <Rating
              name='simple-controlled'
              value={3}
              onChange={(event, newValue) => {
                // setValue(newValue);
              }}
            />
          </Grid>
        )}
      </Grid>
      <Container fixed>
        {isShipment && <ShipmentList />}
        {isShipment === false && <TripList />}
      </Container>
    </>
  );
};

export default Landing;
