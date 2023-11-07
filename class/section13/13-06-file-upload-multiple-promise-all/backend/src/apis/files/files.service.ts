import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';

interface IFilesServiceUpload {
  files: FileUpload[];
}

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);
    const waitedFiles = await Promise.all(files);

    // 1-1) 스토리지 셋팅하기
    const bucket = '';
    const storage = new Storage({
      projectId: '',
      keyFilename: '',
    }).bucket(bucket);

    // 1-2) 스토리지에 파일 올리기
    console.time('시간확인');

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            // <generic>으로 타입을 잡아준다.
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => {
                resolve(`${bucket}/${el.filename}`);
              })
              .on('error', () => {
                reject('실패');
              });
          }),
      ),
    );

    console.timeEnd('시간확인');
    // for (let i = 0; i < waitedFiles.length; i++) {
    // *  for 문 안에서 await을 사용하는것은 anti-pattern이다. - 요청에 순서가 꼭 필요한 경우는 사용하게 될 수도 있다.
    //   results[i] = await new Promise((resolve, reject) => {
    //     waitedFiles[i]
    //       .createReadStream()
    //       .pipe(storage.file(waitedFiles[i].filename).createWriteStream())
    //       .on('finish', () => {
    //         resolve('성공');
    //       })
    //       .on('error', () => {
    //         reject('실패');
    //       });
    //   });
    // }

    console.log('파일 전송이 완료되었습니다.');

    return results;
  }
}
