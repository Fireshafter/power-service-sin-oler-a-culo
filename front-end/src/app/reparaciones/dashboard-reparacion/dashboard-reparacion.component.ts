import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReparacionService } from '../reparacion.service';
import { Reparacion } from '../clases/reparacion';
import { identifierModuleUrl, analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-dashboard-reparacion',
  templateUrl: './dashboard-reparacion.component.html',
  styleUrls: ['./dashboard-reparacion.component.scss']
})
export class DashboardReparacionComponent implements OnInit {

  resguardos: Reparacion[];
  ahora: Date;
  ventanaCrear: Boolean = false;

  visiblePages: number[] = [];
  selectedPage: number;
  maxPage: number
  size: any;
  pagsize: number = 24;

  constructor(private _router: Router, private _reparacionService: ReparacionService) { }

  ngOnInit() {
    this.getResguardosCount();
    this.selectedPage = 0;
    this.getResguardos();
    this.ahora = new Date(Date.now());
  }

  verDetalle(id: number){
    this._router.navigate(['reparaciones/detalles', {id: id}])
  }

  cerrarVentana(){
    this.ventanaCrear = false;
  }

  crear(reparacion: Reparacion){

    this._reparacionService.getLast().subscribe(lastorden => {
      console.log(lastorden['error'])
      
      if(!lastorden['error'])
        reparacion.orden = lastorden[0].orden + 1;
            
      this._reparacionService.crear(reparacion).subscribe(resultado =>{
        let id:any = resultado;
        this.verDetalle(id._id);
      })
    })

  }

  getDays(date: any){
    let data = new Date(date)
    let delta = (this.ahora.getTime() - data.getTime()) / 1000 / 60 / 60 / 24;    
    return delta;
  }

  getResguardos() {
    this._reparacionService.listar({pag: this.selectedPage, pagsize: this.pagsize})
      .subscribe(res => {
        this.resguardos = <Reparacion[]>res;
      })
  }

  gotopage(pag: number){    
    this.selectedPage = this.visiblePages[pag]-1;
    this.getResguardos();
  }

  changePag(pagechange: number){
    if(this.selectedPage + pagechange < this.maxPage && this.selectedPage + pagechange > -1)
      this.selectedPage += pagechange;

    if(this.visiblePages[6] < this.selectedPage+1 || this.visiblePages[0] > this.selectedPage+1)
      for(let i=0; i<this.visiblePages.length; i++){
        this.visiblePages[i] += pagechange;
      }
      
    this.getResguardos();
    console.log(this.selectedPage);
  }

  getResguardosCount(){
    this._reparacionService.getSize().subscribe(res =>{
      this.size = res
      this.maxPage = Math.ceil(this.size / this.pagsize);
      
      
      if(this.maxPage > 7)
      this.visiblePages = [1, 2, 3, 4, 5, 6, 7];
      else{
        this.visiblePages = []
        for(let i=0; i<this.maxPage; i++){
          this.visiblePages.push(i+1);
        }
      }
      this.gotopage(0);
    });
  }

}
