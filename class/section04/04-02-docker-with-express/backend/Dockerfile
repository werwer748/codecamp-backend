# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 및 프로그램 설치(이미 리눅스, node, npm, yarn까지 모두 깔려있는 컴퓨터를 다운로드하는 방식)
FROM node:14

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
# 현재 폴더에 있는 모든 파일을 도커 컴퓨터 안에 myfolder라는 폴더 안에 복사
# COPY 시 없는 경로상에 없는 폴더는 자동으로 생성된다.
#COPY 할 때 dockerignore 에 있는 파일, 폴더는 제외하고 복사한다.
COPY . /myfolder

# RUN cd ./myfolder
# WORKDIR? 해당 폴더로 직접 이동하는 것이 아니라, 해당 폴더를 기준으로 명령어를 실행한다.
WORKDIR /myfolder
RUN yarn install

# 3. 도커 컴퓨터 안에서 명령어 실행하기 - index.js 실행
CMD yarn start:dev