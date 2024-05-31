import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Viagem } from 'src/app/model/viagem';
import { ViagemService } from 'src/app/service/viagem.service';
import { EditarViagemComponent } from '../editar-viagem/editar-viagem.component';

@Component({
  selector: 'app-boas-vindas',
  templateUrl: './boas-vindas.component.html',
  styleUrls: ['./boas-vindas.component.css']
})
export class BoasVindasComponent implements OnInit {
  viagem: Observable<Viagem[]>
  messages: string;

  constructor(public dialog: MatDialog,public serviceViagem: ViagemService) { }

  ngOnInit(): void {
    this.viagem = this.serviceViagem.getAllViagens();

  }

  editarViagem(item: Viagem){
    this.dialog.open(EditarViagemComponent,{
      data:{
         orcamento: item.orcamento, idviagem: item.idviagem, lugar: item.lugar,
      },width:'100%',height:"85vh", maxWidth:'98vw'
    });
  }
  deletarViagem(item: Viagem) {
    this.serviceViagem.delete(item)
      .then(() => {
        this.messages = `Viagem Excluída com sucesso !`;

      })
      .catch((erro) => { this.messages = `Erro ao excluir o projeto: ${erro}` })

  }

}
