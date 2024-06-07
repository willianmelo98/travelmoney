import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Viagem } from '../model/viagem';

@Injectable({
  providedIn: 'root'
})
export class ViagemService {
  projectCol: AngularFirestoreCollection<Viagem>;

  viagemObjeto: Viagem
  constructor(private storage: AngularFirestore, private router: Router) {

    this.projectCol = storage.collection<Viagem>('viagem')
   }


  setViagem(viagem) {
   return  this.viagemObjeto = viagem;

    }
    getViagemObjeto() {
    return this.viagemObjeto;
    }


    getViagem(viagem): Observable<Viagem[]>{


      return this.storage.collection<Viagem>("viagem", ref =>

      ref.where("idviagem", "==",viagem)).valueChanges();


   }


  get usuario(): User {
    const user = JSON.parse(localStorage.getItem('user'));
    return user
  }

   getAllViagens(): Observable<Viagem[]> {
    return this.storage.collection<Viagem>('viagem', ref =>
      ref.where('uid', '==', this.usuario.uid))
      .valueChanges();
  }


  salvar(viagem: Viagem): Promise<void> {
    viagem.data = new Date();
    return this.projectCol.add(Object.assign({}, viagem)).then(objeto => {
      viagem.idviagem = objeto.id
      this.update(viagem)
    })
  }


  update(viagem: Viagem): Promise<void> {
    return this.projectCol.doc(viagem.idviagem)
      .update(Object.assign({}, viagem))
  }

  delete(viagem: Viagem): Promise<void> {
    return this.projectCol.doc(viagem.idviagem)
      .delete()
  }

}

