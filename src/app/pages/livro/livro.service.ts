
import { Observable } from 'rxjs';
import { APP_API } from './../../app.api';
import { Livro } from '../../shared/models/livro.model';

import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class LivroService extends BaseResourceService<Livro> {

  constructor(protected injector: Injector) {
    super(injector, 'livro')
  }
}


