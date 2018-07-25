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

As Dataprep creates a Dataflow pipeline underneath in order to process data, enable Dafalow API using command line: `gcloud services enable dataflow.googleapis.com` or [console/UI](https://console.cloud.google.com/apis/library/dataflow.googleapis.com).  

Launch Dataprep tool: https://console.cloud.google.com/dataprep and agree to share account information with Trifacta and allow access to project data. Click on your Google credentials to sign in. Make sure that you are still in your newly created gft academy project before you agree to create bucket for Dataprep intermediate data.
  
#### Create Flow in Dataprep and import data to dataset
Click **Create Flow** button and name it **LoadTradesIntoBQ**. Click on **Import & Add Datasets** button, then click **GCS** icon on left menu to browse for the data files you uploaded to Google Cloud Storage (Replace _`{GCP_INPUT_BUCKET}`_ with your input bucket name):

   ```
      gs://{GCP_INPUT_BUCKET}/trades/trades_2016.csv
   ```
 Click **+** button near trades_2016.csv file name and **Import & Add to Flow** button to create dataset.
 
 ![BrowseFiles](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_browse-files.png?raw=true)
 
#### Run data editor
Click **Add new Recipe** button ...  

 ![AddNewRecipe](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/AddNewRecipe.png?raw=true)
 
 ... and then **Edit Receipe** in order to run data editor.  
 
 ![EditRecipe](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/EditRecipe.PNG?raw=true)

#### Delete all rows where _region_ values are missing.  
Click black field on the bar below _region_ header -> _Suggestions_ window will appear on the right hand side. Click **Add** button on first suggestion (_Delete rows_) to add new transformation to the recipe.  

 ![HistoBlackField](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/HistoBlackField.png?raw=true)  

 ![RegionDeleteNulls](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/RegionDeleteNulls.png?raw=true)  

Once added, missing rows in _region_ column should disappear from the data sample.

The same can be done manually: 
 * click _Recipe_ icon (placed on the right-top corner of the editor), and then click **Add New Step** button

 ![RecipeNewStep](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/RecipeNewStep.png?raw=true)

 * paste following script into the _Search_ field
 ```
 filter type: custom rowType: single row: ismissing([region]) action: Delete
 ```
 * Click **Add** button

 ![RecipeAddStep](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/RecipeAddStep.png?raw=true)

#### Delete all rows where _status_ values are missing.  
This is very similar step to above one. Perform the same steps on _status_ column.  

If you prefer manual approach, here is a script to be pasted into the _Search_ field in the _Recipe_ window. 
 ```
 filter type: custom rowType: single row: ismissing([status]) action: Delete
 ```
  
#### Convert _securityId_ datatype to Integer.  
Column _securityId_ was detected in Dataprep as a ZIP datatype, while in BigQuery (which is a target location) as an Integer. To load data into BigQuery, datatypes have to be matching, thus convert _securityId_ column to appropriative datatype.  
  
Click on the arrow next to column name (header) and pick `Change type --> Integer` from the menu. 

 ![RecipeNewStep](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/securityIdChangeType.png?raw=true)

Once done, new step should to be added to the recipe.

Script version:
 ```
 settype col: securityId type: 'Integer'
 ```

#### Convert _year_ datatype to Integer. 
Similar problem occurs for _year_ column - Dataprep recognized this column as Date/Time, but in BigQuery the same column is an Integer. Provide one more step to convert _year_ column accordingly - follow above steps.

Script version:
 ```
 settype col: year type: 'Integer'
 ```

#### Run job.  
Click **Run job** button (right-top corner of the editor) and provide following setting:
* uncheck _Profile Results_ checkbox - our goal is to automate execution of the flow, so we don't want to gather profile details

 ![ProfileResults](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/ProfileResults.png?raw=true)

* in _Publishing Actions_ section, change location to BigQuery _trades_ table. Follow below steps: 
   - click on the **Edit** (pencil) icon  
   - choose a BigQuery as an target storage
   - make sure you are in a project, you created
   - pick a dataset _gft_academy_trades_analysis_ and then table _trades_
   - choose _Append to this table every run_ option (right-hand side menu)
   - click an **Update** button  

 ![PublishingAction](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/PublishingActions.png?raw=true)

* Click **Run Job** button (right-bottow corner). _Details_ window should appear on right-hand side. You can track a progress (statuses) in Dataprep.

#### Make sure data is loaded into BigQuery. 
Run following query in BigQuery - it should return 69 148 rows for 2016 year.  

```sql
SELECT year, count(*) number_of_transactions
FROM gft_academy_trades_analysis.trades
WHERE year = 2016
GROUP BY year
ORDER BY year DESC
```

### Documentation & Resources

* [Dataprep's Documentation](https://cloud.google.com/dataprep/docs/)
* [Guide To Dataprep's Tasks](https://cloud.google.com/dataprep/docs/how-to)
* [Overview of Sampling](https://cloud.google.com/dataprep/docs/html/Overview-of-Sampling_90112099)


## Navigation

- [Previous Step](./03-data-studio.md)
- [Next Step](./05-dataflow.md)

