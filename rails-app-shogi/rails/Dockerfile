FROM ruby:2.7

ENV RAILS_ENV=production
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update -qq \
  && apt-get install -y nodejs yarn\
  && apt-get install imagemagick --fix-missing
# chromeの追加
RUN apt-get update && apt-get install -y unzip && \
    CHROME_DRIVER_VERSION=`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE` && \
    wget -N http://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip -P ~/ && \
    unzip ~/chromedriver_linux64.zip -d ~/ && \
    rm ~/chromedriver_linux64.zip && \
    chown root:root ~/chromedriver && \
    chmod 755 ~/chromedriver && \
    mv ~/chromedriver /usr/bin/chromedriver && \
    sh -c 'wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -' && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && apt-get install -y google-chrome-stable
WORKDIR /rails
COPY ./src /rails
RUN bundle config --local set path 'vendor/bundle' \
  && bundle update
CMD ["yarn", "add", "jquery", "bootstrap", "@popperjs/core", "vue@next"]
CMD ["yarn", "add", "--dev", "vue-loader@next", "@vue/compiler-sfc"]
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

COPY start.sh /start.sh
RUN chmod 744 /start.sh
CMD ["sh", "/start.sh"]
