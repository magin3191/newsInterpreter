# newsInterpreter
Analyze news articles using IBM Watson NLU. Sort articles of a given news source by either sadness, joy, fear, disgust, or anger.

Get an access token from https://newsapi.org/ and add it to the script where in says 'ADD API KEY HERE', on line 6. 

Get an access token from https://www.ibm.com/products/natural-language-understanding and add it to the script where in says 'ADD API KEY HERE', on line 7.

To Run:
1. NPM Install.
2. Navigate to directory.
3. Run command: node cli.js newsInterpreter {arguments}.
4. Flags:
5. '-s' = 'source' Specify the news source.
6. '-t = 'temperament' Specify the temperament (default:"joy).
7. '-o' = 'sort' Sort the articles by temperament (a/d) (default: "d").
8. '-h' = 'help' Display help for command
9. Ex: node cli.js newsInterpreter -s Techcrunch -t fear - d
