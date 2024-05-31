import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Gasto } from '../model/gasto';
import { Viagem } from '../model/viagem';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  projectCol: AngularFirestoreCollection<Gasto>;


  constructor(private storage: AngularFirestore) {

    this.projectCol = storage.collection<Gasto>('gasto')


   }



   getGasto(viagem): Observable<Gasto[]>{

    return this.storage.collection<Gasto>("gasto", ref =>

    ref.where("idviagem", "==",viagem)).valueChanges();

 }

 getAllGastos(): Observable<Gasto[]> {
  return this.storage.collection<Gasto>('gasto', ref =>
    ref.orderBy('data','desc'))
    .valueChanges();
}


  salvar(gasto: Gasto): Promise<void> {
    gasto.data = new Date()
    return this.projectCol.add(Object.assign({}, gasto)).then(objeto => {
      gasto.idgasto = objeto.id
      this.update(gasto)
    })
  }





  update(gasto: Gasto): Promise<void> {
    return this.projectCol.doc(gasto.idgasto)
      .update(Object.assign({},gasto))
  }

  delete(gasto: Gasto): Promise<void> {
    return this.projectCol.doc(gasto.idgasto)
      .delete()
  }

}

