import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';

import { ServicioPostService } from '../servicio-post.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-conexion-cheker',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './conexion-cheker.component.html',
  styleUrl: './conexion-cheker.component.css'
})
export class ConexionChekerComponent implements OnInit {



  //varible que se usa en el front para mostrar o no el texto de conexión
  public netStatus: string | undefined;

  constructor(private servicioPost: ServicioPostService) { }



 

  ngOnInit() {
    fromEvent(window, 'offline').pipe().subscribe((event: Event) => {
        let date: Date = new Date();

        let save= date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() +" - "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

        const status={hayConexion:false, timestampConexion:save};

        localStorage.setItem("DatosEnDesconexion",  JSON.stringify(status));

        this.netStatus = event.type;



        
      });


      fromEvent(window, 'online').pipe().subscribe((event: Event) => {
        console.log(event)
        this.netStatus = event.type;

      
        let date: Date = new Date();

        let save= date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() +" - "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

        const status={hayConexion:true, timestampConexion:save};

        //const status2={Datos:localStorage['Datos']};


          //enviar peticion POST
        localStorage.setItem("DatosEnConexion",JSON.stringify(status));
        //localStorage.setItem("DATA",JSON.stringify(status2));     

        let listaData=[
          JSON.parse(localStorage.getItem("DatosEnDesconexion")!),
          JSON.parse(localStorage.getItem("DatosEnConexion")!)
        ]

       // listaData!= listaData.map(item => item?.replace("'",''));

/*

        const listaData=[
          {"hayConexion":false,"timestampConexion":"14-3-2024 - 12:42:2"}, 
        {"hayConexion":true,"timestampConexion":"14-3-2024 - 12:42:4"}
      ]
*/
        console.log(listaData);
        
       this.servicioPost.enviarListaJson(listaData).subscribe(response => {
        console.log("La respuesta del backend es: ",response);
       }, error => {
        console.error("LA PETICION HA DADO ERROR",error);
       });

      localStorage.clear();

      });
  }



}
