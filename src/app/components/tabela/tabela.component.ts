import { Component } from '@angular/core';
import { FormularioComponent } from "../formulario/formulario.component";
import { AlunosService } from '../../services/alunos.service';
import { Aluno } from '../../models/aluno';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MediaPipe } from '../../media.pipe';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [FormularioComponent, NgFor, HttpClientModule, MediaPipe],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent {

  exibirTabela: boolean = true;
  alunos: Aluno[] = [];
  aluno!: Aluno;

  constructor(private service: AlunosService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((dado) => {
      this.alunos = dado;
    })
  }

  exibirFormulario() {
    this.exibirTabela = false;
  }

  voltarTabela() {
    this.exibirTabela = true;
  }

  addAluno(aluno: Aluno) {
    this.service.salvar(aluno).subscribe((aluno) => {
      this.alunos.push(aluno);
      this.voltarTabela();
    });
  }

  apagar(aluno: Aluno) {
    this.service.apagar(aluno).subscribe((aluno) => {
      this.alunos = this.alunos.filter((a) => a.id != aluno.id)
    });
  }

  abrirFormulario(aluno: Aluno) {
    this.aluno = aluno;
    this.exibirFormulario();
  }

  atualizarAluno(aluno: Aluno) {
    this.service.editar(aluno).subscribe((aluno) => {
      this.alunos = this.alunos.map((a) => {
        if(a.id == aluno.id) {
          return aluno;
        }
        return a;
      })
    });
    this.voltarTabela();
  }
}
