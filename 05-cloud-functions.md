![Diagram](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/Data%20analysis%20with%20BQ%20-%20diagram%20(part_3).png?raw=true)

# Cloud Functions 

## Agenda
- Cloud functions - definition
- Service accounts
- Dataflow trigger
- Function deployment

## Cloud functions - definition

Google Cloud Functions is a serverless execution environment for building and connecting cloud services. With Cloud Functions you write simple, single-purpose functions that are attached to events emitted from your cloud infrastructure and services. Your Cloud Function is triggered when an event being watched is fired. Your code executes in a fully managed environment. There is no need to provision any infrastructure or worry about managing any servers.

Cloud Functions are now in GA relase since 24th of July, the only language available in GA is Javascript and execute in a Node.js v6.14.0 on Google Cloud Platform. However right now as a part of the Beta release you can write functions in JS and execute it in Node.js 8.11.1 or Python 3.7.0. If you are writing functions in JS you can take your Cloud Function and run it in any standard Node.js runtime which makes both portability and local testing a breeze.

### Serverless

Cloud Functions removes the work of managing servers, configuring software, updating frameworks, and patching operating systems. The software and infrastructure are fully managed by Google so that you just add code. Furthermore, provisioning of resources happens automatically in response to events. This means that a function can scale from a few invocations a day to many millions of invocations without any work from you.

### Events
- HTTP—invoke functions directly via HTTP requests
- Cloud Storage
- Cloud Pub/Sub
- Firebase (DB, Storage, Analytics, Auth)

### Trigger
- HTTP:	--trigger-http
- Google Cloud Storage:	--trigger-bucket [BUCKET NAME]
- Google Cloud Pub/Sub:	--trigger-topic [TOPIC NAME]

### Concurrency

Cloud Functions may start multiple function instances to scale your function up to meet the current load. These instances run in parallel, which results in having more than one parallel function execution.

However, each function instance handles only one concurrent request at a time. This means while your code is processing one request, there is no possibility of a second request being routed to the same function instance, and the original request can use the full amount of resources (CPU and memory) that you requested.

### Stateless Functions

Cloud Functions implements the serverless paradigm, in which you just run your code without worrying about the underlying infrastructure, such as servers or virtual machines. To allow Google to automatically manage and scale the functions, they must be stateless—one function invocation should not rely on in-memory state set by a previous invocation. 

### Execution Guarantees

Your functions are typically invoked once for each incoming event. However, Cloud Functions does not guarantee a single invocation in all cases because of differences in error scenarios.

The maximum or minimum number of times your function is going to be invoked on a single event depends on the type of your function:

HTTP functions are invoked at most once. This is because of the synchronous nature of HTTP calls, and it means that any error on handling function invocation will be returned without retrying. The caller of an HTTP function is expected to handle the errors and retry if needed.

Background functions are invoked at least once. This is because of asynchronous nature of handling events, in which there is no caller that waits for the response and could retry on error. An emitted event invokes the function with potential retries on failure (if requested on function deployment) and sporadic duplicate invocations for other reasons (even if retries on failure were not requested).

To make sure that your function behaves correctly on retried execution attempts, you should make it idempotent by implementing it so that an event results in the desired results (and side effects) even if it is delivered multiple times. In the case of HTTP functions, this also means returning the desired value even if the caller retries calls to the HTTP function endpoint.

https://cloud.google.com/functions/docs/concepts/overview 

## Service accounts

A service account is a special account that can be used by any services and applications to interact with other Google Cloud Platform APIs. Applications can use service account credentials to authorize themselves to Google APIs and perform actions within the permissions granted at the Google Cloud project level. In addition for Google Compute Engine, you can create firewall rules that allow or deny traffic to and from instances based on the service account that owns the instances.

https://cloud.google.com/compute/docs/access/service-accounts

## Exercises

### Code
- Implementation: https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/cloud-functions/dataflow-trigger/index.js

Open Cloud Shell and paste following script:

```bash
cd ~/gcp-data-analysis-with-bigquery/cloud-functions/dataflow-trigger
npm install
```

### Generate config.json

