# Bart Notifier Service


An API to query up-to-date arrival times and schedule arrival notifications


<pre>

Usage: /Users/Greg/.pyenv/versions/2.7.10/envs/carbonio-dev-env/bin/node bns gen-static-docs [options]

Options:
   -v VERBOSITY, --verbosity VERBOSITY   verbosity level (trace | debug | info | warn | error | fatal)
   --flavor FLAVOR                       choose your flavor (github-flavored-markdown | api-blueprint | aglio)  [github-flavored-markdown]
   --out PATH                            path to write static docs to (directory for multiple pages (default: api-docs) and file for single page (default: README.md))
   -o OPTION, --option OPTION            set generator specific options (format is: option[:value](,option[:value])*, can be specified multiple times)
   --show-options                        show generatore specific options

generate docs for the api
</pre>


## Endpoints

* [/stations](/api-docs/stations.md) 
* [/stations/:_id](/api-docs/stations/:_id.md) 
* [/stations/:_id/destinations](/api-docs/stations/:_id/destinations.md) 
* [/stations/:_id/arrivals](/api-docs/stations/:_id/arrivals.md) 
* [/notifications](/api-docs/notifications.md) 
* [/notifications/:id](/api-docs/notifications/:id.md) 


