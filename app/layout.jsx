import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';


export const metadata = {
  title: "rewars",
  description: "użyj ponownie!"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <head>
      <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      </head>
      <body>
        <Provider>
        <div className="main">
          <div className="gradient">
          </div>
        </div>


        <main className="app">
          <Nav />
          {children}

        </main>
        </Provider>
      </body>
    </html>
    
  )
}

export default RootLayout