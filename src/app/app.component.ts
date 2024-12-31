import { Component } from '@angular/core';
import { TabelaComponent } from "./components/tabela/tabela.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ TabelaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'curso-ralf-lima';
}
