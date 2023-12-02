import '@styles/globals.css';


import Nav from '@components/Nav';
import Provider from '@components/Provider';
import 'bootstrap/dist/css/bootstrap.css'

export const metadata = {
  title: "re/wars.ai",
  description: "nie wyrzucaj! użyj ponownie!"
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
          <div class="align-self-end">
                                      
                                      <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        ?
                                      </button>
        </div>        
          {children}

        </main>
        </Provider>
        
                                      
                                      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                          <div class="modal-content">
                                            <div class="modal-header">
                                              <h5 class="modal-title" id="exampleModalLabel">czym jest re/wars.ai?</h5>
                                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                              Aby skorzystać z aplikacji należy w pasku wyszukiwania wpisać nazwę odpadu z którym nie wiadomo co zrobić. Strona automatycznie zacznie wyszukiwać możliwe produkty poprzez API. Aby skorzystać z pomocy bota należy kliknąć ikonę po prawej.

                                            </div>

                                            <div class="modal-body">
                                              re/wars.ai to projekt stworzony na hackathon <a href="https://dataforcity.pl/" data-bs-toggle="tooltip" title="dataforcity.pl">Data for City</a>


                                            </div>
                                            <div class="modal-body">
                                              Strona wykorzystuje dane dostępne z API <a href="https://api.um.warszawa.pl/" data-bs-toggle="tooltip" title="api.um.warszawa.pl">Otwarte dane - czyli dane po warszawsku</a> umozliwiając użytkownikowi przyporządkowanie podanego odpadu do konkretnej kategorii z API.

                                            </div>
                                            <div class="modal-body">
                                              Strona wykorzystuje także API ChatGPT do zasugerowania możliwych ponownych zastosowań dla podanych odpadów.

                                            </div>
                                            <div class="modal-body">
                                              Kontakt: mailingbot[at]gmail.com

                                            </div>
                                            <div class="modal-footer">
                                              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                                              
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                          
      </body>
    </html>
    
  )
}

export default RootLayout