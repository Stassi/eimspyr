#!/usr/bin/env node
const { argv } = process,
  { cli } = require('../lib/cli.cjs'),
  { infoQuery } = require('../lib/eimspyr.cjs'),
  { name, version } = require('../package.json')

cli({ argv, infoQuery, name, version })
