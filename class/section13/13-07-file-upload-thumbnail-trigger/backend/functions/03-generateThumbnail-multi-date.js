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
  console.log(`event: ${JSON.stringify(event)}`);
  console.log(`context: ${JSON.stringify(context)}`);

  // 2. 썸네일 생성 준비
  const originStorage = new Storage().bucket('버킷명');
  const thumbStorage = new Storage().bucket('썸네일용버킷명');

  const prefix = event.name.split('/origin/')[0];
  const postfix = event.name.split('/origin/')[1];

  [
    { width: 320, name: `${prefix}/thumb/s/${postfix}` },
    { width: 640, name: `${prefix}/thumb/m/${postfix}` },
    { width: 1280, name: `${prefix}/thumb/l/${postfix}` },
  ].forEach((el) => {
    originStorage
      .file(event.name) // .file(파일명)
      .createReadStream() // 3. 파일 불러오기
      .pipe(sharp().resize({ width: el.width })) // 4. 파일 크기 변경하기
      .pipe(thumbStorage.file(`${el.name}`).createWriteStream()) // 5. 변경된 파일 재업로드
      .on('finish', () => console.log('성공!!!'))
      .on('error', () => console.log('실패!!!'));
  });
};
