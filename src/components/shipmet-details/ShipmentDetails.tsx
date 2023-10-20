import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
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
};

const ShipmentDetails: React.FC<{}> = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  const navigate = useNavigate();

  const navigateToLandingPage = () => {
    navigate('/landing');
  };

  const handleSubmit = (event: any) => {};

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
            id='from-country'
            label='From Country'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            id='from-city'
            label='From City'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            id='to-country'
            label='To-Country'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            id='to-city'
            label='To City'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            id='space-in-cube'
            label='Space In Cube'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            id='weight-in-kg'
            label='Weight In KG'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
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
            <ListItem alignItems='flex-start'>
              {/* <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar> */}
              <ListItemText
                primary='Matched Trip 1'
                secondary={
                  <>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color='text.secondary'
                      gutterBottom
                    >
                      Departure Date: 13/08/2023
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color='text.secondary'
                      gutterBottom
                    >
                      Arrivale Date: 13/08/2023
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant='fullWidth' component='li' />
            <ListItem alignItems='flex-start'>
              {/* <ListItemAvatar>
                <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
              </ListItemAvatar> */}
              <ListItemText
                primary='Matched Trip 2'
                secondary={
                  <>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color='text.secondary'
                      gutterBottom
                    >
                      Departure Date: 13/08/2023
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color='text.secondary'
                      gutterBottom
                    >
                      Arrivale Date: 13/08/2023
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant='fullWidth' component='li' />
            <ListItem alignItems='flex-start'>
              {/* <ListItemAvatar>
                <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
              </ListItemAvatar> */}
              <ListItemText
                primary='Matched Trip 3'
                secondary={
                  <>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color='text.secondary'
                      gutterBottom
                    >
                      Departure Date: 13/08/2023
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color='text.secondary'
                      gutterBottom
                    >
                      Arrivale Date: 13/08/2023
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShipmentDetails;
