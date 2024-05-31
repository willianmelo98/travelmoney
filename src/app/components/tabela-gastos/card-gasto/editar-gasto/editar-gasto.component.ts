import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Gasto } from 'src/app/model/gasto';
import { Viagem } from 'src/app/model/viagem';
import { GastoService } from 'src/app/service/gasto.service';
import { ViagemService } from 'src/app/service/viagem.service';

@Component({
  selector: 'app-editar-gasto',
  templateUrl: './editar-gasto.component.html',
  styleUrls: ['./editar-gasto.component.css']
})
export class EditarGastoComponent implements OnInit {
  formGasto: FormGroup;
  gasto: Gasto;
  labelButton: string;
  mensagem: string;
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
  id: any;
  edit: boolean;

  constructor( public dialogRef: MatDialogRef<EditarGastoComponent>,@Inject(MAT_DIALOG_DATA) public data:Gasto,private form: FormBuilder, private gastoService: GastoService, private viagemService: ViagemService, private route: ActivatedRoute) { }

  viagemObjeto: Viagem


  initForm() {
    this.formGasto = this.form.group({
      item: ['', Validators.required],
      preco: [null, Validators.required],
      categoria: ['', Validators.required],
      tipoPagamento: ['', Validators.required],

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
    this.labelButton = 'Atualizar';

    this.editProject(this.data);
    this.edit = true;

  }
  salvarGasto() {
    if (this.formGasto.invalid) {
      this.mensagem = `Verifique os campo sobrigatórios!`
      return;
    }
    this.gasto = this.formGasto.value;
    this.gasto.uid = "teste"
    this.gasto.idgasto = this.data.idgasto
    if (!this.edit) {
      this.gastoService.salvar(this.gasto)
        .then(() => {
          this.mensagem = `Projeto Salvo com sucesso!`;
          this.formGasto.reset();

        })
        .catch((erro) => { this.mensagem = `Erro ao salvar o projeto: ${erro}` })
    } else {
      this.gasto.idgasto = this.data.idgasto;
      this.gastoService.update(this.gasto)
        .then(() => {
          this.mensagem = `Projeto Atulizado com sucesso!`;
          this.formGasto.reset();
          this.labelButton = 'Salvar'
          this.onNoClick();


        })
        .catch((erro) => { this.mensagem = `Erro ao atualizar o projeto: ${erro}` })
    }

  }




  editProject(data: Gasto) {
    this.labelButton = 'Atualizar';
    this.lugar = data.lugar;
    this.formGasto.controls['item'].setValue(data.item);
    this.formGasto.controls['categoria'].setValue(data.categoria);
    this.formGasto.controls['preco'].setValue(data.preco);
    this.formGasto.controls['tipoPagamento'].setValue(data.tipoPagamento);


  }





  onNoClick(): void {

    setTimeout(() => {
      this.dialogRef.close();

    }, 2000);

  }



}
