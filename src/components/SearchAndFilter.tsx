import { Search2Icon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement, Select, useColorModeValue } from '@chakra-ui/react'
import { REGIONS } from '../constants';

interface ISearch {
  searchQuery: string;
  region: string;
  setRegion: (value: string) => void;
  setSearchQuery: (query: string) => void;
}

export default function SearchAndFilter({ searchQuery, setSearchQuery, region, setRegion }: ISearch): JSX.Element {
  const setSearchQueryHandler = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setSearchQuery(e.target.value)
  }
  const setRegionHandler = (e:React.ChangeEvent<HTMLSelectElement>):void => {
    setRegion(e.target.value)
  }
  return (
        <Flex my='5' justifyContent='space-between'>
            <InputGroup w='auto' boxShadow='md'>
                <InputLeftElement pointerEvents='none' children={<Search2Icon color={useColorModeValue('gray.300', 'gray.600')} />}/>
                <Input placeholder="Search for a country..." value={searchQuery} onChange={setSearchQueryHandler} />        
            </InputGroup>
            <Select aria-label="region" name='region' onChange={setRegionHandler} w='auto' defaultValue={region} boxShadow='md'>
                <option value='all'>Filter by Region</option>
                {REGIONS.map((rName: string) => <option key={rName} value={rName}>{rName}</option>)}
            </Select>
        </Flex>
  )
}
