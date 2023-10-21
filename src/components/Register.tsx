import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { MuiTelInput } from 'mui-tel-input';
import DataService from '../services/dataServices';
import { IUser } from '../types';
import { toast } from 'react-toastify';
import User from '../models/user';
const styles = {
  MyLogo: {
    width: '50%',
    marginLeft: '20%',
    marginTop: '10%',
  },
  itemWidth: {
    width: '300px',
  },
  button: {
    backgroundColor: '#2c3e52',
    width: '300px',
  },
};

const Register: React.FC<{}> = () => {
  // const [phoneValue, setPhoneValue] = React.useState('');
  const handlePhoneValueChange = (newValue: string) => {
    //  setPhoneValue(newValue);
    setFields((prevState) => ({
      ...prevState,
      phoneNumber: newValue,
    }));
  };

  const [fields, setFields] = useState<Record<string, any>>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

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

  const handleSubmit = async (event: any) => {
    debugger;
    var result = await DataService.post('api/user', fields);
    if (result.ok) {
      const user: IUser = await result.json();
      User.setUser(user);
      navigateToLandingPage();
    } else if (result.status === 400) {
      toast.error('Submit Failed');
    } else {
      toast.error('Problem Occured');
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
          src={`/images/logoShip.jpg`}
          loading='lazy'
          style={styles.MyLogo}
        />
      </Grid>
      <Grid item>
        <TextField
          name='firstName'
          label='First Name'
          variant='outlined'
          style={styles.itemWidth}
          value={fields.firstName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          name='lastName'
          label='Last Name'
          variant='outlined'
          style={styles.itemWidth}
          value={fields.lastName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          name='email'
          label='Email'
          type='email'
          variant='outlined'
          style={styles.itemWidth}
          value={fields.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <MuiTelInput
          name='phoneNumber'
          label='Phone Number'
          variant='outlined'
          value={fields.phoneNumber}
          onChange={handlePhoneValueChange}
          style={styles.itemWidth}
        />
      </Grid>
      <Grid item>
        <TextField
          name='password'
          label='Password'
          type='password'
          variant='outlined'
          value={fields.password}
          style={styles.itemWidth}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          style={styles.button}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
