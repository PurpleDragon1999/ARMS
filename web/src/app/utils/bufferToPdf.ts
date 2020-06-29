import { DomSanitizer } from "@angular/platform-browser";
import { Injectable } from '@angular/core';

@Injectable()
export class BufferToPdf {
    constructor(private domSanitizer: DomSanitizer) { }

    bufferToPdf(pdf: Buffer) {
        let TYPED_ARRAY = new Uint8Array(pdf);

        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
        }, '');
        let base64String = btoa(STRING_CHAR);

        return `data:application/pdf;base64, ` + base64String;
    }
}
