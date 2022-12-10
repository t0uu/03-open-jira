import { useContext } from 'react';
import NextLink  from 'next/link';
import { AppBar, Toolbar, IconButton, Typography,Link } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';
export const Navbar = () => {
  const {openSideMenu} = useContext(UIContext);
    return (
    <AppBar position='sticky' >
        <Toolbar>
            <IconButton
            size='large'
            edge='start'
            onClick={openSideMenu}
            >
                <MenuOutlinedIcon/>
            </IconButton>
           <NextLink href='/' passHref style={{color:'white',textDecoration:'none'}}>
            <Typography variant='h6'>OpenJira</Typography>
           </NextLink>
        </Toolbar>
    </AppBar>
    )
}
