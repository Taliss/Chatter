#!/usr/bin/env node
const commander = require('commander');
const handlers = require('./handlers');
const { parseToInt } = require('./utils');

const program = new commander.Command();

(async () => {
  program
    .version('0.0.1')
    .command('connect')
    .alias('conn')
    .argument('<address>', 'server address')
    .requiredOption('-p, --port <port_number>', 'connection must have port')
    .description(
      'saving address and trying to establish connection to the server'
    )
    .action(handlers.connect);

  program
    .command('user')
    .description('will save and use provided username')
    .argument('<username>', 'user name')
    .action(handlers.user);

  program
    .command('room')
    .argument('<roomname>', 'room name')
    .description('will save and use provided roomname')
    .action(handlers.room);

  program
    .command('get')
    .description('get last n message from the room')
    .argument('[n]', 'number of messages to fetch', parseToInt, 10)
    .action(handlers.get);

  program
    .command('post')
    .description('sending message to the room')
    .argument('<message>', 'message to be send')
    .action(handlers.post);

  program
    .command('create')
    .description('create new room')
    .argument('<name>', 'name of the room to be created')
    .action(handlers.create);

  program
    .command('list')
    .description('will list all existing room names')
    .action(handlers.list);

  program
    .command('live')
    .description('connecting to provided server and starts repl session.')
    .action(handlers.live);

  program
    .command('show')
    .description('show current connection address, user and room name.')
    .action(handlers.show);

  program
    .command('flush')
    .description('clear all persisted values from the store')
    .action(handlers.flush);

  await program.parseAsync(process.argv);
})();
