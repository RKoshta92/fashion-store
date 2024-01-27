import NavBar from '@/components/NavBar'
import './globals.css'
import { ContextProvider } from '@/context/AppContext' 

export const metadata = {
  title: 'Fashion Store',
  description: 'Fashion Store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
            rel="stylesheet"
          />
      </head>
      <body>
        <ContextProvider>
            <NavBar />
            {children}
        </ContextProvider>
      </body>
    </html>
  )
}
