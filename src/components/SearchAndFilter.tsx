import { Flex, Input, InputGroup, Select } from '@chakra-ui/react'
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
            <InputGroup w='auto'>
                <Input placeholder="Search for a country..." value={searchQuery} onChange={setSearchQueryHandler}/>        
            </InputGroup>
            <Select name='region' onChange={setRegionHandler} w='auto' defaultValue={region}>
                <option value='all'>Filter by Region</option>
                {REGIONS.map((rName: string) => <option key={rName} value={rName}>{rName}</option>)}
            </Select>
        </Flex>
  )
}
