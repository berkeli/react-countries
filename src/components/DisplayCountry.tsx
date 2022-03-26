import { Box, Button, Center, Flex, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Country, Currency, Language } from '../types';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { numberWithCommas } from '../utils';

interface IDisplayCountry {
  countries: Country[];
  loading: boolean;
}

export default function DisplayCountry({ countries, loading }:IDisplayCountry):JSX.Element {
  const { country } = useParams();
  const countryData = countries.find((c:Country) => c.name === country);
  const [neighbours, setNeighbours] = useState<Country[]>([]);
  useEffect(()=> {
    if (countryData) {
      setNeighbours(countries.filter((c:Country) => c?.borders?.includes(countryData.alpha3Code)));
    }
  }, [countryData, countries]);
  return (
    <Box mt='8'>
      <Flex my='4'>
        <Link to='/'>
          <Button> 
            <AiOutlineArrowLeft /> 
            <Text ml='4'>Back</Text>
          </Button>
        </Link>
      </Flex>
      {loading && <Center><Spinner size='xl'/></Center>}
      {!countryData && !loading && <Center>Country not found</Center>}
      {countryData && <CountryDetails country={countryData} neighbours={neighbours}/>}
    </Box>
  )
}

const CountryDetails = ({ country, neighbours }: { country: Country, neighbours: Country[] }):JSX.Element => {
  return (
    <Flex flexDirection={['column', 'column', 'row']} w='100%'>
      <Image src={country.flag} alt={country.name} objectFit='cover' w={['100%', '100%', '50%']}/>
      
      <Box px='10' py='3'>
        <Heading as='h2' size='lg' mb='4'>{country.name}</Heading>
        <Flex justifyContent='space-between' flexDirection={['column', 'column', 'row']}>
          <Box>
            <Text mb='2.5'><strong>Native Name: </strong> {country.nativeName}</Text> 
            <Text mb='2.5'><strong>Population: </strong>{numberWithCommas(country.population)}</Text>
            <Text mb='2.5'><strong>Region: </strong>{country.region}</Text> 
            <Text mb='2.5'><strong>Sub Region: </strong>{country.subregion}</Text>
            <Text mb='2.5'><strong>Capital: </strong>{country.capital}</Text>
          </Box>
          <Box ml='8'>
            <Text mb='2.5'><strong>Top Level Domain: </strong>{country.topLevelDomain}</Text>
            <Text mb='2.5'><strong>Currencies: </strong>{country.currencies.map((c:Currency) => c.name).join(', ')}</Text>
            <Text mb='2.5'><strong>Languages: </strong>{country.languages.map((l:Language) => l.name).join(', ')}</Text>
          </Box>
        </Flex>
        {neighbours.length > 0 && 'Neighbours: '}
        {neighbours.length > 0 && <> {neighbours.map((c:Country) => <Link key={c.name} to={`/countries/${encodeURIComponent(c.name)}`}><Button mr='2' mb='1'>{c.name}</Button></Link>)}</>}
      </Box>
    </Flex>
  )
}
