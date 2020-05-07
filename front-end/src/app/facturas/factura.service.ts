import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Factura } from './clases/factura'

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private URL = 'http://localhost:3000'

  constructor(
    private _http: HttpClient
  ) { }

  crear(factura: Factura){
    return this._http.post(`${this.URL}/facturas`, factura);
  }
  
  editar(factura: Factura){
    return this._http.put(`${this.URL}/facturas/${factura._id}`, factura);
  }

  borrar(factura: Factura){
    return this._http.delete(`${this.URL}/facturas/${factura._id}`);
  }

  listar(){
    return this._http.get(`${this.URL}/facturas`);
  }

  verDetalle(id: Number){
    return this._http.get(`${this.URL}/facturas/${id}`);
  }

}