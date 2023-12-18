import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from '../../assets/rider-logo.svg';
import { Link } from 'react-router-dom';
import { COLOR } from '../../assets/styles/colors';
import Tabs from './TabsBlock';
import TabsBlock from './TabsBlock';

function ResponsiveAppBar() {

  return (
    <AppBar
    position="sticky"
    sx={{
        backgroundColor: "#fff"
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{gap: '20px'}}>
          <Link to="/">
            <img src={Logo} width={40}/>
          </Link>
          <TabsBlock />

          <Box sx={{ flexGrow: 0 }}>
            <Link to="/login"><Button variant="outlined">Login</Button></Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;