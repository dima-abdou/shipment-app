import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';

import { useDrawerContext } from '../contexts/drawer-context';
import BackButton from './BackButton';

export const Header = () => {
  const { isOpened, toggleIsOpened } = useDrawerContext();
  const theme = useTheme();
  return (
    <AppBar
      sx={{ backgroundColor: '#2c3e52', color: 'secondary.contrastText' }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          onClick={() => toggleIsOpened(!isOpened)}
          sx={{ padding: theme.spacing(1) }}
        >
          {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <BackButton></BackButton>
        {/* <Typography variant='h6' sx={{ margin: 'auto' }}>
          ShipShare
        </Typography> */}
        <img
          src={`/images/logoShipBlack.jpg`} //{`/images/shipment-logo.png`}
          loading='lazy'
          style={{
            width: '34%',
            marginLeft: '16%',
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