```bash
export GCP_INPUT_BUCKET=${GOOGLE_CLOUD_PROJECT}-input
export GCP_TEMP_BUCKET=${GOOGLE_CLOUD_PROJECT}-temp

export GCP_OUTPUT_LOCATION=${GOOGLE_CLOUD_PROJECT}:gft_academy_trades_analysis.trades
export DPREP_BUCKET=`gsutil ls -l | grep dataprep`
export ACCOUNT=`gcloud config list account --format "value(core.account)"`
export GCP_TEMPLATE_LOCATION=`gsutil ls -l $DPREP_BUCKET$ACCOUNT/temp/ | grep template | grep -v metadata | sort -k2 | tail -n1 | awk 'END {$1=$2=""; sub(/^[ \t]+/, ""); print }' | cut -c 6- | sed 's/\\//\\\\\\//g'`

sed -i 's/__INPUT__/'"$GCP_INPUT_BUCKET"'/' ./config.json
sed -i 's/__OUTPUT__/'"$GCP_OUTPUT_LOCATION"'/' ./config.json
sed -i 's/__TEMP__/'"$GCP_TEMP_BUCKET"'/' ./config.json
sed -i 's/__TEMPLATE__/'"$GCP_TEMPLATE_LOCATION"'/' ./config.json
cat config.json
 ```
 
### Call API with System Account via JWT

```bash
# Create service account
gcloud iam service-accounts create service-gft-data-analysis --display-name "GFT Data Analysis Trigger"

# List service accounts
gcloud iam service-accounts list

# Generate key
gcloud iam service-accounts keys create \
    ~/gcp-data-analysis-with-bigquery/cloud-functions/dataflow-trigger/jwt.keys.json \
    --iam-account service-gft-data-analysis@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com

# List keys
gcloud iam service-accounts keys list \
    --iam-account service-gft-data-analysis@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com

# Add service account roles
gcloud projects add-iam-policy-binding ${GOOGLE_CLOUD_PROJECT} \
    --member serviceAccount:service-gft-data-analysis@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com --role roles/dataflow.viewer

gcloud projects add-iam-policy-binding ${GOOGLE_CLOUD_PROJECT} \
    --member serviceAccount:service-gft-data-analysis@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com --role roles/dataflow.developer
	
gcloud projects add-iam-policy-binding ${GOOGLE_CLOUD_PROJECT} \
    --member serviceAccount:service-gft-data-analysis@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com --role roles/dataflow.worker
	
gcloud projects add-iam-policy-binding ${GOOGLE_CLOUD_PROJECT} \
    --member serviceAccount:service-gft-data-analysis@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com --role roles/dataflow.admin
	
gcloud projects add-iam-policy-binding ${GOOGLE_CLOUD_PROJECT} \
    --member serviceAccount:service-gft-data-analysis@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com --role roles/storage.objectViewer
```

## Deploy function

- Enable API first using following link: https://console.cloud.google.com/apis/library/cloudfunctions.googleapis.com or command line: `gcloud services enable cloudfunctions.googleapis.com`.

```bash
gcloud functions deploy triggerDataflowFn --trigger-bucket=gs://${GCP_INPUT_BUCKET}
```

### Once Cloud Function deployed, perform a simple test  
Copy datafile into the ./input/ directory.

```bash
gsutil cp gs://gft-academy-fraud-detector-public-data/trades/trades_2017.csv gs://${GCP_INPUT_BUCKET}/trades/
```

In order to check if the function was invoked, click on the link https://console.cloud.google.com/functions, and then click on the _triggerDataflowFn_ function. You should see a peak on the chart.  

Click on following link https://console.cloud.google.com/dataflow to check if Dataflow job was triggered. You should see job in running status. Refresh page to monitor execution progress.
  
Once completed, check if data for 2017 year is available in BigQuery (_trades_ table).  
You can repeat the same for file _trades_2018.csv_.  

```bash
gsutil cp gs://gft-academy-fraud-detector-public-data/trades/trades_2018.csv gs://${GCP_INPUT_BUCKET}/trades/
```

## Documentation & Resources
- https://cloud.google.com/functions/docs/
- https://github.com/GoogleCloudPlatform/cloud-functions-emulator _(for development!!!)_
- https://shinesolutions.com/2017/03/23/triggering-dataflow-pipelines-with-cloud-functions/ - with templates
- https://cloud.google.com/blog/big-data/2016/04/scheduling-dataflow-pipelines-using-app-engine-cron-service-or-cloud-functions - with spawning processess
- https://cloud.google.com/dataflow/docs/templates/executing-templates#using-the-google-api-client-libraries
- https://developers.google.com/api-client-library/
- https://github.com/google/google-api-nodejs-client/#google-apis-nodejs-client
- https://github.com/google/google-api-nodejs-client/#authentication-and-authorization
- https://github.com/google/google-auth-library-nodejs#choosing-the-correct-credential-type-automatically
- http://google.github.io/google-api-nodejs-client/
- http://google.github.io/google-api-nodejs-client/classes/_apis_dataflow_v1b3_.dataflow.html

## Navigation

- [Previous Step](./04-dataflow.md)
- [Next Step](./06-data-studio.md)
