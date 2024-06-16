import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GastoService } from '../service/gasto.service';
import { Gasto } from '../model/gasto';
import { ViagemService } from '../service/viagem.service';
import { Viagem } from '../model/viagem';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditarViagemComponent } from './editar-viagem/editar-viagem.component';
import { AuthService } from '../service/auth.service';
import { SetIcons } from 'src/assets/icons/setIcons';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  viagem: Observable<Viagem[]>
  messages: string;
  icons = SetIcons;



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor( public authService: AuthService,public dialog: MatDialog,private breakpointObserver: BreakpointObserver, public serviceViagem: ViagemService,public serviceGasto: GastoService, ) {}

  ngOnInit(): void{
    this.viagem = this.serviceViagem.getAllViagens();
    
    
  }

  atualizaTabela(viagem){
      this.serviceViagem.setViagem(viagem);
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
