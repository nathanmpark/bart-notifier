# Bart Notifier Service


An API to query up-to-date arrival times and schedule arrival notifications


<pre>

Usage: bns &lt;command&gt; [options]

command     
  seed-db             clear and reinitialize the database
  clear-db            clear the database
  start-server        start the api server
  gen-static-docs     generate docs for the api
  test                run the test suite (Service.testSuite)

Options:
   -v VERBOSITY, --verbosity VERBOSITY   verbosity level (trace | debug | info | warn | error | fatal)

Environment variables: 
  BART_NOTIFIER_DB_URI - the database uri
  BART_NOTIFIER_BART_API_KEY - your BART API key
  BART_NOTIFIER_TWILIO_API_KEY - your twilio API key
  BART_NOTIFIER_TWILIO_SID - your twilio SID
  BART_NOTIFIER_TWILIO_NUMBER - your twilio number

</pre>


## Endpoints

* [/stations](/api-docs/stations.md) 
* [/stations/:_id](/api-docs/stations/:_id.md) 
* [/stations/:_id/:id/destinations](/api-docs/stations/:_id/:id/destinations.md) 
* [/stations/:_id/:id/arrivals](/api-docs/stations/:_id/:id/arrivals.md) 
* [/notifications](/api-docs/notifications.md) 
* [/notifications/:id](/api-docs/notifications/:id.md) 


