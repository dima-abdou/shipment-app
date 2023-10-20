import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
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

const Login: React.FC<{}> = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
    const [fields, setFields] = useState<Record<string, any>>({
        email: '',
        password: ''
    });

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password',
  };

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate('/register');
  };

  const navigateToLandingPage = () => {
    navigate('/landing');
  };

  const handleSubmit = async (event: any) => {
      var result = await DataService.post("api/user/login", fields);
      if (result.ok) {
          const user: IUser = await result.json();
          setUser(user);
          navigateToLandingPage();
      }
      else if (result.status == 404) {
          //toast
      } else {
          //internal error
      }
  };

  // Generate JSX code for error message
  // const renderErrorMessage = (name: any) =>
  //   name === errorMessages?.name && (
  //     <div className='error'>{errorMessages?.message}</div>
  //   );

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
          id='email'
          label='Email'
          variant='outlined'
          style={styles.itemWidth},
          value={fields.email}
        />
      </Grid>
      <Grid item>
        <TextField
          id='password'
          label='Password'
          type='password'
          variant='outlined'
          style={styles.itemWidth},
          value={fields.password}
        />
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          style={styles.itemWidth}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          style={styles.itemWidth}
          onClick={navigateToRegister}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
