import { createRoot } from "react-dom/client"
import { ChakraProvider } from "@chakra-ui/react"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Provider } from "react-redux"

import { store } from "./store"

const appDiv = document.getElementById("app")
if (!appDiv) {
  throw new Error("app div not found.")
}

const root = createRoot(appDiv)
root.render(
  <Provider store={store}>
    <ChakraProvider
      toastOptions={{
        defaultOptions: { position: "top", isClosable: true },
      }}
    >
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>,
)
