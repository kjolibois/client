
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { signOut } from '../../features/account/accountSlice';
import { clearBasket } from '../../features/basket/basketSlice';
import { Link } from 'react-router-dom';

export default function SignedInMenu() {
  const dispatch  = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {user} = useAppSelector(state => state.account )

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color = 'inherit'
        onClick={handleClick}
        sx={{typography:'h6'}}
      >
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to='/orders' >My orders</MenuItem>
        <MenuItem onClick={() => {
          dispatch(signOut());
          dispatch(clearBasket())
          
          }}>Logout</MenuItem>
      </Menu>
    </>
  );
}