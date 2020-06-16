
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

import { Livro } from './../../../shared/models/livro.model';
import { ErrorService } from './../../../shared/services/error.service';
import { LivroService } from './../livro.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-ivro-main',
  templateUrl: './livro-main.component.html'
})
export class LivroMainComponent implements OnInit {

  livros: Livro[];
  livro: Livro

  cols: any[];
  display: boolean = false

  msgContent: string
  tituloPagina: string = 'Livros'

  @ViewChild("livroForm", { static: false })
  livroForm: NgForm

  displayDialog: boolean = false
  headerModal: string = ''

  constructor(
    private livroService: LivroService,
    private errorService: ErrorService,
    private confirmationService: ConfirmationService,
    private toasty: MessageService) { }

  ngOnInit() {
    this.livro = new Livro
    this.cols = [
      { field: 'titulo', header: 'Título' },
      { field: 'autor', header: 'Autor' },
      { field: 'editora', header: 'Editora' },
      { field: 'area', header: 'Área' }
    ];
    this.listarLivros()
  }

  /**
 * Lista todas as propriedades existentes
 */
  listarLivros() {
    this.livroService.listar().pipe(
      take(1)
    ).subscribe((livros) => {
      this.livros = livros;
    }, err => {
      this.errorService.handle(err)
    })
  }


  /**
* Exibe a confirmação de exclusão, se sim, exclui
*/
  excluirLivro(livro: Livro) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir?',
      accept: () => {
        this.excluir(livro.id);
      }
    })
  }
  /**
  * Envia comando para o service para remover uma propriedade
  * @param id 
  */
  excluir(id: number) {
    this.livroService.excluir(id).pipe(
      take(1))
      .subscribe(() => {
        this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `Exclusão Realizada` });
        this.listarLivros();
      })

  }

  /**
  * preparar insersão de item na lista de item
  */
  prepararIncersaoItem() {
    this.livro = new Livro
    this.livroForm.reset()
    this.headerModal = "Inserir Livro"
    this.displayDialog = true
  }


  /**
  * Envia para o service para realizar o salvamento ou atualização da entidade
  */
  salvarLivro() {
    this.livroService.salvar(this.livro).pipe(
      take(1),
    ).subscribe(() => {
      this.toasty.add({ severity: 'success', summary: 'Sucesso', detail: `A livro foi salvo` });
      this.listarLivros()
      this.displayDialog = false
    }, err => {
      this.errorService.handle(err)
    })

  }

  /**
  * edita item selecionaado da listagem
  */
  editarLivro(livro: Livro) {
    this.livro = { ...livro };
    this.headerModal = "Editar Livro"
    this.displayDialog = true
  }

  /**
  * cancela inserção ou edição no dialog
  */
  cancelar() {
    this.livroForm.reset()
    this.displayDialog = false
  }


  /**
   * carrega objeto em coluna de tabela
   */
  carregarObjetoColuna(row: any, col: any): any {
    const nestedProperties: string[] = col.field.split('.');
    let value: any = row;
    for (const prop of nestedProperties) {
      value = value[prop];
    }
    return value;
  }

}
