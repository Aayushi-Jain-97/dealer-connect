import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Feedback} from '../feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;
  feedback :Feedback[]= [];
  details=[];
  showModal=false;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  subject: Subject<Object>;
  

  constructor(private apiService: ApiService,private router:Router,private toastr: ToastrService) {
    this.subject=new Subject();
   }

  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };

    this.apiService.getFeedback()
    .subscribe((fb:Feedback[]) => {
      this.feedback = fb;
      // // Calling the DT trigger to manually render the table
       this.subject.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.subject.unsubscribe();
  }

  //when the form is submitted
  getDealerDetail(id){
    this.showModal=false;
    this.details=[];
    this.feedback.forEach(element => {
      if(element['id'] == id){
        this.details.push({"dealer_id":element["dealer_id"],"kaveri_code":element["kaveri_code"],"location":element["location"],"bill_to_address":element["bill_to_address"],"mobile":element["mobile"],"dealer_firm_name":element['dealer_firm_name']});
        this.showModal=true;
      }
    });
  }
}
