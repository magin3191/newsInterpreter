const axios = require('axios');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// Replace these values with your own API keys and configurations
const NEWS_API_KEY = 'YOUR API KEY HERE';
const WATSON_API_KEY = 'YOUR API KEY HERE';
const WATSON_URL = 'https://api.us-east.natural-language-understanding.watson.cloud.ibm.com';

const getArticles = async (source) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?sources=${source}`, {
      headers: {
        'Authorization': `${NEWS_API_KEY}`,
      },
    });
    return response.data.articles;
  } catch (error) {
    throw `${error.message}`
  }
};

const analyzeTemperament = async (content) => {
  try {
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
      version: '2022-04-07',
      authenticator: new IamAuthenticator({
        apikey: WATSON_API_KEY,
      }),
      serviceUrl: WATSON_URL,
    });

    const analyzeParams = {
      text: content,
      features: {
        emotion: {},
      },
    };

    const analysisResult = await naturalLanguageUnderstanding.analyze(analyzeParams);
    return analysisResult.result.emotion.document.emotion;
  } catch (error) {
    console.error('Error analyzing temperament:', error.message);
    return null;
  }
};

const parseArticelsTemperament = async (articles) =>{
    let emotArticles = []
    for(let i=0;i<articles.length;i++){
        let article = articles[i]
        let content = article.content
        
        const temperamentData = await analyzeTemperament(content);
        if(!temperamentData)continue
        emotArticles.push({
            [article.url]:temperamentData
        })
    }
    return emotArticles
  }

const interpretNews = async (source,temperament,sortOrder) => {

  if(!source){
      throw 'Select a source.'
  }

  const articles = await getArticles(source);
  if (articles.length === 0) {
    throw 'No articles found for the given source.'
  }

  const emotArticles = await parseArticelsTemperament(articles)

  const sortedArticles = (sortOrder === 'a')//defaults to descending if no param passed
  ?  emotArticles.sort((a, b) => a[Object.keys(a)[0]][temperament]- b[Object.keys(b)[0]][temperament])
  :  emotArticles.sort((a, b) => b[Object.keys(b)[0]][temperament] - a[Object.keys(a)[0]][temperament]);

  return sortedArticles

};

module.exports = interpretNews;
