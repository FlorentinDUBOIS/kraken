# Kraken [![Build Status](https://travis-ci.org/FlorentinDUBOIS/kraken.svg?branch=v2)](https://travis-ci.org/FlorentinDUBOIS/kraken)

This project have to main goal to provide an easy file manager. That can be use in differents ways. First, this project can be run by using a docker or directly by running the node.js application.

## Environnements variables

There are three environment variables that can be used to configure the application. These variables are used to connect to the mongo database.

```bash
export MONGODB_HOST="localhost"
export MONGODB_PORT="27017"
export MONGODB_BASE="kraken"
```

## By docker

First, you need a mongodb database:

```bash
docker run --name mongodb -p 27017:27017 -d mongo:latest
```

Now, run the application and link it, to the mongo database:

```bash
docker run --name kraken -p 80:80 --link mongodb:mongo -v </path/to/directory/to/list>:/usr/src/app/mount -e MONGODB_HOST="mongodb" -e MONGODB_PORT="27017" -e MONGODB_BASE="kraken" -d florentindubois/kraken:stable 
```
then run:

```bash
docker exec -ti kraken bash
```

See how finish this install below.


## By run a standalone server
### Prerequissites

You need to have installed the node.js environnement, npm and a mongoDB database.

### Installation

First, clone the projects:

```bash
git clone https://github.com/FlorentinDUBOIS/file-manager.git
```

Go into the folder just cloned:

```bash
cd file-manager
```

Create a symbolic link to mount your file system:

```bash
ln -s /path/to/directory/to/list ./mount
```

Now, install dependencies:

```bash
npm install
```

See how finish just below.

## Set port and run the beast

###You can use an evironment variable like this:

```bash
echo PORT=MyNumberPort >> $HOME/.profile
```
or,you can change the default port in the server.coffee file:

```javascript
port = myFavoriteNumber
```

###OK, so now you're ready to test your app, go to:

```bash
http://x.x.x.x:yyyy'
```
x.x.x.x is to replace by your IP address and yyyy your port number

Enjoy.
