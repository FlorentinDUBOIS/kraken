# File manager [![Build Status](https://travis-ci.org/FlorentinDUBOIS/file-manager.svg?branch=master)](https://travis-ci.org/FlorentinDUBOIS/file-manager)

This projects has to main goal to provide a solid file manager design with Google material design guidelines.
It is also based on Docker at `florentindubois/infrastructure:kraken` if you want to pull it to try.

## Prerequisites

This projects need node.js to run and npm to install and manage dependencies.
The minimum version of node is `argon`, that is version is `4.4.4`.

Personnaly, I use nvm (node version manager) to test on differents versions, but you can use on linux the version of your linux distribution's repositories.

On Arch Linux :

```bash
$ pacman -S nodejs npm
```

More, the application need mongodb to store data, you can install it on your device or by docker

On Arch linux :

```bash
$ pacman -S mongodb
```

By docker :

```bash
$ docker run --rm --name mongodb -p 27017:27017 mongodb:latest
```

## Installation and Utilisation

To install this two ways, by git or by docker.

### by Git

First, clone the project :

```bash
$ git clone https://github.com/FlorentinDUBOIS/file-manager.git kraken
```

After, go in repertory :

```bash
$ cd kraken
```

Now, install dependencies :

```bash
$ npm install
```

Build the project :

```bash
$ npm run-script build
```

Add default user
```bash
$ node install.js
```

Launch the project, by default is in port 80 but if you set PORT environnement variable you can change the port of application listen to.

```bash
$ npm start
```

### by Docker

You also use docker to use this applicatin

First, clone the project :

```bash
$ git clone https://github.com/FlorentinDUBOIS/file-manager.git kraken
```

After, go in repertory :

```bash
$ cd kraken
```

Now, build the docker :

```bash
$ docker build -ti kraken .
```

Run mongodb, do not twice
```bash
$ docker run --rm --name mongodb -p 27017:27017 mongodb:latest
```

Run application
```bash
$ docker run --rm --name kraken  -p 80:80 --link mongodb:mongo -e MONGODB_HOST=mongodb kraken
```

Add default user
```bash
$ docker exec -ti kraken node install.js
```