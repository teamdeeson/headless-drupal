default: install build start

install:
	composer install
	yarn

build: install-drupal

start:
	./node_modules/.bin/concurrently \
		-n "webpack,drupal" \
		-c "yellow,cyan" \
		--kill-others \
		--handle-input \
		"./node_modules/.bin/webpack -wd" \
		"./vendor/bin/drush runserver"

lint:
	./node_modules/.bin/tsc && ./node_modules/.bin/eslint --ext .js,.jsx,.ts,.tsx ./src/frontend/

test:
	./node_modules/.bin/jest ./src/frontend

install-drupal: local.sqlite docroot/sites/default/files/tmp/

local.sqlite:
	./vendor/bin/drush si --yes --db-url=sqlite://../local.sqlite

docroot/sites/default/files/tmp/:
	mkdir -p docroot/sites/default/files/tmp/
