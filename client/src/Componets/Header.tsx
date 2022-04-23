import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';

import SearchList from './SearchList';
import ModalForm from './ModalForm';
import useToggle from '../Hooks/useToggle';
import { Button, TextField } from '@mui/material';
import { createMovies } from '../Services/MovieService';



export default function PrimarySearchAppBar() {
 
  const [open, setOpen] = useToggle()
  const [files,setFiles]= React.useState(null)
  
  const handleInputChange=({target}:any)=>{
    const getFile = target.files[0]
    setFiles(getFile)
  }
  const handleSubmit=()=>{
     createMovies(files)
   }
  const handleOpenModal=()=>{
    setOpen()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleOpenModal}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
         
          <Box sx={{ flexGrow: 1 }} />
      <SearchList/>
         
        </Toolbar>
      </AppBar>
      <ModalForm open={open} setOpen={setOpen}>
        <div>

     <TextField type="file" name="movies" onChange={handleInputChange} style={{marginBottom:"1em"}}/>
     <Button fullWidth color="primary" variant='contained' onClick={handleSubmit}>Enviar</Button>
        </div>
      </ModalForm>
     
    </Box>
  );
}