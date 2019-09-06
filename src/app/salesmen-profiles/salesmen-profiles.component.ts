import { AfterViewInit,Component, OnInit,OnDestroy,ViewChild,ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ApiService } from '../api.service';
import { Salesmen } from  '../salesmen';
import { Router } from '@angular/router';
import { FormBuilder,Validators,FormGroup  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-salesmen-profiles',
  templateUrl: './salesmen-profiles.component.html',
  styleUrls: ['./salesmen-profiles.component.css']
})
export class SalesmenProfilesComponent implements OnDestroy,OnInit,AfterViewInit {
  @ViewChild('sname', {static: false}) sName:ElementRef;
  @ViewChild(DataTableDirective, {static: false})

  datatableElement: DataTableDirective;
  profiles:  Salesmen[] = [];
  dtOptions: DataTables.Settings = {};
  subject: Subject<Object>;
  contenteditable:boolean[];

  salesmenForm: FormGroup;
  insertSalesmenForm:FormGroup;
  constructor(private apiService: ApiService,private router:Router,private toastr: ToastrService,private fb: FormBuilder) {
    this.subject=new Subject();
   }

  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };

    this.apiService.readSalesmenProfiles()
    .subscribe((profile:Salesmen[]) => {
      this.profiles = profile;
       // Calling the DT trigger to manually render the table
       this.subject.next();
      this.contenteditable = Array(this.profiles.length);
    });

     //reactive form declaration
  this.salesmenForm = this.fb.group({
    id:  ['',Validators.required],
    name:  ['',Validators.required],
    mobile:  ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]*")]],
    email:  ['',Validators.required],
    area:  ['',Validators.required],
    active:  ['',Validators.required],
  });

  //reactive form declaration
  this.insertSalesmenForm = this.fb.group({
    name:  ['',Validators.required],
    mobile:  ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]*")]],
    email:  ['',Validators.required],
    area:  ['',Validators.required],
  });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.subject.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      destroy:true,
      pageLength: 5,
    };
    this.apiService.readSalesmenProfiles()
      .subscribe((persons:any) => {
         this.subject.next();
         this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.columns().every(function () {
              const that = this;
              $('input', this.footer()).on('keyup change', function () {
                  console.log('search(): ' + that.search());
                  console.log('value: ' + this['value']);
                  if (that.search() !== this['value']) {
                      that.search(this['value'])
                          .draw();
                  }
              });
          });
         });
      });
  }
  //edit table
  editSalesmen(ind,profile){
    console.log(profile);
    this.contenteditable[ind] = !this.contenteditable[ind];
    if(this.contenteditable[ind]){
      setTimeout(()=> {
        this.sName.nativeElement.focus();
    }, 0);     
    }
    this.salesmenForm.patchValue({'id':profile['id']});
    this.salesmenForm.patchValue({'name':profile['name']});
    this.salesmenForm.patchValue({'email':profile['email']});
    this.salesmenForm.patchValue({'area':profile['area']});
    this.salesmenForm.patchValue({'mobile':profile['mobile']});
    this.salesmenForm.patchValue({'active':profile['active']});

  }

   //edit table
   onRowClick(event, id){
    if(id=='name'){
      this.salesmenForm.patchValue({'name':event.target.outerText});
    }
    if(id=='email'){
      this.salesmenForm.patchValue({'email':event.target.outerText});
    }
    if(id=='mobile'){
      this.salesmenForm.patchValue({'mobile':event.target.outerText});
    }
    if(id=='area'){
      this.salesmenForm.patchValue({'area':event.target.outerText});
    }
  }

  //save table
  saveSalesmen(id){
    this.contenteditable[id] = !this.contenteditable[id];
    this.apiService.editSalesmenProfile(this.salesmenForm.value).subscribe((res)=>{
      console.log(res);
      console.log("updated");
      this.toastr.success('Salesmen Profile Updated', 'Success!', {timeOut: 3000});
    });
    console.log(this.salesmenForm.value);
  }

  statusChange(prof,i){
    var stat = 1 - parseInt(prof['active']);
    this.profiles[i].active = stat;
    this.salesmenForm.patchValue({'id':prof['id']});
    this.salesmenForm.patchValue({'active':stat});
    console.log(prof);
  }

   // convenience getter for easy access to form fields
   get f() {
    return this.insertSalesmenForm.controls;
  }

  //error class
  displayCssFor(field: string|Array<string>) {
    return (this.insertSalesmenForm.get(field).invalid && (this.insertSalesmenForm.get(field).touched || this.insertSalesmenForm.get(field).dirty) ) ? true : '';
  }


  onSubmit(){
    console.log(this.insertSalesmenForm.value);
    this.apiService.insertSalesmenProfile(this.insertSalesmenForm.value).subscribe((res)=>{
      console.log(res);
      console.log("submitted");
      this.insertSalesmenForm.reset();
      this.toastr.success('Salesman Profile Added', 'Success!', {timeOut: 1000}).onHidden.subscribe(()=>{
        location.reload();
      });
    });
  }
}
