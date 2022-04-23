import { Grid, Pagination, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';

import './App.css';
import CardMovie from './Componets/Card';
import SearchAppBar from './Componets/Header';
import ContextProvider, { movieContext } from './Context/useContext';

function App() {
  const [page,setPage]=useState(1)
  const {getAllMovies,seachMovies}= useContext(movieContext)
  const handleChange=(_:any,value:any)=>{
    setPage(value)
   console.log(seachMovies)
  }
  return (
    
    <ContextProvider>
      <SearchAppBar/>
     <Grid container >
      
        <CardMovie/>
      
    
     </Grid>
     
    </ContextProvider>
  );
}

export default App;
