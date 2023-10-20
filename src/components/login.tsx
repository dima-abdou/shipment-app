import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

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

  // User Login info
  const database = [
    {
      username: 'user1',
      password: 'pass1',
    },
    {
      username: 'user2',
      password: 'pass2',
    },
  ];

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

  const handleSubmit = (event: any) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: 'pass', message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: 'uname', message: errors.uname });
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
          id='user-name'
          label='User Name'
          variant='outlined'
          style={styles.itemWidth}
        />
      </Grid>
      <Grid item>
        <TextField
          id='password'
          label='Password'
          type='password'
          variant='outlined'
          style={styles.itemWidth}
        />
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          style={styles.itemWidth}
          onClick={navigateToLandingPage}
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
