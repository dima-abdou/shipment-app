import { PropsWithChildren } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  useTheme,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';

export const Footer = ({ children }: PropsWithChildren<unknown>) => {
  const theme = useTheme();

  if (!children) {
    return null;
  }

  return (
    <Box
      sx={{
        background: theme.palette.primary.light,
        color: theme.palette.secondary.light,
        padding: theme.spacing(2),
        textAlign: 'center',
      }}
    >
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels value={true}>
          <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
          <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
          <BottomNavigationAction label='Archive' icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
      {/* { children } */}
    </Box>
  );
};
