![Diagram](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/Data%20analysis%20with%20BQ%20-%20diagram%20(part_2).png?raw=true)

## Agenda
- what is dataflow
- what is apache beam

## Dataflow

![Dataflow](https://beam.apache.org/images/logo_google_cloud.png)

Cloud Dataflow is a fully-managed service for transforming and enriching data in stream (real time) and batch (historical) modes with equal reliability and expressiveness. 
And with its serverless approach to resource provisioning and management, you have access to virtually limitless capacity to solve your biggest data processing challenges, while paying only for what you use.

Features:
- **Automated Resource Management** - Cloud Dataflow automates provisioning and management of processing resources to minimize latency and maximize utilization; no more spinning up instances by hand or reserving them.
- **Dynamic Work Rebalancing** - Automated and optimized work partitioning dynamically rebalances lagging work. No need to chase down “hot keys” or pre-process your input data. 

![Rebalancing](https://raw.githubusercontent.com/gft-academy-pl/gcp-anti-fraud-detector/master/assets/rebalancing.png)
- **Reliable & Consistent Exactly-once Processing** - Provides built-in support for fault-tolerant execution that is consistent and correct regardless of data size, cluster size, processing pattern or pipeline complexity.
- **Horizontal Auto-scaling** - Horizontal auto-scaling of worker resources for optimum throughput results in better overall price-to-performance.
- **Unified Programming Model** - Apache Beam SDK offers equally rich MapReduce-like operations, powerful data windowing, and fine-grained correctness control for streaming and batch data alike.
- **Community-driven Innovation** - Developers wishing to extend the Cloud Dataflow programming model can fork and/or contribute to Apache Beam.

## Apache Beam

![Logo](https://beam.apache.org/images/beam_logo_navbar.png)

Basic concepts:
![Basic concepts](https://beam.apache.org/images/design-your-pipeline-linear.png)
- **PCollections** - the PCollection abstraction represents a potentially distributed, multi-element data set, that acts as the pipeline's data. Beam transforms use PCollection objects as inputs and outputs.
- **Transforms** - these are the operations in your pipeline. A transform takes a PCollection (or multiple PCollections) as input, performs an operation that you specify on each element in that collection, and produces a new output PCollection.
- **Pipeline I/O** - Beam provides read and write transforms for a number of common data storage types, as well as allows you to create your own.
- **Windowing** - subdivides a PCollection according to the timestamps of its individual elements. Transforms that aggregate multiple elements, such as GroupByKey and Combine, work implicitly on a per-window basis 
- **Triggers** - when collecting and grouping data into windows, Beam uses triggers to determine when to emit the aggregated results of each window (referred to as a pane). If you use Beam’s default windowing configuration and default trigger, Beam outputs the aggregated result when it estimates all data has arrived, and discards all subsequent data for that window

![Beam flow](https://raw.githubusercontent.com/gft-academy-pl/gcp-anti-fraud-detector/master/assets/beam-flow.png)

Features:
- **Unified** - Use a single programming model for both batch and streaming use cases using Java, Python and other languages.
![Unified](https://beam.apache.org/images/beam_architecture.png)
- **Portable** - Execute pipelines on multiple execution environments like Dataflow, Spark, Flink, Apex, Gearpump or Local.
![Apex](https://beam.apache.org/images/logo_apex.png)
![Flink](https://beam.apache.org/images/logo_flink.png)
![Spark](https://beam.apache.org/images/logo_spark.png) 
![Dataflow](https://beam.apache.org/images/logo_google_cloud.png) 
![Gearpump](https://beam.apache.org/images/logo_gearpump.png)
- **Extensible** - Write and share new SDKs, IO connectors, and transformation libraries.

## Documentation & Resources
- https://cloud.google.com/dataflow/docs
- https://cloud.google.com/dataflow/docs/quickstarts/quickstart-java-maven
- https://cloud.google.com/dataflow/docs/templates/overview
- https://cloud.google.com/dataflow/docs/templates/creating-templates
- https://cloud.google.com/dataflow/docs/templates/executing-templates

## Navigation

- [Previous Step](./04-dataprep.md)
- [Next Step](./05-cloud-functions.md)
