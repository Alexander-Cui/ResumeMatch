import pandas as pd
from nltk.tokenize import word_tokenize
from nltk import FreqDist
import re

class Parser:
    def __init__(self):
        tags = pd.read_csv('./static/QueryResults.csv')
        tags.TagName = tags.TagName.apply(self.__removeNonAlphanumeric__)
        self.keywordData = dict(zip(tags.TagName, tags.Count))
        
        categories = ['frontend', 'backend']
        self.categoryKwds = {c: self.__getCategoryKeywords__(c) for c in categories}
        
    def __getCategoryKeywords__(self, category):
        categoryDf = pd.read_csv("./static/%s.csv" % category)
        freq = {}
        for tags in categoryDf['Tags']:
            tags = re.findall('\<(.*?)\>',tags)
            for tag in tags:
                tag = self.__removeNonAlphanumeric__(tag)
                if tag not in freq:
                    freq[tag] = 1
                else:
                    freq[tag] += 1
        return freq

    def __cleanhtml__(self, raw_html):
        cleantext = re.sub(r'<[^<]+?>', '', raw_html)
        return cleantext

    def __removeNonAlphanumeric__(self, text):
        text = str(text)
        return re.sub(r'[^A-Za-z0-9 ]+', '', text)

    def findKeywords(self, text, minCount=0):
        text = self.__cleanhtml__(text)
        text = self.__removeNonAlphanumeric__(text)

        tokens = [w.lower() for w in word_tokenize(text)]
        keywords = {}
        for tok in tokens:
            if tok in self.keywordData and self.keywordData[tok] > minCount:
                if tok in keywords:
                    keywords[tok] += 1
                else: 
                    keywords[tok] = 1
        return keywords



p = Parser()
print(p.findKeywords("<html>Hello world reactjs angular</html>"))
