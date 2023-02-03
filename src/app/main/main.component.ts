import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { UserName?: string; Password?: string; Permission?: string}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('Items');
    // .valueChanges() is simple. It just returns the 
    // JSON data without metadata. If you need the 
    // doc.id() in the value you must persist it your self
    // or use .snapshotChanges() instead. Only using for versions 7 and earlier
    
    
    //this.items = this.itemsCollection.valueChanges();
    this.items = this.itemsCollection.valueChanges( { idField: 'id1' }); //chỉ sử dụng cho version mới nhất Angular 8,9
    //id1: ten field đại diện cho documnent id, lưu ý không 
    //được đặt trùng với tên field khai báo trong dữ liệu
   
    this.items.subscribe(data=>{console.log(data)})
    }

  ngOnInit(): void {
  }
  
  add (UserName:string="admin", Password:string="admin",Permission:"admin"){
    let it : Item = {};
    it.UserName=UserName
    it.Password = Password
    it.Permission = Permission

    let docid = "id1";
	// tạo docid bằng AngularFirestore
	  const id = this.afs.createId();

    //this.itemsCollection.add(it);//thêm với docid tự động tạo
    
    //them vao itemsCollection với docid cụ thể
    this.itemsCollection.doc(docid).set(Object.assign({}, it));//Object.assign({} khong co lenh nay thi se khong them vao firebase duoc
  }
  // update(id:string="update id", name:string="update item"){
  //   let docId = "CqYQLKslXW6EJ2W1QIbb"
  //   let it : Item = {};
  //   it.id=id
  //   it.name = name

  //   this.itemsCollection.doc(docId).update(it);
  // }
  // delete(docId = "CqYQLKslXW6EJ2W1QIbb"){
  //      this.itemsCollection.doc(docId).delete();
  // }

}
