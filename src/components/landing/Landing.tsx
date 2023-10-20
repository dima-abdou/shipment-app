import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Rating, Typography } from '@mui/material';
import ShipmentList from '../shipment-list/ShipmentList';
import TripList from '../trip-list/TripList';
import { useState } from 'react';
import { isEmpty } from '../../utils';

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
    },
  };

  const navigate = useNavigate();

  const [isShipment, toggleIsShipment] = useState<boolean>();

  // return (
  //   <Box
  //     sx={{
  //       width: '100%',
  //       maxWidth: 360,
  //       bgcolor: 'background.paper',
  //       margin: '4%',
  //       marginTop: '5%',
  //     }}
  //   >
  //     <nav aria-label='main mailbox folders'>
  //       <List>
  //         <Divider />
  //         <ListItem
  //           disablePadding
  //           style={{ backgroundColor: '#17406F', minHeight: '150px' }}
  //         >
  //           <ListItemButton onClick={navigateToTripList}>
  //             <ListItemIcon>
  //               <ConnectingAirportsIcon style={{ color: 'white' }} />
  //             </ListItemIcon>
  //             <ListItemText primary='My Trips' style={{ color: 'white' }} />
  //           </ListItemButton>
  //         </ListItem>
  //         <Divider />
  //         <ListItem
  //           disablePadding
  //           style={{ backgroundColor: '#17406F', minHeight: '150px' }}
  //         >
  //           <ListItemButton onClick={navigateToShipmentList}>
  //             <ListItemIcon>
  //               <CardTravelIcon style={{ color: 'white' }} />
  //             </ListItemIcon>
  //             <ListItemText
  //               primary='My Shipment Requests'
  //               style={{ color: 'white' }}
  //             />
  //           </ListItemButton>
  //         </ListItem>
  //       </List>
  //     </nav>
  //     <Divider />
  //   </Box>
  // );
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
        {isEmpty(isShipment) && (
          <Grid style={styles.welcome} margin={3} item xs={12} md={6}>
            <Typography variant='h4' fontWeight={700}>
              Welcome,
            </Typography>
            <Typography variant='h5' fontWeight={700}>
              Mrs. Ali Abdo
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
