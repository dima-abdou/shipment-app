import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { MuiTelInput } from 'mui-tel-input';

const styles = {
  MyLogo: {
    width: '50%',
    marginLeft: '20%',
    marginTop: '10%',
  },
  itemWidth: {
    width: '300px',
  },
};

const Register: React.FC<{}> = () => {
  const [phoneValue, setPhoneValue] = React.useState('');

  const handlePhoneValueChange = (newValue: string) => {
    setPhoneValue(newValue);
  };

  const navigate = useNavigate();

  const navigateToLandingPage = () => {
    navigate('/landing');
  };

  const handleSubmit = (event: any) => {};

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={3}
    >
      <Grid item>
        <img
          src={`/images/shipment-logo.png`}
          loading='lazy'
          style={styles.MyLogo}
        />
      </Grid>
      <Grid item>
        <TextField
          id='first-name'
          label='First Name'
          variant='outlined'
          style={styles.itemWidth}
        />
      </Grid>
      <Grid item>
        <TextField
          id='last-name'
          label='Last Name'
          variant='outlined'
          style={styles.itemWidth}
        />
      </Grid>
      <Grid item>
        <TextField
          id='email'
          label='Email'
          type='email'
          variant='outlined'
          style={styles.itemWidth}
        />
      </Grid>
      <Grid item>
        <MuiTelInput
          id='PhoneNumber'
          label='Phone Number'
          variant='outlined'
          value={phoneValue}
          onChange={handlePhoneValueChange}
          style={styles.itemWidth}
        />
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          style={styles.itemWidth}
          onClick={navigateToLandingPage}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
