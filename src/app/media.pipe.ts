import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'media',
  standalone: true
})
export class MediaPipe implements PipeTransform {

  transform(nota1: number, nota2: number): number {
    nota1 = Number(nota1);
    nota2 = Number(nota2);
    const media = (nota1 + nota2) / 2;
    return media;
  }

}
