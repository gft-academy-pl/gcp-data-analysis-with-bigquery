![Diagram](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/Data%20analysis%20with%20BQ%20-%20diagram%20(part_1).png?raw=true)

## Agenda
- BigQuery - what is it?
  - access methods
  - import/export options
  - features
  - pricing 
  - exercises
  
## BigQuery

**Google BigQuery** is a data warehouse optimized for real-time analytics - optimized for queries that read data from denormalized tables, aggregate and filter data. It's highly scalable solution which allocates storage and query resources dynamically based on usage patterns. There is no infrastructure that needs to be managed (serverless), and you can always focus on meaningful insights derived from data analysis.

BigQuery uses **columnar** storage on Colossus Google file system. Each column is stored separately, queries skip reading unnecessary columns. Data are compressed and optimized for aggregations. There are no indexes, only **table scans** are possible (Google is currently working on so-called clustered tables where the table data is automatically organized based on the contents of one or more columns in the table's schema).

Data are divided into smaller units (shards) and **geo-replicated**. Having data in multiple data centers enables High Availability and also helps query load balancing. Each table shard can be processed in parallel using potentially thousands of machines - each one reading individual shards. Background processes constantly look at all the stored data and check if it can be optimized even further. 

![BQArchitecture](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/column%20-%20regions.png?raw=true)

BigQuery is built on top of Dremel - a vast computer cluster. It turns user's SQL query into an **execution tree** and dynamically assigns nodes on an as needed basis (up to 2000 nodes in standard pricing model). Only root server receives query from client and returns result. To parallelize the query, each serving level **translates the query** into a form which can be handled by next level
The leaf nodes (’slots’) read the data from Colossus and are doing any computation necessary. The branches of the tree are ‘mixers’, which perform the aggregation.  In between is ‘shuffle’, which moves data from one node to another.

![BQArchitecture](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dremel.png?raw=true)

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
* BigQuery API is automatically enabled in new projects - check it in [APIs & Services Tab](https://console.cloud.google.com/apis/library/bigquery-json.googleapis.com).  

* Open BigQuery UI and pick a project created.  
	https://console.cloud.google.com/bigquery
    
* In a BigQuery UI click on the project name (you can find it on the left hand side under _Resources_ box), then create a `gft_academy_trades_analysis` dataset using _Create Data Set_ option displayed under the _Query editor_ box. Leave the default values for location and table expiry.
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

### Save analytical query as BigQuery view
 
Create view which Data Studio will use as a data source. Please remember to replace {GOOGLE_CLOUD_PROJECT} with your project-id
  
View returns client's turnover converted to local currency
```sql
CREATE VIEW `{GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.transactions_by_client` AS
SELECT 
	t.tradeDate
	,count(*) number_of_transactions
	,SUM(t.value * r.multiplier * r.avg_rate) value_PLN
	,r.currency_code
	,t.client
FROM `{GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.trades` AS t
INNER JOIN `{GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.rates` AS r ON (t.tradeDate = CAST(r.publication_date AS TIMESTAMP))
	AND t.currency = r.currency_code
INNER JOIN (
	SELECT 
		t.client
		,ROW_NUMBER() OVER (ORDER BY SUM(t.value * r.multiplier * r.avg_rate) DESC) transaction_rank
	FROM `{GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.trades` AS t
	JOIN `{GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.rates` AS r ON t.tradeDate = CAST(r.publication_date AS TIMESTAMP)
		AND t.currency = r.currency_code
	WHERE t.region IS NOT NULL
		AND t.STATUS IS NOT NULL
	GROUP BY t.client
	) top_ten ON top_ten.client = t.client
WHERE top_ten.transaction_rank <= 10
	AND t.region IS NOT NULL
	AND t.STATUS IS NOT NULL
GROUP BY t.tradeDate
	,t.region
	,r.currency_code
	,t.client
```

### Emergency script creating all above BigQuery objects
Run below script in Google Cloud Shell in case you don't want to use BigQuery UI
```bash
#create dataset
bq mk gft_academy_trades_analysis
bq ls

#create trades table
bq load --autodetect --skip_leading_rows 1 --source_format=CSV gft_academy_trades_analysis.trades gs://${GCP_INPUT_BUCKET}/trades/trades_arch.csv

#Review data in trades table
bq query "SELECT year, count(*) number_of_transactions
FROM gft_academy_trades_analysis.trades
GROUP BY year
ORDER BY year DESC"

#create rates external table
bq mkdef --autodetect --source_format=CSV gs://${GCP_INPUT_BUCKET}/rates/rates_*.csv > /tmp/rates.json
bq mk --table --external_table_definition=/tmp/rates.json gft_academy_trades_analysis.rates

#Review data in rates table
bq query "SELECT publication_date, currency_Code, multiplier, avg_rate
FROM gft_academy_trades_analysis.rates
ORDER BY publication_date desc, currency_code
LIMIT 100"

#create view
bq query --use_legacy_sql=false "CREATE VIEW \`${GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.transactions_by_client\` AS 
SELECT 
t.tradeDate
,count(*) number_of_transactions
,SUM(t.value * r.multiplier * r.avg_rate) value_PLN
,r.currency_code
,t.client
FROM \`${GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.trades\` AS t
INNER JOIN \`${GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.rates\` AS r ON (t.tradeDate = CAST(r.publication_date AS TIMESTAMP))
AND t.currency = r.currency_code
INNER JOIN (
SELECT 
t.client
,ROW_NUMBER() OVER (ORDER BY SUM(t.value * r.multiplier * r.avg_rate) DESC) transaction_rank
FROM \`${GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.trades\` AS t
JOIN \`${GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.rates\` AS r ON t.tradeDate = CAST(r.publication_date AS TIMESTAMP)
AND t.currency = r.currency_code
WHERE t.region IS NOT NULL
AND t.STATUS IS NOT NULL
GROUP BY t.client
) top_ten ON top_ten.client = t.client
WHERE top_ten.transaction_rank <= 10
AND t.region IS NOT NULL
AND t.STATUS IS NOT NULL
GROUP BY t.tradeDate
,t.region
,r.currency_code
,t.client"
```

## Navigation

- [Previous Step](./01-storage.md)
- [Next Step](./03-dataprep.md)
