import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private url: string = "http://localhost:3000/alunos";

  constructor(private http: HttpClient) { }

  getAll() : Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.url);
  }

  salvar(aluno: Aluno) : Observable<Aluno> {
    return this.http.post<Aluno>(`${this.url}`, aluno)
  }

  apagar(aluno: Aluno) : Observable<Aluno> {
    return this.http.delete<Aluno>(`${this.url}/${aluno.id}`)
  }

  editar(aluno: Aluno) : Observable<Aluno> {
    return this.http.put<Aluno>(`${this.url}/${aluno.id}`, aluno)
  }
}
