## Agenda

## Cloud Dataprep
### Dataprep Workflow
![Application Flow](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_appflow.png)

### Concept & Purpose
*Cloud Dataprep* is tool which allows You to import data from external source (CSV, JSON etc.), cleanse, transform and enrich them according to Your project's needs.
For example, it can be used to transform traffic data of Your application into proper spreadsheet/table, perform deep analysis on them and prepare them to be stored in database engine.

### Dataprep Workflow
![Application Flow] (https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_appflow.png)

Above image illustrates the most common workflow of *Cloud Dataprep* usage - dataprep job.
It can be also described as following steps:

1. **Import** - import from flat file or databases or distributed storage systems
2. **Cleanse** - locate and remove or modify missing or mismatched data
3. **Structure** - unnest complex data structures (ex. JSONs), merge datasets with joins
4. **Enrich** - identify statistical outliers in your data for review and management, aggregate columnar data using a variety of aggregation functions
5. **Validate and run** - validate the data and run the job

### Transform recipe - brew Your perfect data source

In *Cloud Dataprep* all operations which You will be doing on raw input data are recorded as kind of recipe (literally). 
You can think of transforming raw data info table as of brewing Your homemade beer.

Typically, *Recipe* looks more or less lke this:

![Recipe Example] (https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/dataprep_recipe.png)


## Navigation

- [Previous Step](./03-data-studio.md)
- [Next Step](./05-cloud-functions.md)

