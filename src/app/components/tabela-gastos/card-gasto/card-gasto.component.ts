import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Gasto } from 'src/app/model/gasto';
import { GastoService } from 'src/app/service/gasto.service';
import {MatDialog} from '@angular/material/dialog';
import { EditarGastoComponent } from './editar-gasto/editar-gasto.component';


@Component({
  selector: 'app-card-gasto',
  templateUrl: './card-gasto.component.html',
  styleUrls: ['./card-gasto.component.css']
})
export class CardGastoComponent implements OnChanges {

  @Input() gasto: Gasto
  imgItemGasto: String;
  itemTitulo: String;
  tipoPagameto: String;
  valorGasto: Number;
  data;
  panelOpenState = false;
  messages: string;


  ngOnChanges(): void {
    this.imgItemGasto= this.gasto.categoria
    this.itemTitulo= this.gasto.item
    this.data =  this.gasto.data
    this.tipoPagameto =  this.gasto.tipoPagamento
    this.valorGasto= this.gasto.preco
  }


  constructor(public GastoService: GastoService, public dialog: MatDialog,
    ) { }

  deletarGasto(item: Gasto) {
    this.GastoService.delete(item)
      .then(() => {
        this.messages = `Viagem Excluída com sucesso !`;

      })
      .catch((erro) => { this.messages = `Erro ao excluir o projeto: ${erro}` })

  }

  editarGasto(item: Gasto){
    this.dialog.open(EditarGastoComponent,{
      data:{
        tipoPagamento:item.tipoPagamento, idgasto: item.idgasto,item:item.item, categoria: item.categoria,preco:item.preco,

      },width:'100%',height:"85vh", maxWidth:'98vw'
    });
  }




}
