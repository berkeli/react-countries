import { Box, Button, Flex, Heading, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
        <Box as='nav' px='16' bg={useColorModeValue('gray.100', 'gray.900')} boxShadow='md'> 
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Heading as='h1' size='md'> Where in the world? </Heading>
                <Button onClick={toggleColorMode}>
                    {colorMode !== 'light' ? <><SunIcon mr='2'/>Light Mode</> :  <> <MoonIcon mr='2'/>Dark Mode</>}
                </Button>
            </Flex>
        </Box>
  )
}
