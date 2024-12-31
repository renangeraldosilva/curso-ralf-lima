import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Aluno } from '../../models/aluno';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  @Output() voltarTabela = new EventEmitter();
  @Output() adicionarAluno = new EventEmitter();
  @Output() atualizarAluno = new EventEmitter();
  @Input() aluno: Aluno | undefined;
  formularioAluno!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formularioAluno = this.formBuilder.group({
      id: [null],
      nome: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/)]],
      nota1: [null, [Validators.required, Validators.pattern(/^(10|[0-9](\.\d{1,2})?)$/)]],
      nota2: [null, [Validators.required, Validators.pattern(/^(10|[0-9](\.\d{1,2})?)$/)]]
    })
    this.preencherFormulario();
  }

  preencherFormulario() {
    this.formularioAluno.patchValue({
      id: this.aluno?.id,
      nome: this.aluno?.nome,
      nota1: this.aluno?.nota1,
      nota2: this.aluno?.nota2
    })
  }

  voltar() {
    this.voltarTabela.emit();
  }

  salvar() {
    const novoAluno = this.formularioAluno.getRawValue();

    if(this.aluno?.id) {
      this.atualizarAluno.emit(novoAluno);
    } else {
      this.adicionarAluno.emit(novoAluno);
    }
  }

}
