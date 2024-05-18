import * as React from 'react'
import { Text, Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const Base: React.FC = () => {
    return (
        <>
            <Box w='100%' height="50px" backgroundColor='aquamarine' display='flex'>
                <Text alignSelf='start' color="black">Header</Text>
            </Box>
            <Box w='100%' height='100vh' backgroundColor='whitesmoke'>
            <Outlet />
            
        </Box>
        </>
    )
}

export default Base