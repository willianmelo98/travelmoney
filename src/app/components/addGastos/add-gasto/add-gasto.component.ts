import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Gasto } from 'src/app/model/gasto';
import { User } from 'src/app/model/user';
import { Viagem } from 'src/app/model/viagem';
import { GastoService } from 'src/app/service/gasto.service';
import { ViagemService } from 'src/app/service/viagem.service';

@Component({
  selector: 'app-add-gasto',
  templateUrl: './add-gasto.component.html',
  styleUrls: ['./add-gasto.component.css']
})
export class AddGastoComponent implements OnInit {
  formGasto: FormGroup;
  gasto: Gasto;
  labelButton: string;
  mensagem: string;
  categoria: string;
  lugar: string;
  idviagem: string;
  urlIconCartaopay: String = 'https://firebasestorage.googleapis.com/v0/b/travel-money-app.appspot.com/o/categoria%2Ficons8-debit-card-40.png?alt=media&token=e89a3e76-1faa-4831-8b0b-b14c9566cbd4'
  urlIconMoney: String = 'https://firebasestorage.googleapis.com/v0/b/travel-money-app.appspot.com/o/categoria%2Ficons8-money-40.png?alt=media&token=ce8ae375-e07e-4759-8919-40d984dfafbd'
  urlIconRestaurante: String = 'https://firebasestorage.googleapis.com/v0/b/travel-money-app.appspot.com/o/categoria%2Frestaurante.png?alt=media&token=3f84ee93-7995-464e-bd3b-5d416e1ad299'
  urlIconPassagens: String = 'https://firebasestorage.googleapis.com/v0/b/travel-money-app.appspot.com/o/categoria%2Ficons8-taxi-40.png?alt=media&token=05cfe876-7e4a-41f5-bb15-f7abad160803'
  urlIconMercado: String = 'https://firebasestorage.googleapis.com/v0/b/travel-money-app.appspot.com/o/categoria%2Ficons8-paid-40.png?alt=media&token=368e137b-b1a9-499d-9ab5-4d680f18f19a'
  urlIconNote: String = 'https://firebasestorage.googleapis.com/v0/b/travel-money-app.appspot.com/o/categoria%2Ficons8-note-40.png?alt=media&token=22c034ca-3abd-4baa-86c9-289bcb893f34'
  urlIconEstadia: String = 'https://firebasestorage.googleapis.com/v0/b/travel-money-app.appspot.com/o/categoria%2Ficons8-camping-tent-40.png?alt=media&token=74bc9eb5-9eaf-48d3-9646-23b725d9d603'
  urlIconCafe: String = 'https://firebasestorage.googleapis.com/v0/b/travel-money-app.appspot.com/o/categoria%2Ficons8-cafe-40.png?alt=media&token=2ad61486-f436-400d-9ad4-1d831b53f4a9'

  constructor(private form: FormBuilder, private gastoService: GastoService, private viagemService: ViagemService, private route: ActivatedRoute) { }

  viagemObjeto: Viagem


  initForm() {
    this.formGasto = this.form.group({
      item: ['', Validators.required],
      preco: [null, Validators.required],
      tipoPagamento: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }
  ngOnInit(): void {


    this.route.params.subscribe(parametros => {
      if (parametros['idviagem']) {
        this.idviagem = parametros['idviagem'];
        this.lugar = parametros['lugar']

      }
    });

    this.initForm();
    this.gasto = new Gasto();
    this.labelButton = 'Salvar'

  }
  get usuario(): User {
    const user = JSON.parse(localStorage.getItem('user'));
    return user
  }


  salvarGasto() {
    if (this.formGasto.invalid) {
      this.mensagem = `Verifique os campo sobrigatórios!`
      return;
    }

    this.gasto = this.formGasto.value;
    this.gasto.lugar = this.lugar
    this.gasto.idviagem = this.idviagem

    this.gasto.uid = this.usuario.uid;
    this.gastoService.salvar(this.gasto)
      .then(() => {
        this.mensagem = `Seu gasto foi adicionado.`;

      })
      .catch((erro) => { this.mensagem = `Erro ao salvar o projeto: ${erro}` })

  }






}
