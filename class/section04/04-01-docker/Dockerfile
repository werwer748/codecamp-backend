# 1. 운영체제 및 프로그램 설치하기(하나하나 입력해서 설치하는 방식)
# FROM ubuntu:22.04

# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 및 프로그램 설치(이미 리눅스, node, npm, yarn까지 모두 깔려있는 컴퓨터를 다운로드하는 방식)
FROM node:14

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
# RUN mkdir myfolder
# COPY: 도커 바깥에 있는걸 도커 안에 복사해 줌
COPY ./index.js /index.js

# 3. 도커 컴퓨터 안에서 명령어 실행하기 - index.js 실행
CMD node index.js
# 도커는 내가만든 컴퓨터가 된다. Dockerfile은 일종의 설명서
# 이 컴퓨터를 저장 및 최적화 해줘야하는데 이걸 docker build라고 함
# 이걸 통해서 하나의 파일이되는데 이걸 도커이미지(나만의 컴퓨터) 라고 한다.

# RUN은 빌드할 때 실행되는 명령어 - 이미지를 만들 때 실행되는 명령어
# CMD는 이미지가 실행될 때 실행되는 명령어 - 이미지 생성시 저장되지 않고 실행될 떄 수행된다.