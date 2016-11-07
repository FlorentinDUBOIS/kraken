# Kraken [![Build Status](https://travis-ci.org/FlorentinDUBOIS/kraken.svg?branch=v2)](https://travis-ci.org/FlorentinDUBOIS/kraken)

This project have to main goal to provide an easy file manager. That can be use by differents ways. First, This project can be run using a docker or by directly run the node.js application.

## Environnements variables

There are three environnements variables than can be used for configure the application. Those variables allow to connect to the mongo database.

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

OK, so now you're ready to test your app, go to:

```
http://<yourip/domain>
```

Enjoy.


## By run a standalone server
### Prerequissites

You need to have installed the node.js environnement and npm.

### Installation

First, clone the projects:

```bash
git clone https://github.com/FlorentinDUBOIS/file-manager.git
```

Create a symbolic link to mount your file system:

```bash
ln -s /path/to/directory/to/list ./mount
```

Now, install dependencies:

```bash
cd kraken && npm install
```
