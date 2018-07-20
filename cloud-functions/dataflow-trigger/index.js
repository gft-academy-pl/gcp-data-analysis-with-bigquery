const { google } = require('googleapis');
const fs = require("fs");
const path = require('path');

const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

exports.triggerDataflowFn = (event, callback) => {

	console.log('Processing incomming event');

	const file = event.data;

	if (file.name.startsWith('trades/trades_')) {
      return google.auth.getClient({
		keyFile: path.join(__dirname, 'jwt.keys.json'),
		scopes: [
			'https://www.googleapis.com/auth/cloud-platform',
			'https://www.googleapis.com/auth/userinfo.email'
		]
		}).then((auth) => {
			return google.auth.getDefaultProjectId()
				.then((projectId) => {
					console.log(`Succesfully authorized with JWT key, project: ${projectId}`);
					return exports.createJob(auth, projectId, file);
				}, (err) => {
					console.log('Error during obtaining projectId', err);
					return err;
				});

		}, (err) => {
			console.log('Error during authorization', err);
			return err;
		});
	} else {
		callback();
	}
};

exports.createJob = function(auth, projectId, file) {
	const params = {
		projectId: projectId,
		resource: {
			parameters: {
                inputLocations: `{"location1":"gs://${CONFIG.INPUT_BUCKET}/${file.name}"}`,
				customGcsTempLocation: `gs://${CONFIG.TEMP_BUCKET}`,
				outputLocations: `{"location1":"${CONFIG.OUTPUT_LOCATION}"}`
			},
			jobName: 'dataprep-load-trades-' + new Date().toISOString(),
			gcsPath: `gs://${CONFIG.TEMPLATE_LOCATION}`
		}
	};
	console.log('Requesting params: ', params);
	return google.dataflow({
			version: 'v1b3',
			auth: auth
		})
		.projects.templates.create(params).then((result) => {
			console.log('OK');
			return result;
		}, (err) => {
			console.log('Error during executing call', err);
			return err;
		});
};