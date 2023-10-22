import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { ILookup, IUser, lookupInitialValues } from '../../types';
import User from '../../models/user';
import { useEffect, useState } from 'react';
import DataService from '../../services/dataServices';

const styles = {
  MyCard: {
    marginTop: '4%',
    minWidth: '340px',
    borderRadius: '10px',
    height: '100px',
  },
  MyCardContent: {
    paddingTop: '5px',
  },
  submitButton: {
    width: '360px',
    backgroundColor: '#2c3e52',
    marginTop: '20px',
    marginButton: '10px',
  },
};

const ShipmentList = () => {
  const loggedInUser: IUser = User.getUser;
  interface shipmentRequest {
    id: string;
    fromCity: ILookup;
    toCity: ILookup;
    spaceInCMCube: number;
    weightInKG: number;
  }

  const shipmentRequestInitials: shipmentRequest = {
    id: '',
    fromCity: lookupInitialValues,
    toCity: lookupInitialValues,
    spaceInCMCube: 0,
    weightInKG: 0,
  };

  const [make, setMake] = useState<boolean>(false);
  const [shipmentRequests, setShipmentRequests] = useState<shipmentRequest[]>(
    new Array(shipmentRequestInitials),
  );

  const navigate = useNavigate();

  const navigateToShipmentDetails = (id: string) => {
    navigate('/shipmentdetails/' + id);
  };

  const navigateToCreateShipment = () => {
    navigate('/createshipment');
  };

  useEffect(() => {
    getShipmentRequests();
  }, []);

  const getShipmentRequests = async () => {
    var shipmentR = await DataService.get(
      'api/ShipmentRequest',
      undefined,
      undefined,
      undefined,
      loggedInUser.token,
    );
    if (shipmentR.ok && shipmentR.status == 200) {
      setMake(true);
      var trip = await shipmentR.json();
      const newValues: any = [];
      trip.forEach((element: shipmentRequest) => {
        newValues.push(element);
      });
      setShipmentRequests(newValues);
    }
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={1}
    >
      {make
        ? shipmentRequests.map((s) => {
            return (
              <Grid item>
                <Card style={styles.MyCard}>
                  <CardActionArea
                    onClick={() => navigateToShipmentDetails(s.id)}
                  >
                    <CardContent style={styles.MyCardContent}>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color='text.secondary'
                        gutterBottom
                      >
                        From {s.fromCity.name} - To {s.toCity.name}
                      </Typography>
                      <Typography variant='body2'>
                        Space in cm Cube: {s.spaceInCMCube}
                      </Typography>
                      <Typography variant='body2'>
                        Weight in Kg: {s.weightInKG}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
                </Card>
              </Grid>
            );
          })
        : null}
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
