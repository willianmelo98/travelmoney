import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditarGastoComponent } from 'src/app/components/tabela-gastos/card-gasto/editar-gasto/editar-gasto.component';
import { Gasto } from 'src/app/model/gasto';
import { Viagem } from 'src/app/model/viagem';
import { ViagemService } from 'src/app/service/viagem.service';
import { BoasVindasComponent } from '../boas-vindas/boas-vindas.component';

@Component({
  selector: 'app-editar-viagem',
  templateUrl: './editar-viagem.component.html',
  styleUrls: ['./editar-viagem.component.css']
})
export class EditarViagemComponent implements OnInit {
  formAtualizarViagem: FormGroup
  viagem: Viagem
  edit: boolean;
  labelButton: string;
  mensagem: string;

  constructor(private viagemService: ViagemService,private form: FormBuilder,public dialogRef: MatDialogRef<BoasVindasComponent>,@Inject(MAT_DIALOG_DATA) public data:Viagem) { }

  ngOnInit(): void {
    this.initForm();
    this.viagem = new Viagem();
    this.labelButton = 'Atualizar';

    this.editProject(this.data);
    this.edit = true;

  }

  initForm() {
    this.formAtualizarViagem = this.form.group({
      lugar: ['', Validators.required],
      orcamento: [0, Validators.required],
    });

}


salvarViagem() {
  if (this.formAtualizarViagem.invalid) {
    this.mensagem = `Verifique os campo sobrigatórios!`
    return;
  }
  this.viagem = this.formAtualizarViagem.value;
  this.viagem.idviagem = this.data.idviagem
  if (!this.edit) {
    this.viagemService.salvar(this.viagem)
      .then(() => {
        this.mensagem = `Viagem Salva com sucesso!`;
        this.formAtualizarViagem.reset();

      })
      .catch((erro) => { this.mensagem = `Erro ao salvar o Viagem: ${erro}` })
  } else {
    this.viagem.idviagem = this.data.idviagem;
    this.viagemService.update(this.viagem)
      .then(() => {
        this.mensagem = `Viagem Atulizada com sucesso!`;
        this.formAtualizarViagem.reset();
        this.labelButton = 'Salvar'
        this.onNoClick();


      })
      .catch((erro) => { this.mensagem = `Erro ao atualizar a viagem: ${erro}` })
  }

}




editProject(data: Viagem) {
  this.labelButton = 'Atualizar';
  this.formAtualizarViagem.controls['orcamento'].setValue(data.orcamento);
  this.formAtualizarViagem.controls['lugar'].setValue(data.lugar);


}





onNoClick(): void {

  setTimeout(() => {
    this.dialogRef.close();


  }, 2000);

}


}
