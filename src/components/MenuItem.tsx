import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { IMenuItem } from '../types';

type Props = IMenuItem & {
  selected?: boolean;
  onClick?: () => void;
};

export const MenuItem: React.FC<Props> = ({
  route,
  literal,
  Icon,
  selected,
  onClick,
}) => {
  const link = (
    <ListItem
      button
      selected={selected}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'primary.white',
          color: '#2c3e52',
        },
        '&:hover': {
          backgroundColor: 'primary.light',
          color: '#2c3e52',
        },
      }}
      onClick={onClick}
    >
      <ListItemIcon
        sx={[
          { minWidth: 'auto' },
          (theme) => ({
            paddingRight: theme.spacing(2),
          }),
        ]}
      >
        <Icon sx={{ color: '#2c3e52' }} />
      </ListItemIcon>
      <ListItemText primary={literal} />
    </ListItem>
  );

  return route ? <Link to={route}>{link}</Link> : link;
};
