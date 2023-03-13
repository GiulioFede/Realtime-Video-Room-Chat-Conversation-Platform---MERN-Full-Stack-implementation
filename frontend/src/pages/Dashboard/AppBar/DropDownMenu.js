import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { logout } from '../../authPages/userDetailsSlice';

const DropDownMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleMenuOpen = (event) =>{
    setAnchorEl(event.currentTarget);
  }

  return (
    <div>
      <IconButton onClick={handleMenuOpen} style={{color: "white"}}>
         <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default DropDownMenu;