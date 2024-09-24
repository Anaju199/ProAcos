import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Resposta } from './questionario';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {
  private readonly API = environment.apiUrl + '/respostas'
  private readonly API_LISTA = environment.apiUrl + '/lista_respostas/'

  constructor(private http: HttpClient) { }

  listar(filtroPesquisa: string, usuario: number): Observable<Resposta[]> {

    let params = new HttpParams()

    if(filtroPesquisa.trim().length > 0){
      params = params.set("nome",filtroPesquisa)
    }

    if(usuario > 0){
      params = params.set("usuario",usuario)
    }

    return this.http.get<Resposta[]>(this.API_LISTA, {params})
  }


  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(resposta: Resposta): Observable<Resposta> {
    const url = `${this.API}/`
    return this.http.post<Resposta>(url, resposta)
  }

  editar(resposta: Resposta): Observable<Resposta> {
    const url = `${this.API}/${resposta.id}/`
    return this.http.put<Resposta>(url, resposta )
  }

  excluir(id: number): Observable<Resposta> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Resposta>(url)
  }

  buscarPorId(id: number): Observable<Resposta> {
    const url = `${this.API}/${id}/`
    return this.http.get<Resposta>(url)
  }
}
