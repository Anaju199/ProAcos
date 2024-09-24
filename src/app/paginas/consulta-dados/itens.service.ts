import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Itens } from './Itens';

@Injectable({
  providedIn: 'root'
})
export class ItensService {
  private readonly API = environment.apiUrl + '/item_proacos'
  private readonly API_LISTA = environment.apiUrl + '/lista_itens_proacos/'

  constructor(private http: HttpClient) { }

  listar(dataDe: string, dataAte: string): Observable<Itens[]> {

    let params = new HttpParams()
    .set("datalote", dataDe)
    .set("datavenda", dataAte)

    return this.http.get<Itens[]>(this.API_LISTA, {params})
  }
}
