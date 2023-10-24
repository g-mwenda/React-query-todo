import { extendTheme } from '@chakra-ui/react'
import '@fontsource/raleway/latin-800.css'
import '@fontsource/open-sans/greek-800.css'
import '@fontsource/lato/latin-900.css'


const theme = extendTheme({
    fonts: {
        heading: `'Lato', sans-serif`,
        body: `'Lato', sans-serif`,
      },
  })
  
  export default theme;