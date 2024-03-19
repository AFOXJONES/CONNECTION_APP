import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioPostService {

  private backURL="https://special-happiness-wq6j67vq666fvgrw-8080.app.github.dev";


  constructor(private http: HttpClient) { }

  

  //listaData es un array que admite cualquier tipo, y devuelve un objeto observable que emite cualquier tipo de dato
  enviarListaJson(listaData: any[]): Observable<any>{
    //Utiliza HttpClient para realizar solicitud POST al servidor enviando unos datos (listData)
    //<any> especifica que el tipo de respuesta esperada del servidor puede devolver cuyalquier tipo de dato
    return this.http.post<any>('http://localhost:8080/api/connection_record/insertMany',listaData);
  }
}
