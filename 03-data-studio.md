![Diagram](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/Data%20analysis%20with%20BQ%20-%20diagram%20(part_1).png?raw=true)

## Agenda
* Cloud Data Studio overview
* Application Workflow
    * Data Source Selection
    * Visual Design
* Exercises
## Data Studio

### Concept & Purpose
*Cloud Data Studio* is tool to easily visualize data from one or more sources.
It allows you to create various kinds of fully interactive reports, with few simple steps.

*Cloud Data Studio* is basically visual editor for reports.

### Workflow

### Datasource Selection
*Cloud Data Studio* supports whole palette of sources from where you will obtain your data.
You can use either locally-stored files (ex. CSV) and files stored on *Google Cloud Storage (GCS)*.

![Data Source Selection](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/datastudio_data-sources.png)

### Visual Design
After your data is imported, you are able to design your report.
You can also add another data sources in `File > Report Settings`.

![Multiple Data Sources](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/datastudio_mutliple-datasources.png)

Layout of application ressembles that of *GSuite* apps.

![Report Design](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/datastudio_report-design.png)

As well as in these other application, also there you can choose from variety of components to put on the layout.

![Inserting Components](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/datastudio_components.png)

Components can be arranged on the grid in any order. Also, each component has set of its unique properties, accessible from the *Properties* panel on the right.

![Component Properties](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/datastudio_properties.png)

### Templates 

*Cloud Data Studio* also features embedded template engine.
Thanks to that mechanism aside from creating whole layout manually, all you have to do is to select template that suits your needs, swap data sources and you are good to go!
Template selection is available
  
![Templates Selection](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/datastudio_templates.png)  


## Exercises

Add views created in previous section and 'trades' table to Data Studio datasources.

**Chart 1**
	
1. Using `transaction_by_year_region` view, add a series chart to the page and set following data settings:
    * Dimention: year
    * Data: SUM(value_mld_PLN) --> Trade Value (mld PLN)
            SUM(number_of_transactions) --> Num of transations
2. For one of the series, set right-hand axis
3. Add trend lines (linear) to both series
4. Pick "Show axis name" for both axis
5. Add text field and provide a title for the chart.
	
**Chart 2**
1. Add new page to the report.
2. Using `transaction_by_year_region` view, add a bar chart to the page and set following data settings:
    * Dimention: client
    * Data: SUM(value_mld_PLN) --> Trade Value (mld PLN)
            SUM(number_of_transactions) --> Num of transations
3. For one of the series, set right-hand axis
4. Pick "Show axis name" for both axis
5. Add a control filter object to the chart and set following data settings:
    * Dimention: year --> Pick a year
    * Data: year
6. Add text field and provide a title for the chart.

**Chart 3**
1. Add new page to the report.
2. Using `transaction_by_year_client` view, add a pie chart to the page and set following data settings:
    * Dimention: region
    * Data: SUM(number_of_transactions) --> Num of transations
    * Sour by: number_of_transactions
3. Add a control filter object to the chart and set following data settings:
    * Dimention: year --> Pick a year
    * Data: year
4. Add text field and provide a title for the chart.	 

## Navigation

- [Previous Step](./02-bigquery.md)
- [Next Step](./04-dataprep.md)

