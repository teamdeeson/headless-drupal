# Deeson Headless CMS Framework

This is Deeson's framework for developing headless applications.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

First clone the repo.

```
git clone git@github.com/teamdeeson/headless-drupal
```

### Getting started

```
make
```

Executing make will download the project dependencies and install Drupal into an sqlite db.

The frontend is then available at: https://localhost:3000

The Drupal backend CMS is available at: https://localhost:8888

### Formatting

Eslint and Prettier have been added to this project.

For Eslint run

```
make lint
```


## Deployment

This project uses firebase for deployments.

To deploy to firebase run

```
firebase deploy
```

## Built With

- [React](https://reactjs.org/)

## Authors

- **Deeson**
