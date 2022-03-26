import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Flex, Heading, Image, Spinner, useColorModeValue, Center } from '@chakra-ui/react';
import { Country } from '../types';
import { PER_PAGE } from '../constants';
import SearchAndFilter from './SearchAndFilter';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../utils';

export default function CountryList({ countries, loading } : { countries: Country[], loading: boolean }): JSX.Element {
  const [page, setPage] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [countriesFiltered, setCountriesFiltered] = useState(countries);
  const [countriesPaginated, setCountriesPaginated] = useState(countriesFiltered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE));
  const [searchQuery, setSearchQuery] = useState('');
  const lastCountry = useRef<IntersectionObserver>();

  const lastItemRef = useCallback((node) => {
    if (lastCountry.current) lastCountry.current.disconnect() 
    lastCountry.current = new IntersectionObserver(entries => { 
      if (entries[0].isIntersecting && countriesPaginated.length < countriesFiltered.length) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if (node) lastCountry.current.observe(node) 
  }, [countriesPaginated, countriesFiltered])

  useEffect(() =>{
    document.title='Countries and their details'
  }, [])

  useEffect(() =>{
    setCountriesPaginated(countriesFiltered.slice(0, page * PER_PAGE + PER_PAGE));
  }, [page, countriesFiltered])

  useEffect(() => {
    setCountriesFiltered(countries.filter(({ name, region } : { name: string, region: string }) => (selectedRegion === 'all' || region === selectedRegion) && name.toLowerCase().includes(searchQuery.toLowerCase())));
    setPage(0);
  }, [searchQuery, countries, selectedRegion]);

  return (
    <>
      <SearchAndFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} region={selectedRegion} setRegion={setSelectedRegion}/>
      {loading && <Center><Spinner size='xl'/></Center>}
      <Flex justifyContent={['center', 'center', 'space-between']} flexWrap='wrap'>
        {countriesPaginated.map((country: Country, id: number) => {
          if (id === countriesPaginated.length - 1) {
            return <SingleCountry key={country.name} country={country} ref={lastItemRef}/>
          }
          return <SingleCountry key={country.name} country={country}/>
        })}
      </Flex>
    </>
  )
}

const SingleCountry = forwardRef(({ country } : { country: Country }, ref:React.Ref<HTMLDivElement>): JSX.Element => {
  return (
    <Box maxW='sm' minW='sm' bg={useColorModeValue('gray.100', 'gray.900')} boxShadow='md' my='4' cursor='pointer' ref={ref}>
      <Link to={`/countries/${encodeURIComponent(country.name)}`}>
        <Image src={country.flag} alt={country.name} objectFit='cover' w='sm' h='12em'/>
        <Box p='4'>
          <Heading as='h3' size='md'>
            {country.name}
          </Heading>
          <Heading as='h5' size='s'>Population: {numberWithCommas(country.population)}</Heading>
          <Heading as='h5' size='s'>Region: {country.region}</Heading>
          <Heading as='h5' size='s'>Capital: {country.capital}</Heading>
        </Box>
      </Link>
    </Box>
  )
})