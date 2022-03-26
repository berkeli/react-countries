import { Box, Button, Flex, Heading, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
        <Box px='8' bg={useColorModeValue('gray.100', 'gray.900')} boxShadow='md'> 
            <Flex as='nav' h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Heading as='h1' size='md'> Where in the world? </Heading>
                <Button onClick={toggleColorMode}>
                    {colorMode !== 'light' ? <><MoonIcon /> <Text pl='2'>Light Mode</Text></> :  <> <SunIcon /><Text pl='2'>Dark Mode</Text></>}
                </Button>
            </Flex>
        </Box>
  )
}
