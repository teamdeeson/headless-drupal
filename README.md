# Deeson Headless CMS Framework

This is Deeson's framework for developing headless applications.

## Dependencies.

You will need [Node](https://nodejs.org) and [PHP](https://php.net) installed globally on your development machine. Assuming you are using a Mac then these can be installed with `brew install node php`

You will also need [yarn](https://yarnpkg.com/lang/en/) for node and [composer](https://getcomposer.org/) for PHP.

If correctly setup then both `which yarn` and `which composer` should return a file path to an executable.

## Getting Started.

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

```
git clone git@github.com/teamdeeson/headless-drupal
cd headless-drupal
make
```

Executing make will download the project dependencies and install Drupal into an sqlite db.

The frontend is then available at: https://localhost:3000

The Drupal backend CMS is available at: https://localhost:8888

## Every other time.

Once installed, you use the following command to start the project without installing all the dependencies:

```
make start
```

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

To see a list of all Drush commands you can use `drush @local help`

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
