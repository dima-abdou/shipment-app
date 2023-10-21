import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/landing/Landing';
import ShipmentList from './components/shipment-list/ShipmentList';

import Login from './components/login';
import TripDetails from './components/trip-details/TripDetails';
import TripList from './components/trip-list/TripList';
import Register from './components/Register';
import ShipmentDetails from './components/shipmet-details/ShipmentDetails';
import CreateTrip from './components/create-trip/CreateTrip';
import CreateShipment from './components/create-shipment/CreateShipment';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/tripdetails' element={<TripDetails />} />
      <Route path='/shipmentdetails' element={<ShipmentDetails />} />
      <Route path='/landing' element={<Landing />} />
      <Route path='/shipmentlist' element={<ShipmentList />} />
      <Route path='/triplist' element={<TripList />} />
      <Route path='/createtrip' element={<CreateTrip />} />
      <Route path='/createshipment' element={<CreateShipment />} />
    </Routes>
  );
};

export default Routers;
