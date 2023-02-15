FROM ubuntu:20.04
FROM ruby:2.7.6

WORKDIR /sub_api1
COPY ./src /sub_api1
RUN apt update && \
    apt install -y clang libc++-11-dev
# RUN chmod 744 /sub_api1/parent.rb
CMD ["ruby", "./parent.rb"]