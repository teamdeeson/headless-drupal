include .env

# Decide if we're using Docker or not.
ifneq ("$(wildcard ${PWD}/localdev)","")
USE_DOCKER = 0
else
USE_DOCKER = 1
endif

REQUIRED_BINS := composer npm node php yarn
$(foreach bin,$(REQUIRED_BINS),\
    $(if $(shell command -v $(bin) 2> /dev/null),,$(error Please install `$(bin)`)))

default: install start

install:
	composer install
	yarn

start:
ifeq ("${USE_DOCKER}","1")
	@echo Bringing docker containers up
	docker-compose up -d
	docker-compose ps
else
	./node_modules/.bin/concurrently \
		-n "webpack,drupal" \
		-c "yellow,cyan" \
		--kill-others \
		--handle-input \
		"./node_modules/.bin/webpack -wd" \
		"./vendor/bin/drush runserver"
endif

stop:
ifeq ("${USE_DOCKER}","1")
	docker-compose down --remove-orphans
endif

restart: stop start

lint:
	./node_modules/.bin/tsc && ./node_modules/.bin/eslint --ext .js,.jsx,.ts,.tsx ./src/frontend/

test:
	./node_modules/.bin/jest ./src/frontend

format:
	./node_modules/.bin/prettier ./src/frontend/**/*.{ts,tsx,js,jsx} --write

install-drupal:
ifeq ("${USE_DOCKER}","1")
	@echo "Use drush to import a database, e.g. drush @dev sql-dump | drush @docker sql-cli"
else
	./vendor/bin/drush si --yes --db-url=sqlite://../local.sqlite
	# TODO install is a bit messy; you have to remove the line from settings.php that provides a config dir so that Drush doesn't try an import during install.
	# Then you can install and run an import safely after that.
	drush cim -y
endif

.persist/public:
ifeq ("${USE_DOCKER}","1")
	mkdir -p .persist/public
endif

.persist/private:
ifeq ("${USE_DOCKER}","1")
	mkdir -p .persist/private
endif

docroot/sites/default/files/:
	ln -s ../../../.persist/public docroot/sites/default/files:

docroot/sites/default/files/tmp/:
	mkdir -p docroot/sites/default/files/tmp/

docroot/sites/default/settings.php:
	ln -s ../../../src/backend/settings/settings.php docroot/sites/default/settings.php

docroot/modules/custom:
	ln -s ../../src/backend/modules $@

docroot/themes/custom:
	ln -s ../../src/backend/themes $@

docroot/profiles/custom:
	ln -s ../../src/backend/profiles $@

deploy-drupal:
	./scripts/git-relay/deployer.sh

# Commands which get run from composer.json scripts section.
composer--post-install-cmd: composer--post-update-cmd
composer--post-update-cmd: .persist/public \
                                .persist/private \
                                docroot/sites/default/files/tmp/ \
                                docroot/sites/default/settings.php \
                                docroot/modules/custom \
                                docroot/profiles/custom \
                                docroot/themes/custom;

sql-cli:
ifeq ("${USE_DOCKER}","1")
	@docker-compose exec ${DB_HOST} mysql -u${DB_USER} -p${DB_PASSWORD} ${DB_NAME}
else
	@echo "You need to use whatever sqlite uses..."
endif
