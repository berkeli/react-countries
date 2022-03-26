import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CountryList from './components/CountryList';
import DisplayCountry from './components/DisplayCountry';
import Header from './components/Header';
import { API_URL } from './constants';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(API_URL).then((data:Response) => data.json()).then((res) => {
      setCountries(res);
      setLoading(false);
    });
  }, []);
  return (
      <Router>
        <Header />
        <Box  px='8'>
          <Routes>
            <Route path='/' element={<CountryList countries={countries} loading={loading}/>} />
            <Route path='/countries/:country' element={<DisplayCountry countries={countries} loading={loading}/>} />
          </Routes>
        </Box>
      </Router>
  );
}

export default App;
