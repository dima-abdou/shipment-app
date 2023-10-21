import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import DataService from '../services/dataServices';
import { IUser } from '../types';
import User from '../models/user';
// import logoShip from '../assets/images/logoShip.jpg'

const styles = {
  MyLogo: {
    width: '65%',
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

const Login: React.FC<{}> = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fields, setFields] = useState<Record<string, any>>({
    email: '',
    password: '',
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

  const handleChange = (e: any) => {
    setFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event: any) => {
    var result = await DataService.post('api/user/login', fields);
    if (result.ok) {
      const user: IUser = await result.json();
      User.setUser(user);
      navigateToLandingPage();
    } else if (result.status == 404) {
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
          src={`/images/logoShip.jpg`} //{`/images/shipment-logo.png`}
          loading='lazy'
          style={styles.MyLogo}
        />
      </Grid>
      <Grid item>
        <TextField
          name='email'
          label='Email'
          variant='outlined'
          style={styles.itemWidth}
          value={fields.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          name='password'
          label='Password'
          type='password'
          variant='outlined'
          style={styles.itemWidth}
          value={fields.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          style={styles.button}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          style={styles.button}
          onClick={navigateToRegister}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
