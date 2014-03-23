
all: install test

install:
	@ npm install

test:
	@ ./node_modules/.bin/mocha --require should --reporter spec

.PHONY: all install test
