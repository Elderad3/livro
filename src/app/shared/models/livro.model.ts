
import { BaseResourceModel } from './base-resource.model';

export class Livro extends BaseResourceModel {
    titulo?: string
    autor?: string;
    editora?: string
    area?: string
}