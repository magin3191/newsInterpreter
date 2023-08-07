# newsInterpreter
Analyze news articles using IBM Watson NLU. Sort articles of a given news source by either sadness, joy, fear, disgust, or anger.

Get an access token from https://newsapi.org/ and add it to the script where in says 'ADD API KEY HERE', on line 6. 

Get an access token from https://www.ibm.com/products/natural-language-understanding and add it to the script where in says 'ADD API KEY HERE', on line 7.

To Run:
1. NPM Install.
2. Navigate to directory.
3. Run command: node cli.js newsInterpreter {arguments}.
  
Flags:
'-s'= 'source' Specify the news source.
'-t = 'temperament' Specify the temperament (default:"joy").
'-o'= 'sort' Sort the articles by temperament (a/d) (default: "d").
'-h'= 'help' Display help for command.
Ex: node cli.js newsInterpreter -s Techcrunch -t fear - d
