import { Component, OnInit } from '@angular/core';
import { DatabaseService, Dev } from '../services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  developers: Dev[] = [];
  products: Observable<any[]>;
  developer = {};
  product = {};
  selectedView = 'devs';
  constructor(private db: DatabaseService) { }
  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
          console.log(this.developers);
        });
        this.products = this.db.getProducts();
      }
    });
  }
  addDeveloper() {
    let skills = this.developer['skills'].split(',');
    skills = skills.map(skill => skill.trim());
    this.db.addDeveloper(this.developer['name'], skills, this.developer['img'])
    .then(_ => {
      this.developer = {};
      console.log(this.developer);
    });
  }

  addProduct() {
    this.db.addProduct(this.product['name'], this.product['creator'])
    .then(_ => {
      this.product = {};
      console.log(this.developer);
    });
  }
}
