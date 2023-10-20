import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { MuiTelInput } from 'mui-tel-input';
import DataService from '../services/dataServices';
import { IUser } from '../types';
import { setUser } from '.';

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

  const [fields, setFields] = useState<Record<string, any>>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const navigate = useNavigate();

  const navigateToLandingPage = () => {
    navigate('/landing');
  };

  const handleSubmit = async (event: any) => {
      var result = await DataService.post("api/user", fields);
      if (result.ok) {
          const user: IUser = await result.json();
          setUser(user);
      }
      else if(result.status == 400) {
          //toast
      } else {
          //internal error
      }
  };

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
          id='firstName'
          label='First Name'
          variant='outlined'
          style={styles.itemWidth}
          value={fields.firstName}
        />
      </Grid>
      <Grid item>
        <TextField
          id='lastName'
          label='Last Name'
          variant='outlined'
          style={styles.itemWidth}
          value={fields.lastName}
        />
      </Grid>
      <Grid item>
        <TextField
          id='email'
          label='Email'
          type='email'
          variant='outlined'
          style={styles.itemWidth},
          value={fields.email}
        />
      </Grid>
      <Grid item>
        <MuiTelInput
          id='phoneNumber'
          label='Phone Number'
          variant='outlined'
          value={fields.phoneNumber},
          onChange={handlePhoneValueChange}
          style={styles.itemWidth}
        />
        </Grid>
        <Grid item>
          <TextField
            id='password'
            label='Password'
            type='password'
            variant='outlined'
            value={fields.password},
            style={styles.itemWidth}
            />
        </Grid>
      <Grid item>
        <Button
          variant='contained'
          style={styles.itemWidth}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
