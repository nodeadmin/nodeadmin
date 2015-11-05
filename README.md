# NodeAdmin

> A fantastically elegant tool for MySQL and Node.js/Express management

## Team

  - __Product Owner__: [Taylor Lehman](https://github.com/taylorleh)
  - __Scrum Master__: [Alex Hutchison](https://github.com/dutchers)
  - __Development Team Members__: [Laura Knight](https://github.com/ljknight), [Andrew Nickell](https://github.com/nickell-andrew), [Taylor Lehman](https://github.com/taylorleh), [Alex Hutchison](https://github.com/dutchers)

## Table of Contents
1. [Installation](#installation)
1. [API](#api)
1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Team](#team)
1. [Contributing](#contributing)

## Installation

```
npm install --save nodeadmin
```

## Requirements

- Node 4.x.x
- Express 4.x.x

## API

```
var nodeadmin = require(nodeadmin);
app.use( nodeadmin( app, port ) );
```
This starts your Express server on the given port and enables the /nodeadmin route. 

## Usage

Navigate to /nodeadmin and log in to your server's MySQL database with a username and password.

> **Overview** displays stats on the server's physical properties/memory pressure.

> **DB** gives authenticated users GUI CRUD access to databases, tables, and records on the server.

> **System** displays installed npm package tree.

> **Kwikwery** provides a simple window to directly query the mysql server.

> **Settings** offers a variety of (not yet implemented) options for configuring Nodeadmin

<!-- ## Development -->

### Roadmap

View the project roadmap [here](https://github.com/cloistered-babka/cloistered-babka/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
