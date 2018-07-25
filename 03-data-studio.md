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
4. Select **[MY PROJECTS] - [{GOOGLE_CLOUD_PROJECT}] - [gft_academy_trades_analysis] - [transactions_by_client]** and then click **CONNECT** button to add _trades_ table to the dashboard. Review schema definition and click **ADD TO REPORT**
5. From **Resources** menu select  **Manage added data sources** and then click **ADD A DATA SOURCE**. Repeat actions described in step 4 to add _rates_ table.

### Chart 1 - Cumulated number of transaction and trades value per year

1. Select **Bar chart** from **Insert** menu. Position the crosshairs on the upper half of the page where you want the chart to start, then draw the chart. In the **DATA** properties pane on the right, click on the field for each setting and change to the following:
	* Data Source: _transactions_by_client_
	* Date Range Dimension: _tradeDate_
	* Dimension: _year_
	* Metric:
       * _SUM(value_PLN)_
       * _SUM(number_of_transactions)_
	* Sort: _SUM(value_PLN)_ and _Descending_
2. Click **SUM** button near both metric names to add column aliases (**name** field):
 	* _SUM(value_mld_PLN)_ --> Trade Value (PLN)
	* _SUM(number_of_transactions)_ --> Number of transactions
3. Switch to **STYLE** pane. Turn on **Show axes** and **Double** in **Axes** section
4. Pick **Show axis name** for both Y-Axes
5. Select **Text** from **Insert** menu and draw a rectangle across the top of the page. Provide following title for the chart: _Cumulated trades value and number of transactions - Top 10 clients_. In **Text Properties** pane change font size to _30px_ and use centered alignment. You can also change background color.

### Chart 2 - FX Rate chart
	
1. Select **Time series** from **Insert** menu. Position the crosshairs on the bottom half of the page where you want the chart to start, then draw the chart. In the **DATA** properties pane on the right, click on the field for each setting and change to the following:
	* Data Source: _rates_
	* Date Range Dimension: _publication_date_	
	* Time Dimension: _publication_date_
	* Breakdown Dimension: _currency_code_
	* Metric: _AVG(avg_rate)_
2. Click **AVG** button near _AVG(avg_rate)_ metric name to add column alias (**name** field): price (PLN)
3. Switch to **STYLE** pane. Increase **Number of series** to _20_.
4. Set **Missing Data** to _Linear Interpolation_ in order to display missing weekend dates correctly.
5. In **Left Y_Axis** section enable **Show axis title** and change **Custom Tick Interval** to 2

### Date range filter
1. Select **Date range** from **Insert** menu. Position the crosshairs somwhere between both charts , then draw the rectangle. In the **STYLE** properties pane on the right, change background and font color.

### Currency filter
1. Select **Filter control** from **Insert** menu. Position the crosshairs somwhere between both charts , then draw the rectangle. In the **DATA** properties pane on the right, click on the field for each setting and change to the following:
	* Data Source: _transactions_by_client_
	* Dimension: _currency_code_
	* Metric: _SUM(value_PLN)_
	* Order: _Dimension_ and _Ascending_
2. Click **ABC** button near _currency_code_ dimension name to add column alias (**name** field): _Pick a currency_.
3. Click **SUM** button near _AVG(avg_rate)_ metric name. Add column alias (**name** field): _Percent of transactions_. Change **Display as** filed to _Percent of total_
4. Switch to **STYLE** properties pane on the right, change background and font color.

![Chart2](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/DataStudio_chart2.png?raw=true)

## Navigation

- [Previous Step](./02-bigquery.md)
- [Next Step](./04-dataprep.md)

