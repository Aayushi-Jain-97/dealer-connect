import { AfterViewInit,Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ApiService } from '../api.service';
import { Profile } from  '../profile';
import { FormBuilder,Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})

export class ProfilesComponent implements OnDestroy,OnInit,AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;
  profiles:  Profile[] = [];
  salesman=[];
  depot=[];
  route=[];
  routes=[];
  showRoute=false;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  subject: Subject<Object>;
  
  //reactive form declaration
  dealerForm = this.fb.group({
    dealer_owner_name:  [''],
    dealer_firm_name:  ['',Validators.required],
    kaveri_code:  ['',[Validators.required,Validators.pattern("[0-9]*")]],
    kaveri_brands:  ['',Validators.required],
    mobile:  ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]*")]],
    email:  [''],
    ship_to_address:  ['',Validators.required],
    bill_to_address:  [''],
    location:  ['',Validators.required],
    salesman_id:  ['',Validators.required],
    depot_id:  ['',Validators.required],
    route_id:  ['',Validators.required],
    route_name: [{value:'',disabled: true}]
  });

  constructor(private apiService: ApiService,private fb: FormBuilder,private router:Router,private toastr: ToastrService) {
    this.subject=new Subject();
   }

  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };

    this.fetchProfiles();

    this.apiService.selectSalesman().subscribe((salesman:any)=>{
      this.salesman=salesman;
    });
    this.apiService.selectDepot().subscribe((depot:any)=>{
      this.depot=depot;
    });
    this.apiService.selectRoute().subscribe((route:any)=>{
      this.routes=route;
    });
  }

  fetchProfiles(){
    this.apiService.readProfiles()
    .subscribe((profile:Profile[]) => {
      this.profiles = profile;
      // // Calling the DT trigger to manually render the table
       this.subject.next();
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
    this.apiService.readProfiles()
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

  // convenience getter for easy access to form fields
  get f() {
    return this.dealerForm.controls;
  }

  //error class
  displayCssFor(field: string|Array<string>) {
    return (this.dealerForm.get(field).invalid && (this.dealerForm.get(field).touched || this.dealerForm.get(field).dirty) ) ? true : '';
  }

  //to get the route belonging to the depot 
  getRoute(){
    this.showRoute=true;
    this.route=[];
    this.dealerForm.patchValue({route_name:''});    
    this.routes.forEach(element => {
      if(element['depot_id']==this.dealerForm.get('depot_id').value){
        this.route.push(element);
      }
    });
  }

  //select the route name 
  setRoute(){
    this.route.forEach(element => {
      if(element.id==this.dealerForm.get('route_id').value)
      this.dealerForm.patchValue({route_name:element.name});
    });
  }

  //when the form is submitted
  onSubmit(){
    console.log(this.dealerForm.value);
    this.apiService.insertDealer(this.dealerForm.value).subscribe((res)=>{
      console.log(res);
      console.log("submitted");
      this.dealerForm.reset();
      this.toastr.success('Dealer Profile Added', 'Success!', {timeOut: 1000}).onHidden.subscribe(()=>{
        location.reload();
      });
    });
  }
}
