![Diagram](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/Data%20analysis%20with%20BQ%20-%20diagram%20(part_1).png?raw=true)

## Agenda
- BigQuery - what is it?
  - access methods
  - import/export options
  - features
  - pricing 
  - exercises
  
## BigQuery

**Google BigQuery** is a highly scalable and fast data warehouse for enterprises that assist the data analysts in Big data analytics at all scales. Furthermore, Google BigQuery is a low-cost warehouse that allows data analysts to become more productive. There is no infrastructure that needs to be managed, and you can always focus on meaningful insights derived from data analysis.

BigQuery is built on top of Dremel technology which has been in production internally in Google since 2006. Dremel is Google’s interactive ad-hoc query system for analysis of read-only nested data.

![BQArchitecture](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/bigquery-architecture.png?raw=true)

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

### Methods of loading data into BigQuery
* DDL + DML statements (CREATE TABLE + INSERT INTO)
* Query result saved as table
* Load from a local file: 
	- CSV (data only + schema autodect)
	- JSON (data, data + schema)
	- Avro (data + schema)
	- Parquet (data + schema)
	- ORC (data + schema)
* From GCP external sources: 
	- Cloud Storage
	- Google Drive
	- Google BigTable
***Wildcards supported***  

BigQuery can query external data sources directly without any data movement:  
* Google Cloud Bigtable 
* Google Cloud Storage
* Google Drive  

***Use cases:***  
- Loading and cleaning data in one pass by querying the data from an external data source and writing the cleaned result into BigQuery storage.
- Having a small amount of frequently changing data that you join with other tables. The frequently changing external data does not need to be reloaded every time it is updated.

### Exporting data from BigQuery 
The only supported export location is Google Cloud Storage.
Possible file formats:
	- CSV (compression option)
	- JSON (compression option)
	- Avro  
  
Wildcards are supported – 3 export options available:  
Single URI --> most common for file size less than 1GB  
	`gs://[YOUR_BUCKET]/file-name.json`  
Single wildcard URI --> for file larger than 1GB  
	`gs://[YOUR_BUCKET]/file-name-*.json`  
	`gs://[YOUR_BUCKET]/path-component-*/file-name.json` (not supported in UI)  
Multiple wildcard URIs --> for parallel processing (services like Hadoop on Google Cloud Platform)  
	`'gs://my-bucket/file-name-1-*.json','gs://my-bucket/file-name-2-*.json','gs://my-bucket/file-name-3-*.json’`  

Refer the link for import/export limitations:  
	https://console.cloud.google.com/bigquery

### BigQuery supports partitioning feature.
![Partitioning](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/Partitioning.png?raw=true)  
  
Idea is the same comparing to relational databases. Dividing a large table into smaller pieces (partitions) improve query performance, and reduce the number of bytes read by a query.
  
Two types of table partitioning in BigQuery:
* tables partitioned by ingestion (load) time (_PARTITIONTIME pseudo column is automatically added to the table for filtering purpose)
* partitioned tables: tables partitioned on a TIMESTAMP or DATE column
  
### Sharding tables approach
![Sharding tables](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/gsod_shared_tables.png?raw=true)
  
Sharding tables in BigQuery means placing the data into multiple tables with the same schema and name but different name suffix. BigQuery must maintain a copy of the schema and metadata for each date-named table. Also, when date-named tables are used, BigQuery might be required to verify permissions for each queried table. This practice also adds to query overhead and impacts query performance. 
  
- Wildcards are supported, thus table naming convention is important in order to effectively filter the tables.
- Combination of both approaches, partitioning and shared tables, for the same table set is also possible.
- Pseudo column _TABLE_SUFFIX contains the values matched by the table wildcard. It can be used for filtering. 
  
### BigQuery pricing
BigQuery charges for data storage, streaming inserts, and for querying data, but loading and exporting data are free of charge.

![PricingStorage](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/pricing%20-%20storage.png?raw=true)

For querying data two different pricing options are possible:

![PricingQuery](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/pricing%20-%20query.png?raw=true)

Pricing guide: https://cloud.google.com/bigquery/pricing


## BigQuery - exercises
BigQuery API is automatically enabled in new projects - check it in APIs & Services Tab. 

* Open BigQuery UI and pick a project created.  
	https://bigquery.cloud.google.com/
    
* In a BigQuery UI, create a `gft_academy_trades_analysis` dataset.
### Create `trades` table in Bigquery - import data from file.

>**Create table with following BigQuery options:**  
> ![tradesTableCreate](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/trades_table.PNG?raw=true)  

Review data in `trades` table:  
```sql
SELECT year, count(*) number_of_transactions
FROM gft_academy_trades_analysis.trades
GROUP BY year
ORDER BY year DESC
```

### Attach CSV files as table named `rates`.

>**Create table with following BigQuery options:**  
> ![ratesTableCreate](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/rates_table.PNG?raw=true)  

Review data in `rates` table:  
```sql
SELECT publication_date, currency_Code, multiplier, avg_rate
FROM gft_academy_trades_analysis.rates
ORDER BY publication_date desc, currency_code
LIMIT 100
```

### Create floowing views - replace {GOOGLE_CLOUD_PROJECT} with your project-id.
The views will be used later in order to create a charts in Data Studio.  

```sql
CREATE VIEW `{GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.transaction_by_year_client` AS
SELECT b.year, b.client, b.number_of_transactions, b.value_mld_PLN FROM(
	SELECT a.year, a.client, a.number_of_transactions, a.value_mld_PLN,
	ROW_NUMBER() OVER(PARTITION BY a.year ORDER BY a.value_mld_PLN DESC) tran_rank FROM(
		SELECT t.year, t.client, COUNT(*) number_of_transactions,
		ROUND(SUM(t.value * r.multiplier * r.avg_rate)/1000000000, 2) value_mld_PLN
		FROM `{GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.trades` AS t
		JOIN `{GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.rates` AS r
		ON (t.tradeDate = CAST(r.publication_date AS TIMESTAMP)
	) WHERE t.region IS NOT NULL and t.status IS NOT NULL
	GROUP BY t.year, t.client) AS a
) AS b WHERE b.tran_rank <= 10
```
  
```sql
CREATE VIEW `{GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.transaction_by_year_region` AS
SELECT t.year, t.region, count(*) number_of_transactions, 
	ROUND(SUM(t.value * r.multiplier * r.avg_rate)/1000000000, 2) value_mld_PLN
	FROM `{GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.trades` as t
	JOIN `{GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.rates` as r
	ON (t.tradeDate = CAST(r.publication_date AS TIMESTAMP))
	WHERE t.region IS NOT NULL and t.status IS NOT NULL
	GROUP BY t.year, t.region
```


## Navigation

- [Previous Step](./01-storage.md)
- [Next Step](./03-data-studio.md)
