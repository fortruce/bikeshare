# Bikeshare
Bikeshare is a web application for tracking nearby Capital Bikeshare stations in DC.

Bikeshare can be found live at [BikeInDC](http://bikeindc.com).

## Technologies

Bikeshare leverages several technologies including:

* React.js
* React Router
* Redux
* Express
* SCSS

## Deployment

BikeInDC is hosted on AWS and deployed using Docker and Elastic Beanstalk.
A typical deployment follows these simple steps:

* commit changes
* run `./pushimage.sh <profile> <api_key>` to deploy docker image to ECR
* run `cd deploy && eb deploy --profile <profile>` to deploy the new image
to environment
