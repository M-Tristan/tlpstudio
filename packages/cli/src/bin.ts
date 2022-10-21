#!/usr/bin/env node

import { Command } from 'commander'
import select from './select'
// import {prompt} from 'inquirer'

const program = new Command()


program
  .command('dev')
  .option('-f --force', 'Force dep pre-optimization regardless of whether deps have changed')
  .description('Run varlet development environment')
  

program.command('build').description('Build varlet site for production')

program
  .command('build:vite')
  .description('Use vite build app for production')

program
  .command('dev:vite')
  .description('Use vite start server for development')
 

program.command('preview').description('Preview varlet site for production')

program
  .command('compile')
  .description('Compile varlet components library code')
  .option('-nu, --noUmd', 'Do not compile umd target code')
 

program.command('lint').description('Lint code')

program
  .command('create')
  .description('Create a component directory')
  .option('-n, --name <componentName>', 'Component name')
  .option('-s, --sfc', 'Generate files in sfc format')
  .option('-t, --tsx', 'Generate files in tsx format')
  .option('-l, --locale', 'Generator internationalized files').action(select)
  

program
  .command('jest')
  .description('Run Jest in work directory')
  .option('-w, --watch', 'Watch files for changes and rerun tests related to changed files')
  .option('-wa, --watchAll', 'Watch files for changes and rerun all tests when something changes')
  .option('-c, --component <componentName>', 'Test a specific component')
  .option('-cc --clearCache', 'Clear test cache')
  

program
  .command('gen')
  .description('Generate cli application')
  .option('-n, --name <applicationName>', 'Application name')
  .option('-s, --sfc', 'Generate files in sfc format')
  .option('-t, --tsx', 'Generate files in tsx format')
  .option('-l, --locale', 'Generator internationalized files')
 

program
  .command('changelog')
  .option('-rc --releaseCount <releaseCount>', 'Release count')
  .option('-f --file <file>', 'Changelog filename')
  .description('Generate changelog')
 

program
  .command('release')
  .option('-r --remote <remote>', 'Remote name')
  .description('Release all packages and generate changelogs')
  

program.command('commit-lint <gitParams>').description('Lint commit message')

program.on('command:*', ([cmd]) => {
  program.outputHelp()
 
  process.exitCode = 1
})

program.parse()
