![Diagram](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/Data%20analysis%20with%20BQ%20-%20diagram%20(part_2).png?raw=true)

## Agenda
- Dataprep Workflow
- Transformation recipe - brew your perfect data source
- Working with recipies - discovering functionalities of Dataprep
- Exercises

## Cloud Dataprep

### Concept & Purpose
*Cloud Dataprep* is tool developed and managed by **Trifacta**, which allows you to import data from external source (CSV, JSON etc.), cleanse, transform and enrich them according to your project's needs.
For example, it can be used to transform traffic data of your application into proper spreadsheet/table, perform deep analysis on them and prepare them to be stored in database engine.


### Dataprep Workflow
![Application Workflow](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_appflow.png)

Above image illustrates the most common workflow of *Cloud Dataprep* usage - dataprep job.
It can be also described as following steps:

1. **Import** - import from flat file or databases or distributed storage systems
2. **Cleanse** - locate and remove or modify missing or mismatched data
3. **Structure** - unnest complex data structures (ex. JSONs), merge datasets with joins
4. **Enrich** - identify statistical outliers in your data for review and management, aggregate columnar data using a variety of aggregation functions
5. **Validate and run** - validate the data and run the job

### Import/Export - In and Out
*Cloud Dataprep* is capable of importing data from number of sources, as well as exporting the results to few of the formats.

#### From where it can Import?

Your dataset can be imported from local storage, GCS or BigQuery in one of following formats:
* Excel Spreadsheets (XLS, XLSX)
* CSV
* JSON (also nested ones!)
* TSV
* Avro
* LOG
* Plain Text

#### To where it can Export? 
* Google Cloud Storage (GCS)
* BigQuery

### Samples - Our Working Material

To prevent overwhelming the client or significantly impacting performance, *Cloud Dataprep* generates one or more samples of the data for display and manipulation in the client application. Of course, you can change the size of samples, the scope of the sample, and the method by which the sample is created.

*Cloud Dataprep* support serveral types of samples:
* **First rows samples** - taken from the first set of rows in the transformed dataset based on the current cursor location in the recipe
* **Random samples** - random selection of a subset of rows in the dataset
* **Filter-based samples** - samples generated for the set of values taht matches provided filter criteria
* **Anomaly-based samples** - consists of mismatched or missing data or both in one or more columns
* **Stratified samples** - constructed from all unique values within a column and create a sample that contains the unique values, up to the sample size limit. The distribution of the column values in the sample reflects the distribution of the column values in the dataset. Sampled values are sorted by frequency, relative to the specified column.
It can be also filtered
* **Cluster-based samples** -  built from collection of contiguous rows in the dataset that corresponds to a random selection from the unique values in a column. All rows corresponding to the selected unique values appear in the sample, up to the maximum sample size. This sampling is useful for time-series analysis and advanced aggregations.
It can be also filtered.

### Transformation recipe - brew your perfect data source

In *Cloud Dataprep* all operations which you will be doing on raw input data are recorded as kind of recipe (literally). 
You can think of transforming raw data info table as of brewing your homemade beer.

Typically, *Recipe* looks more or less lke this:

![Recipe Example](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_recipe.png)


### Working with recipies - discovering functionalities of Dataprep

*Recipe* is basically list of instructions which will be performed on raw data one by one.
Each step can be moved, modified or deleted at any point of your work process.

Worth noting is also the fact that recipes can be **reused** and **chained** together.

![Main View](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_main-view.png)

#### Cleansing the data

After importing the data, you are provided with data histogram for all the columns.
Color codes helps you to define wether data in particular column is incomplete or invalid:

![Column Histograms](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_column-histograms.png)

* **GREEN** - valid rows
* **BLACK** - rows with missing values
* **RED** - invalid rows (mostly due to mismatching data type)

By clicking on colored part of histogram, you are able to select all rows of specific category and perfom some transformations on them (ex. fill mising fields with 'N/A'):

![Empty Rows Selcted](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_empty-rows-selected.png)  ![Histogram Fractions](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_histogram-fractions.png)

![Replacing Mising Values](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_replacing-missing-values.png)

#### Enriching the data

Using *Cloud Dataprep* we are also able to enrich our data in a simmilar manner to standard spreadsheet.
*Dataprep* gives us whole set of function to use (ex. SUM, AVERAGE, MAX etc.). We can also write our own formulas:

![Aggregating Column Example](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_aggregating-column-example.png)

#### Validate & Run

When your recipe is complete, the last thing you need to do is just click *Run Job* button.

![Run Job Button](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_run-job-button.png)

Remember that *Cloud Dataprep* also allows you to **schedule** your jobs!

After processing job is done and you have checked *Profile Results* checkbox, you will be provided with *Data Profile View* which consists of numerous statistics that are describing your final dataset.

![Data Profile](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_data-profile.png)

### Exercises

As Dataprep creates a Dataflow pipeline underneath in order to process data, enable Dafalow API.  
  
`gcloud services enable dataflow.googleapis.com`  
  
1. Create flow **LoadTradesIntoBQ** using file below and import data into the dataset on [training platform](https://clouddataprep.com/). Replace `${GCP_INPUT_BUCKET}` with your input bucket name.
 ```
 gs://${GCP_INPUT_BUCKET}/trades/trades_2016.csv
 ```
 
2. Review data using Dataprep's histograms.
3. Create a recipe and put following filters in order to clean data:
    * region IS NOT NULL
    * status IS NOT NULL
4. Convert securityId, year columns to integer
5. Set output options (replace `{GOOGLE_CLOUD_PROJECT}` with your project_id): 
```
(BigQuery: {GOOGLE_CLOUD_PROJECT}.gft_academy_trades_analysis.trades)
```
6. For the demo purpose, remember to uncheck profile details capturing option before runing a job. 
7. Run a job. 
8. Review job status tab in Dataprep tool.
9. Make sure data is loaded into BigQuery. 

### Documentation & Resources

* [Dataprep's Documentation](https://cloud.google.com/dataprep/docs/)
* [Guide To Dataprep's Tasks](https://cloud.google.com/dataprep/docs/how-to)
* [Overview of Sampling](https://cloud.google.com/dataprep/docs/html/Overview-of-Sampling_90112099)


## Navigation

- [Previous Step](./03-data-studio.md)
- [Next Step](./05-dataflow.md)

