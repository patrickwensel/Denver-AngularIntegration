import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ssnMask' })
export class SSNMaskPipe implements PipeTransform {
    transform(phrase: string, args?: any) {  
        if (phrase) {
            if (args == 1) {
                let toBeReplaced = phrase.slice(0, 7);
                return phrase.replace(toBeReplaced, "*****");
            } else if (args == 2) {
                let toBeReplaced = phrase.slice(0, 11);
                return phrase.replace(toBeReplaced, "*********");
            } else { 
                return phrase;
            }
        }
    }
}