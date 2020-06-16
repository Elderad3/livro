import { SharedModule } from './../../../shared/shared.module';
import { LivroMainRoutingModule } from './livro-main-routing.module';
import { LivroMainComponent } from './livro-main.component';

import { CommonModule } from '@angular/common';
import { CoreModule } from './../../../core/core.module';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [LivroMainComponent],
  imports: [CommonModule, LivroMainRoutingModule, CoreModule, SharedModule, ButtonModule, TableModule, DialogModule, ConfirmDialogModule, InputTextModule, ToastModule, DropdownModule],
  exports: [LivroMainComponent],
  providers: [ConfirmationService, MessageService]
})
export class LivroMainModule { }
