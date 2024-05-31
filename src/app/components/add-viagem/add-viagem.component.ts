import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { Viagem } from 'src/app/model/viagem';
import { ViagemService } from 'src/app/service/viagem.service';

@Component({
  selector: 'app-add-viagem',
  templateUrl: './add-viagem.component.html',
  styleUrls: ['./add-viagem.component.css']
})
export class AddViagemComponent implements OnInit {
  formCriaViagem: FormGroup;

  labelButton: string;
  mensagem: string;
  viagem: Viagem;
  constructor( private form: FormBuilder,private viagemService: ViagemService) { }

  ngOnInit(): void {
    this.initForm();
    this.viagem = new Viagem();
    this.labelButton = 'Salvar';
  }

  initForm() {
    this.formCriaViagem = this.form.group({
      lugar: ['', Validators.required],
      orcamento: [0, Validators.required],
    });
  }

  get usuario(): User {
    const user = JSON.parse(localStorage.getItem('user'));
    return user
  }

  salvarViagem() {
    if (this.formCriaViagem.invalid) {
      this.mensagem = `Verifique os campo sobrigatórios!`
      return;
    }

    this.viagem = this.formCriaViagem.value;


    this.viagem.uid = this.usuario.uid;
    this.viagemService.salvar(this.viagem)
      .then(() => {
        this.mensagem = `Salvo com sucesso!`;
        this.formCriaViagem.reset();

      })
      .catch((erro) => { this.mensagem = `Erro ao salvar o viagem: ${erro}` })

  }



}
