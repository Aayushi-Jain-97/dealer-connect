import { AfterViewInit,Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { map } from 'rxjs/operators';

class Person {
  userId:number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-dealer-orders',
  templateUrl: './dealer-orders.component.html',
  styleUrls: ['./dealer-orders.component.css']
})
export class DealerOrdersComponent implements OnDestroy,OnInit,AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  persons: Person[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering

  subject: Subject<Object>;
  constructor(private http: HttpClient) {
    this.subject=new Subject();
   }

  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
    };
    this.http.get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((persons:any) => {
        this.persons = persons;
        // // Calling the DT trigger to manually render the table
         this.subject.next();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.subject.unsubscribe();
  }

  ngAfterViewInit(): void {
    // this.datatableElement.dtInstance.then(function(dtInstance: DataTables.Api) {
    //   dtInstance.columns().every(function () {
    //     const that = this;
    //     $('input', this.footer()).on('keyup change', function () {
    //       if (that.search() !== this['value']) {
    //         that
    //           .search(this['value'])
    //           .draw();
    //       }
    //     });
    //   });
    // });
  }
}
