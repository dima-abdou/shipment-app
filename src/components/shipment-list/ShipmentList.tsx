import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';

const styles = {
  MyCard: {
    marginTop: '4%',
    minWidth: '340px',
    borderRadius: '10px',
    height: '130px',
  },
  MyCardContent: {
    paddingTop: '5px',
  },
  submitButton: {
    width: '360px',
    backgroundColor: '#2c3e52',
  },
};

const ShipmentList = () => {
  const navigate = useNavigate();

  const navigateToShipmentDetails = () => {
    navigate('/shipmentdetails');
  };

  const navigateToCreateShipment = () => {
    navigate('/createshipment');
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={1}
    >
      <Grid item>
        <Card style={styles.MyCard}>
          <CardActionArea onClick={navigateToShipmentDetails}>
            <CardContent style={styles.MyCardContent}>
              <Typography variant='h6' component='div'>
                Shipment 1
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                From (---) - To (---)
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                8:30am - 10:50am
              </Typography>
              <Typography variant='body2'>Available Weight: 7K</Typography>
            </CardContent>
          </CardActionArea>
          {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
        </Card>
      </Grid>
      <Grid item>
        <Card style={styles.MyCard}>
          <CardContent style={styles.MyCardContent}>
            <Typography variant='h6' component='div'>
              Shipment 2
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              From (---) - To (---)
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              9:30am - 11:50am
            </Typography>
            <Typography variant='body2'>Available Weight: 8K</Typography>
          </CardContent>
          {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
        </Card>
      </Grid>
      <Grid item>
        <Card style={styles.MyCard}>
          <CardContent style={styles.MyCardContent}>
            <Typography variant='h6' component='div'>
              Shipment 3
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              From (---) - To (---)
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              10:30am - 12:50pm
            </Typography>
            <Typography variant='body2'>Available Weight: 6k</Typography>
          </CardContent>
          {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
        </Card>
      </Grid>
      <Grid item>
        <Card style={styles.MyCard}>
          <CardContent style={styles.MyCardContent}>
            <Typography variant='h6' component='div'>
              Shipment 4
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              From (---) - To (---)
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              10:30am - 12:50pm
            </Typography>
            <Typography variant='body2'>Available Weight: 10k</Typography>
          </CardContent>
          {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
        </Card>
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          style={styles.submitButton}
          onClick={navigateToCreateShipment}
        >
          Submit Shipment
        </Button>
      </Grid>
    </Grid>
  );
};
export default ShipmentList;
