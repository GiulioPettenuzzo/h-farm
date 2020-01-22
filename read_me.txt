
BUILD INSTRUCTION

Una volta copiata l'intera cartella nella directory del proprio localhost, per testare l'applicazione è sufficiente lanciare news_list.html, quindi:

	http://localhost/h-farm/client/news_list.html

NB: perché tutto funzioni bisogna abilitare Google CORS: Access-Control-Allow-origin, consiglio di utilizzare google chrome come browser. è sufficiente scaricare CORS dal link di sotto e abilitarlo

	https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en

PS: ci dovrebbe essere una cosa analoga a CORS anche per Safari, non ho avuto tempo di approfondire. Usate google chrome come browser perchè su chrome sono sicuro che funziona, tutto quello che dovete fare è copiare il progetto nella directory del localhost, abilitare CORS e lanciare news_list.html. 

L'applicazione in realtà funziona anche senza CORS usando le news api, CORS è necessario solo per usare le mie di api.


PROJECT STRUCTURE

├─ client/
├────── news_list.html -> html of the news_list page
├────── news_list.css -> css of the news_list page
├────── news_list.js -> javascript of the news_list page
├────── news_detail.html -> html of the news_detail page
├────── news_detail.css -> css of the news_detail page
├────── news_detail.js -> javascript of the news_detail page


├─ api/
├─── config/
├───────── database.php - file used for connecting to the database
├─── objects/
├───────── news.php - contains properties and methods for "news" database queries.
├─── news/
├───────── read.php - file that will output JSON data based from "news" database 


La parte client consiste in due pagine: news_list (dove c'è la lista di tutte le news) e news_description(dove ci sono le info aggiuntive di ogni news). Per ogni pagina ci sono tre file: uno per l'html, uno per il css e uno per il js. 
Il codice è commentato e dovrebbe essere abbastanza comprensibile.

La parte server è scritta in PHP, premesso che PHP non è il mio linguaggio preferito (sono molto più bravo in java) il motivo per cui ho scelto il PHP è che non necessita di nessuna configurazione (appare quella di abilitare CORS). L'applicazione è quindi molto facile da configurare e testare.

Ho caricato la cartella api e il database in un server di mia proprietà, bettypower.it, le API che vanno a sostituire quelle di news api sono raggiungibili con una chiamata rest all'url: http://bettypower.it/fake_news_api/api/news/read.php
Ad ogni modo non vi serve saperlo, la parte client è collegata ad entrambe le api, per passare dall'una all'altra è sufficiente premere un bottone in news_list.html, 
Nel sito, ho chiamato le notizie scritte da me "Fake News" e quelle da news api con "News API". 

Per il momento ho caricato solo 3 Fake News sul mio database, se volete ne inserisco delle altre ma sono solo a scopo illustrativo.


KNOWN BUGS

Niente di irrisolvibile, solo alcune cose che non ho avuto tempo di sistemare:

1) La parte di ordinamento delle notizie non funziona, penso sia un problema di news api, quando l'utente sceglie un metodo di ordinamento, lo vado ad inserire nell'url della rest call come spiegato dalle api, il server di news api mi risponde correttamente solo che le notizie non sono ordinate.

Ho letto che non sempre funziona ma non ho avuto molto tempo per approfondire la cosa. Quello che si potrebbe fare è implementare l'ordinamento nella parte client dell'applicazione, è facile ma ci si perde qualche ora... ho deciso di lasciare stare.

2) La paginazione non è implementata, l'ho inserita graficamente ma non ho trovato il tempo di finirla, anche qui è questione di qualche ora, ho deciso di lasciare stare per concentrarmi sulle Fake News
	
3) Con un pò più di tempo avrei implementato qualche altra REST call, per ora è implementata solo la lettura di tutte le righe della tabella.




