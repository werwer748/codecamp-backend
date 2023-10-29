# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 및 프로그램 설치(이미 리눅스, node, npm, yarn까지 모두 깔려있는 컴퓨터를 다운로드하는 방식)
FROM node:18

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
# 도커는 캐시가 깨지기 전까지는 임시저장공간의 작엄을 다시 가져오지만 캐시가 한번 깨지면 그 뒤로는 전부 새롭게 작업함.
# COPY . /myfolder 에서 포트번호가 바뀌면 캐시가 깨짐 => 따라서 아래도 캐시가 깨져서 새롭게 실행되므로 yarn install도 다시 새롭게 실행 된다.
# 해결책 캐시가 깨지기전에 인스톨을 먼저 해준다!
COPY ./package.json /myfolder/package.json
COPY ./yarn.lock /myfolder/yarn.lock
WORKDIR /myfolder
RUN yarn install

# 매번 소스코드는 바뀔테니.. 여기는 캐시가 매번 꺠질듯?
COPY . /myfolder

# 3. 도커 컴퓨터 안에서 명령어 실행하기 - index.js 실행
CMD yarn start:dev