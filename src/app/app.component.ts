import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
export interface Item { UserName: string; Password: string; Permission : string }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'THCNTT3';
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  constructor(private readonly afs: AngularFirestore) {
  this.itemsCollection = afs.collection<Item>('items');
  this.items = this.itemsCollection.valueChanges( { idField: 'id1' });
  //this.items = this.itemsCollection.valueChanges();
  
  // .valueChanges() is simple. It just returns the 
  // JSON data without metadata. If you need the 
  // doc.id() in the value you must persist it your self
  // or use .snapshotChanges() instead. Only using for versions 7 and earlier
      
  
  
   //chỉ sử dụng cho Angular 8,9
  //id1: ten field đại diện cho documnent id, lưu ý không 
  //được đặt trùng với tên field khai báo trong dữ liệu
 
}
}
