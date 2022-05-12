# SpaceX Launch List

## Table of contents
* [General info](#general-info)
* [Technologies](#Technologies)
* [Setup](#Setup)
* [App website](#App-website)

## General info

An app that displays a list of SpaceX launches that have taken place.

### Project assumptions
1. List
   1. is paginated by 20 items,
   2. sorted by default by date, starting with the newest.
   3. shows the flight number and the name of the launch along with the date. If photos are available, the first one is placed on the thumbnail.
   4. has the ability to filter out unsuccessful launches, allow to specify date range and search for launches by name.
2. After clicking on a particular flight, the application displays its details
   1. In addition, in the details there is a gallery of photos from the flight combined with photos of the rocket itself.

## Technologies
* TypeScript
* Angular
* SCSS
* Routing
* Rest Api
* Firebase

## Setup
To run this project, clone repo and install it locally using npm:

```
$ npm install
```

Next in terminal use:
```
$ npm start
```
## App website

### [SpaceX Launch List](https://ng-spacex-ab.web.app/)
