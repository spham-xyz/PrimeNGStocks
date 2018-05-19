import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { QueryFn } from 'angularfire2/firestore/interfaces';
import { Observable } from 'rxjs/Observable';
import { FsStock as Stock } from './fs-stock';


// https://blog.thecodecampus.de/getting-started-firestore-angularfire2/
// https://stackblitz.com/github/biowaffeln/blog-app 
// https://alligator.io/angular/cloud-firestore-angularfire/
// https://github.com/angular/angularfire2

@Injectable()
export class FirestoreService {

  readonly path = 'stocks';
  colRef: AngularFirestoreCollection<Stock>;

  constructor(private afs: AngularFirestore) {
    this.colRef = this.afs.collection<Stock>(this.path);
  }

  getStocks$(ref?: QueryFn): Observable<Stock[]> {
    return this.afs.collection<Stock>(this.path, ref)
      // return this.afs.collection<Stock>(this.path, x => x.orderBy('symbol', 'asc'))
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Stock;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  addStock(stock: any) {
    // Need to remove 'id' property
    this.colRef.add({ symbol: stock.symbol, date: stock.date, price: stock.price })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  updateStock(id: string, stock: any) {
    // https://firebase.google.com/docs/firestore/manage-data/add-data
    // this.colRef.doc(id).set(stock, { merge: true });
    this.colRef.doc(id).update(stock);
  }

  deleteStock(id: string) {
    this.colRef.doc(id).delete();
  }
}
