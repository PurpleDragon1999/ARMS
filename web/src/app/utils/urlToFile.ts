import { Injectable } from '@angular/core';

@Injectable()
export class UrltoFile {
    constructor() { }

    urltoFile(url, filename, mimeType) {
        return fetch(url)
              .then(res=> {
        return res.arrayBuffer();
              })
              .then(buf=> {
        return new File([buf], filename, { type:mimeType });
              });
          }
  
}
