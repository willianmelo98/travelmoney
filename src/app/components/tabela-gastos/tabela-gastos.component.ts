import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Gasto } from 'src/app/model/gasto';
import { Viagem } from 'src/app/model/viagem';
import { GastoService } from 'src/app/service/gasto.service';
import { ViagemService } from 'src/app/service/viagem.service';

@Component({
  selector: 'app-tabela-gastos',
  templateUrl: './tabela-gastos.component.html',
  styleUrls: ['./tabela-gastos.component.css']
})
export class TabelaGastosComponent implements OnInit {


  gasto: Observable<Gasto[]>;
  viagem: Observable<Viagem[]>;
  viagemObjeto: Viagem;
  listaParaSomarCusto: Gasto [];
  paraOrcamento: Viagem [];

  constructor(public gastoService: GastoService, public viagemService: ViagemService, private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.route.params.subscribe(parametros => {
      if (parametros['id']) {
        let id = parametros['id'];

        this.gasto = this.gastoService.getGasto(id);
        this.viagem = this.viagemService.getViagem(id);
        this.gasto.subscribe((lista) => {
          this.listaParaSomarCusto = lista;
        })

        this.viagem.subscribe((lista) => {
          this.paraOrcamento = lista;
        })




      }
    });




  }

  getTotalCost() {
    return this.listaParaSomarCusto.map(t => t.preco).reduce((acc, value) => acc + value, 0);
  }

  getOrcamento() {

    const a = this.paraOrcamento.map(t => t.orcamento).reduce((acc, value) => acc + value, 0);
    const b = this.listaParaSomarCusto.map(t => t.preco).reduce((acc, value) => acc + value, 0);
    return a - b
  }

}
