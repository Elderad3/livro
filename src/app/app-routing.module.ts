
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const ROUTES: Routes = [

  { path: '', redirectTo: '/livroMain', pathMatch: 'full' },
  { path: 'livroMain', loadChildren: () => import('./pages/livro/livro-main/livro-main.module').then(m => m.LivroMainModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
