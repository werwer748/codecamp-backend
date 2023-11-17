const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.generateThumbnail = (event, context) => {
  // 1. event와 context의 데이터를 로그로 확인
  console.log('나는 트리거입니다!!!');
  const gcsEvent = event;
  console.log(`Processing file: ${gcsEvent.name}`);
  console.log(`event: ${JSON.stringify(event)}`);
  console.log(`context: ${JSON.stringify(context)}`);

  // 2. 썸네일 생성 준비
  const originStorage = new Storage().bucket('버킷명');
  const thumbStorage = new Storage().bucket('썸네일용버킷명');

  originStorage
    .file(event.name) // .file(파일명)
    .createReadStream() // 3. 파일 불러오기
    .pipe(sharp().resize({ width: 320 })) // 4. 파일 크기 변경하기
    .pipe(thumbStorage.file(`thumb/${event.name}`).createWriteStream()) // 5. 변경된 파일 재업로드
    .on('finish', () => console.log('성공!!!'))
    .on('error', () => console.log('실패!!!'));
};
