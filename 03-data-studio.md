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

### Add Report Data Sources

1. Open Data Studio editor: https://datastudio.google.com. You are already on the Reports home page. 
2. Click the blue plus button in the bottom right corner to create a new report. Click Untitled Report title on top of the screen and change title to GFT Academy.
3. Click **CREATE NEW DATA SOURCE** button and select BigQuery connector panel. 
4. Select **[MY PROJECTS] - [{GOOGLE_CLOUD_PROJECT}] - [gft_academy_trades_analysis] - [trades]** and then click **CONNECT** button to add _trades_ table to the dashboard. Review schema definition and click **ADD TO REPORT**
5. From **Resources** menu select  **Manage added data sources** and then click **ADD A DATA SOURCE**. Repeat actions described in step 4 to add two more views: _transaction_by_year_client_ and _transaction_by_year_region_.

### Chart 1 - Cumulated number of transaction and trades value per year
	
1. Select **Time series** from **Insert** menu. Position the crosshairs on the page where you want the chart to start, then draw the chart. In the **DATA** properties pane on the right, click on the field for each setting and change to the following:
	* Data Source: _transaction_by_year_region_
	* Dimension: _year_
	* Metric:
       * _SUM(value_mld_PLN)_
       * _SUM(number_of_transactions)_
2. Click **SUM** button near both metric names to add column aliases (**name** field):
 	* _SUM(value_mld_PLN)_ --> Trade Value (bn PLN)
	* _SUM(number_of_transactions)_ --> Number of transactions
3. Switch to **STYLE** pane. For #2 series set right-hand axis
4. Click the **Trendline** drop-down and select **Linear** in both series
5. Pick **Show axis name** for both Y-Axes
6. Select **Text** from **Insert** menu and draw a rectangle across the top of the page. Provide following title for the chart: _Cumulated number of transaction and trades value per year_. In **Text Properties** pane change font size to _30px_ and use centered alignment.
7. Click **VIEW** button to preview the final result

![Chart1](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/DataStudio_chart1.png?raw=true)
	
### Chart 2 - The 10 most active clients (by number of transactions)
1. Click **EDIT** to return to Report editor. Select **New page** from **Page** menu.
2. Select **Bar chart** from **Insert** menu. Position the crosshairs on the second page where you want the chart to start, then draw the chart. In the **DATA** properties pane on the right, click on the field for each setting and change to the following:
    * Data Source: _transaction_by_year_client_
    * Dimension: _client_
    * Metric:
       * _SUM(value_mld_PLN)_
       * _SUM(number_of_transactions)_
3. Click **SUM** button near both metric names to add column aliases (**name** field):
 	* _SUM(value_mld_PLN)_ --> Trade Value (bn PLN)
	* _SUM(number_of_transactions)_ --> Number of transactions
4. Switch to **STYLE** pane. Turn on **Show axes** and **Double** in **Axes** section
5. Pick **Show axis title** for both Y-Axes
6. Select **Filter control** from **Insert** menu and draw a rectangle below the chart. In the **DATA** properties pane on the right, click on the field for each setting and change to the following:
    * Dimension: _year_
    * Metric: _SUM(number_of_transactions)_
7. Click **calendar** button near _year_ dimension name to add the column alias. Set the value of **name** field to _Pick a year_
8. Click **SUM** button near _SUM(number_of_transactions)_ metric name to add the column alias. Set the value of **name** field to _Transactions percentage_. Click the **Type** drop-down and select **Percent**.
9. Select **Text** from **Insert** menu and draw a rectangle across the top of the page. Provide following title for the chart: _The 10 most active clients (by number of transactions)_. In **Text Properties** pane change font size to _30px_ and use centered alignment.

**Chart 3 - number of transaction for given year - regional structure**
1. Add new page to the report.
2. Using `transaction_by_year_region` view, add a pie chart to the page and set following data settings:
    * Dimension: region
    * Data: SUM(number_of_transactions) --> Num of transations
    * Sort by: number_of_transactions
3. Add a control filter object to the chart and set following data settings:
    * Dimension: year --> Pick a year
    * Data: year
4. Add text field and provide a title for the chart.	 

## Navigation

- [Previous Step](./02-bigquery.md)
- [Next Step](./04-dataprep.md)

