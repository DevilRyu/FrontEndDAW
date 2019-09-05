import { Component, OnInit } from '@angular/core';
import { DataApiService } from './../servicios/data-api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ObjetoInterface } from '../models/objeto-interface';
import { HttpClient } from '@angular/common/http';

declare let L;

@Component({
    selector: 'app-informacion-detallada',
    templateUrl: './informacion-detallada.component.html',
    styleUrls: ['./informacion-detallada.component.css']
})
export class InformacionDetalladaComponent implements OnInit {

    objeto: ObjetoInterface = {
        nombre: '',        
        imagen:'',        
        fechaIn: '',
        descripcion: '',
        color: '',
        horaIn: '',
        categoria: 'electronico',
        lugar: ''
    }

    constructor(/*private dataApi: DataApiService,*/ private route:ActivatedRoute,private httpClient:HttpClient) { }

    ngOnInit() {
        

        const objeto_id = this.route.snapshot.params["id"]
        this.getDetalles(objeto_id)

    }

    getDetalles(id:string){

        /*this.dataApi.getObjetoporId(id)
        .suscribe(objeto =>(this.objeto=objeto));*/
        this.httpClient.get(`http://192.168.0.24:3000/api/objetos/${id}`)
        .subscribe(
        (data:any[]) => {
            data.forEach(element => {
                
                this.objeto.nombre=element.nombre;
                this.objeto.imagen=element.imagenO;
                this.objeto.fechaIn=element.fechaRO.substring(0, 10);;
                this.objeto.descripcion=element.descripcion;
                this.objeto.color=element.color;
                this.objeto.horaIn=element.horaRegistro;
                this.objeto.lugar=element.lugar;

            })
            console.log(this.objeto);
        })  
    }

}
