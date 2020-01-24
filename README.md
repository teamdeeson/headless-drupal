# Deeson Headless CMS Framework

This is Deeson's framework for developing headless applications.

## Dependencies.

You will need [Node](https://nodejs.org) and [PHP](https://php.net) installed globally on your development machine. Assuming you are using a Mac then these can be installed with `brew install node php`

You will also need [yarn](https://yarnpkg.com/lang/en/) for node and [composer](https://getcomposer.org/) for PHP.

If correctly setup then both `which yarn` and `which composer` should return a file path to an executable.

### Using Docker for local development.

You will need the [Deeson Docker Proxy](https://github.com/teamdeeson/docker-proxy) running.

You will also need to set an exported bash environment variable for `USE_DOCKER` which could be done in a local `.env.` file in the project directory or as a global variable in your `~/.bash_profile`  e.g.

```
echo "export USE_DOCKER=1" >> ~/.bash_profile
source ~/.bash_profile
```

## Getting Started.

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

```
git clone git@github.com/teamdeeson/headless-drupal
cd headless-drupal
cp .env.example .env
make
```

### Using Docker for local development.

Executing `make` will download the project dependencies locally then create a Drupal and node runtime environment inside Docker containers.

The frontend is then available at: [https://headless-drupal.localhost](https://headless-drupal.localhost)

The Drupal backend CMS is available at: [https://cms.headless-drupal.localhost](https://cms.headless-drupal.localhost)

### Not using Docker for local development.

Executing `make` will create an SQLite database in your project root (local.sqlite)

The frontend is then available at: [https://localhost:3000](https://localhost:3000)

The Drupal backend CMS is available at: [https://localhost:8888](https://localhost:8888)

## Starting every other time.

Once installed, you use the following command to start the project without installing all the dependencies:

## Standards and testing.

### Formatting

Eslint and Prettier have been added to this project.

For Eslint run

```
make lint
```

### Testing with Jest.

To test the project using Jest, use:

```
make test
```

## Deployment.

This project uses firebase for deployments.

To deploy to firebase run

```
firebase deploy
```

## Drupal CLI with Drush.

The Drush command line tool is available for querying all the Drupal environments.  This is done using Drush aliases (the @ bit in any Drush command).  The aliases available are:

* @local - your local Drupal.
* @dev - the development installation of Drupal.
* @test - the pre-production (test) version of Drupal.
* @prod - the production version of Drupal.

To see the status of an environment you can use, for example, `./vendor/bin/drush @local status`.

As this is a lot of typing, it's recommended you create an alias for drush in your `.bashrc` file, e.g. `alias drush=./vendor/bin/drush`

To see a list of all Drush commands you can use `drush @local list` and to see more details about a specific command you can use `drush @local help command`

Note, to access environments other than your own will require SSH access to the servers they are hosted on.

### Logging in.

To login to Drupal as the administrator you can use `drush @local uli`

### Database dump.

To retrieve a database from a Drupal environment you can use `drush @local sql-dump > db.sql`

To then import that database you can use `pv db.sql | drush @local sql-cli` (you may need to install the pv cli tool or use cat instead)

### Database access.

You can get command line access to the database on any environment using `drush @local sql-cli`. Locally this is sqlite, on the servers this will be mysql.

## Built with.

- [React](https://reactjs.org/)
- [ContentaCMS](https://www.contentacms.org/)
- [Drush](https://docs.drush.org/en/9.x/)

## Authors

- **Deeson**
