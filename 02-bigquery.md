## BigQuery

**Google BigQuery** is a highly scalable and fast data warehouse for enterprises that assist the data analysts in Big data analytics at all scales. Furthermore, Google BigQuery is a low-cost warehouse that allows data analysts to become more productive. There is no infrastructure that needs to be managed, and you can always focus on meaningful insights derived from data analysis.

BigQuery is built on top of Dremel technology which has been in production internally in Google since 2006. Dremel is Google’s interactive ad-hoc query system for analysis of read-only nested data.

![BQArchitecture](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/bigquery-architecture.png)

BigQuery and Dremel share the same underlying architecture. By incorporating columnar storage and tree architecture of Dremel, BigQuery offers unprecedented performance. But, BigQuery is much more than Dremel. Dremel is just an execution engine for the BigQuery. In fact, BigQuery service leverages Google’s innovative technologies like Borg, Colossus, Capacitor, and Jupiter. As illustrated above, a BigQuery client (typically BigQuery Web UI or bg command-line tool or REST APIs) interact with Dremel engine via a client interface. Borg - Google’s large-scale cluster management system - allocates the compute capacity for the Dremel jobs. Dremel jobs read data from Google’s Colossus file systems using Jupiter network, perform various SQL operations and return results to the client.


### BigQuery - access methods
* Web UI – graphical user interface
* bq – Python-based command line tool
* REST API
* Client Libraries:
  * Java
  * Python
  * C#
  * PHP
  * Node.js
  * Ruby
  * GO

...  
...  
...  
...  
...  
...  
...  
...  

### BigQuery pricing
BigQuery charges for data storage, streaming inserts, and for querying data, but loading and exporting data are free of charge.

![PricingStorage](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/pricing%20-%20storage.png)

For querying data two different pricing options are possible:

![PricingQuery](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/pricing%20-%20query.png)

Pricing guide: https://cloud.google.com/bigquery/pricing


## BigQuery - exercises
BigQuery API is automatically enabled in new projects - check it in APIs & Services Tab. 

* Open BigQuery UI and pick a project created.  
	https://bigquery.cloud.google.com/
    
* In a BigQuery UI, create a `gft_academy_trades_analysis` dataset.
### Create `trades` table in Bigquery - import data from file.

**Create table with following BigQuery options:**  
>* Data:  
>	* Source Data: Create from source  
>	* Location: Google Cloud Storage --> gs://${GCP_INPUT_BUCKET}/trades_arch.csv  
>	* File format: CSV  
>* Table:  
>	* Table name: trades  
>	* Table type: Native table  
>* Schema:  
>	* Pick option: Automatically detect  
>* Options:  
>	* Header rows to skip: 1  
>	* Numbers of errors allowed: 0  
>	* Write preference: Write if empty  
>	* Destination Encryption: Default  

Review data in `trades` table:  
>	`SELECT year, count(*) number_of_transactions`  
>	`FROM gft_academy_trades_analysis.trades`  
>	`GROUP BY year`  
>	`ORDER BY year DESC`  

### Create `rates` table in Bigquery - import data from file.

**Create table with following BigQuery options:**  
>* Data:  
>	* Source Data: Create from source  
>	* Location: Google Cloud Storage --> gs://${GCP_INPUT_BUCKET}/rates_*.csv  
>	* File format: CSV  
>* Table:  
>	* Table name: rates  
>	* Table type: External table  
>* Schema:  
>	* Pick option: Automatically detect  
>* Options:  
>	* Header rows to skip: 1  
>	* Numbers of errors allowed: 0  
>	* Write preference: Write if empty  
>	* Destination Encryption: Default  

Review data in `trades` table:  
>	`SELECT publication_date, currency_Code, multiplier, avg_rate`  
>	`FROM gft_academy_trades_analysis.rates`  
>	`ORDER BY publication_date desc, currency_code`  
>	`LIMIT 100`  

## Navigation

- [Previous Step](./01-storage.md)
- [Next Step](./03-data-studio.md)
