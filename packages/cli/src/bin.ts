import { Command } from 'commander';
import pkg from '../package.json';
import { CommandService } from './command.service';

const program = new Command();
const commandService = new CommandService();

program
  .name('next-cli')
  .description('CLI for Web development kit to Quick Create Component or Package')
  .version(pkg.version);

program
  .command('init')
  .description('Initialize a new project')
  .option('-n, --name <name>', 'Project name')
  .action(commandService.init);

program
  .command('g')
  .command('generate')
  .description('Generate a new [ app / package / component ]')
  .option('-a, --app <app>', 'App name')
  .option('-p, --package <package>', 'Package name')
  .option('-c, --component <component>', 'Component name')
  .action(commandService.generate);

program.parse();
