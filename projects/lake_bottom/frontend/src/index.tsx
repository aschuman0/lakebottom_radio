import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

const appDiv = document.getElementById('app')
if (!appDiv) {
    throw new Error('app div not found.')
}

const root = createRoot(appDiv)
root.render(
    <ChakraProvider>
       <RouterProvider router={router} />
    </ChakraProvider>
)
