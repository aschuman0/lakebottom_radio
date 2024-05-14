import { createRoot } from 'react-dom/client'
import Main from './Main'

const appDiv = document.getElementById('app')
if (!appDiv) {
    throw new Error('app div not found.')
}

const root = createRoot(appDiv)
root.render(<Main />)