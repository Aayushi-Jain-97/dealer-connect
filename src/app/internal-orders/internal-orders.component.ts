import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient,HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-internal-orders',
  templateUrl: './internal-orders.component.html',
  styleUrls: ['./internal-orders.component.css']
})
export class InternalOrdersComponent implements OnInit {
  constructor(private http: HttpClient){}

  ngOnInit(): void {}
}
