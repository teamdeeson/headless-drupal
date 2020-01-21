#
# Optionally include a .env to provide secrets and local config options.
#
-include .env

#
# You can choose to use Docker for local development by specifying the USE_DOCKER=1 environment variable in
# your project .env file.
#

USE_DOCKER ?= 0

#
# Ensure the local environment has the right binaries installed.
#

REQUIRED_BINS := composer npm node php yarn
$(foreach bin,$(REQUIRED_BINS),\
    $(if $(shell command -v $(bin) 2> /dev/null),,$(error Please install `$(bin)`)))

#
# Default is what happens if you only type make.
#

default: install build start

#
# Bring in the external project dependencies.
#

install:
	composer install
	yarn

#
# Start the local development server.
#

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

#
# Build stages: Setup and configure the application for the environment.
#

build: install-drupal

install-drupal:
ifeq ("${USE_DOCKER}","1")
	mv src/backend/settings/99-installation.settings.inc.hide src/backend/settings/99-installation.settings.inc
	./drush.wrapper @docker si contenta_jsonapi --yes
	mv src/backend/settings/99-installation.settings.inc src/backend/settings/99-installation.settings.inc.hide
	./drush.wrapper @docker cim --yes
else
	mv src/backend/settings/99-installation.settings.inc.hide src/backend/settings/99-installation.settings.inc
	./vendor/bin/drush si contenta_jsonapi --yes --db-url=sqlite://../local.sqlite
	mv src/backend/settings/99-installation.settings.inc src/backend/settings/99-installation.settings.inc.hide
	./vendor/bin/drush cim --yes
endif

#
# Linting / testing / formatting.
#

lint:
	./node_modules/.bin/tsc && ./node_modules/.bin/eslint --ext .js,.jsx,.ts,.tsx ./src/frontend/

test:
	./node_modules/.bin/jest ./src/frontend

format:
	./node_modules/.bin/prettier ./src/frontend/**/*.{ts,tsx,js,jsx} --write

#
# Delete all non version controlled files to reset the project.
#

clean: clean--reset-installation-file
	rm -rf docroot vendor

clean--reset-installation-file:
ifneq (,$(wildcard ${PWD}/src/settings/99-installation.settings.inc))
	mv src/settings/99-installation.settings.inc src/settings/99-installation.settings.inc.hide
endif

#
# Generate project symlinks and other disposable assets and wiring.
#

.persist/public:
ifeq ("${USE_DOCKER}","1")
	mkdir -p .persist/public
endif

.persist/private:
ifeq ("${USE_DOCKER}","1")
	mkdir -p .persist/private
endif

docroot/sites/default/files/:
ifeq ("${USE_DOCKER}","1")
	ln -s ../../../.persist/public docroot/sites/default/files
endif

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

#
# Commands which get run from composer.json scripts section.
#

composer--post-install-cmd: composer--post-update-cmd
composer--post-update-cmd: .persist/public \
                                .persist/private \
                                docroot/sites/default/files/tmp/ \
                                docroot/sites/default/settings.php \
                                docroot/modules/custom \
                                docroot/profiles/custom \
                                docroot/themes/custom;

#
# Helper CLI commands.
#

sql-cli:
ifeq ("${USE_DOCKER}","1")
	@docker-compose exec ${DB_HOST} mysql -u${DB_USER} -p${DB_PASSWORD} ${DB_NAME}
else
	@echo "You need to use whatever sqlite uses..."
endif

logs:
ifeq ("${USE_DOCKER}","1")
	docker-compose logs -f
else
	@echo "You need to use whatever sqlite uses..."
endif
