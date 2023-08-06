#!/usr/bin/env node

const { program } = require('commander');
const interpretNews = require('./index.js'); // Import the interpretNews function

// Set the version number for your CLI
program.version('1.0.0');

// Add commands and options to your CLI
// For example, let's add a command called 'newsInterpreter'
program
  .command('newsInterpreter')
  .description('Analyze news articles using IBM Watson NLU')
  .option('-s, --source <source>', 'Specify the news source')
  .option('-t, --temperament <temperament>', 'Specify the temperament', 'joy')
  .option('-o, --sort <sort>', 'Sort articles by temperament (a/d)', 'd')
  .action((options) => {
    interpretNews(options.source, options.temperament, options.sort)
      .then((results) => {
        console.log('Results:', results);
      })
      .catch((error) => {
        console.error('Error analyzing news:', error);
      });
  });

// Parse the command-line arguments
program.parse(process.argv);
