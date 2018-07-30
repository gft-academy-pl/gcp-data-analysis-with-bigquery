![GCP Logo](https://raw.githubusercontent.com/gft-academy-pl/gcp-data-analysis-with-bigquery/master/assets/google-cloud-platform.png)

## Agenda

- Introduction to GCP
- Introduction to GCP shell and editor
- Project overview
- Initialization / setup

## Introduction to GCP

Google Cloud Platform is a public cloud solution providing a set of product: compute, storage, database cloud AI, networking, identity & security. 

- https://cloud.google.com/ 
- http://console.cloud.google.com

## Introduction to GCP shell and editor

### Cloud shell

Google Cloud Shell provides you with command-line access to your cloud resources directly from your browser. You can easily manage your projects and resources without having to install the Google Cloud SDK or other tools on your system. With Cloud Shell, the Cloud SDK gcloud command-line tool and other utilities you need are always available, up to date and fully authenticated.

When you start Cloud Shell, g1-small Google Compute Engine virtual machine running a Debian-based Linux operating system is provisioned for you (for free!). Cloud Shell instances are provisioned on a per-user, per-session basis. The instance persists while your Cloud Shell session is active and terminates after an hour of inactivity. 

**Remember:** _Each time Cloud Shell is restarted, you are loosing all of variables exported by you (until you put them into ~/.bashrc or ~/.bash_profile)!_

## Project overview

![Diagram](https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery/blob/master/assets/Data%20analysis%20with%20BQ%20-%20diagram.png?raw=true)

## Initialization / setup

#### Create dedicated project

In order to easier clean resources create dedicated project and switch to it after creation.

#### Clean up

After the workshop is over, please delete the project as your account will be still billed for the bucket usage.

#### Clone repository

```
cd ~
git clone https://github.com/gft-academy-pl/gcp-data-analysis-with-bigquery.git
cd gcp-data-analysis-with-bigquery
ls
```

#### Script to get project-id
We will be using project-id in many places - you can get it using below script.  
```
echo ${GOOGLE_CLOUD_PROJECT} 
```

#### Cloud shell editor

```
cloudshell edit 00-init.md
```

## Navigation

- [Next Step](./01-storage.md)
