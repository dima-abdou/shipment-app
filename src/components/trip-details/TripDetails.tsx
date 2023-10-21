import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import GoogleMapReact from 'google-map-react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

const TripDetails = () => {
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
          <span>Trip Details</span>
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            id='first-name'
            label='First name'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
          />
        </Grid>
        <Grid item style={styles.gridItem}>
          <TextField
            id='last-name'
            label='Last Name'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
          />
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
            id='from-airport'
            label='From Airport'
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
            id='to-airport'
            label='To Airport'
            variant='outlined'
            style={styles.itemWidth}
            size='small'
          />
        </Grid>
        <Grid item style={styles.datePickerGridItem}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['MobileDatePicker']}>
              <MobileDatePicker
                label='From Date'
                defaultValue={dayjs('2022-04-17')}
              />
            </DemoContainer>
          </LocalizationProvider>
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
