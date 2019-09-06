import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators,FormGroup  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var jQuery:any;
@Component({
  selector: 'app-view-dealer-profile',
  templateUrl: './view-dealer-profile.component.html',
  styleUrls: ['./view-dealer-profile.component.css']
})
export class ViewDealerProfileComponent implements OnInit {
  
  @ViewChild('name', {static: false}) colName:ElementRef;
  contenteditable:boolean = false;
  buttonVal="EDIT"
  profile=[];
  dealer_id;
  id;
  salesman=[];
  depot=[];
  route=[];
  routes=[];
  dealerForm: FormGroup;
  edit='true';
  constructor(private apiService: ApiService,private router:ActivatedRoute,private fb: FormBuilder,private toastr: ToastrService) {
   }

  ngOnInit() {
    this.dealer_id = this.router.params.subscribe(params => {
      this.id = params['id'];
      this.apiService.viewDealer(this.id).subscribe((profile:any)=>{
        console.log(profile);
        this.profile=profile;
        this.dealerForm.patchValue({'salesman_id':profile[0]['salesman_id']});
        this.dealerForm.patchValue({'depot_id':profile[0]['depot_id']});
        this.dealerForm.patchValue({'route_id':profile[0]['route_id']});
        this.dealerForm.patchValue({'kaveri_brands':profile[0]['kaveri_brands']});
        this.dealerForm.patchValue({'mobile':profile[0]['mobile']});
        this.dealerForm.patchValue({'ship_to_address':profile[0]['ship_to_address']});
        this.dealerForm.patchValue({'bill_to_address':profile[0]['bill_to_address']});
        this.dealerForm.patchValue({'location':profile[0]['location']});
        this.dealerForm.patchValue({'email':profile[0]['email']});

      });
      });   
      this.apiService.selectSalesman().subscribe((salesman:any)=>{
        this.salesman=salesman;
        console.log(this.salesman);
      });
      this.apiService.selectDepot().subscribe((depot:any)=>{
        this.depot=depot;
        console.log(this.depot);
      });
      this.apiService.selectRoute().subscribe((route:any)=>{
        this.routes=route;
        route.forEach(element => {
          if(element['depot_id'] == this.profile[0]['depot_id']){
            this.route.push(element);
            if(element['id'] == this.profile[0]['route_id'])
            this.dealerForm.patchValue({'route_name':element['name']});
          }
        });
      });
       //reactive form declaration
  this.dealerForm = this.fb.group({
    kaveri_brands:  ['',Validators.required],
    mobile:  ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]*")]],
    email:  [''],
    ship_to_address:  ['',Validators.required],
    bill_to_address:  [''],
    location:  ['',Validators.required],
    salesman_id:  ['',Validators.required],
    depot_id:  ['',Validators.required],
    route_id:  ['',Validators.required],
    route_name: [{value:'',disabled: true}],
    dealer_id:[this.id]
  });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.dealerForm.controls;
  }

  //to get the route belonging to the depot 
  getRoute(){
    this.route=[];
    this.dealerForm.patchValue({route_name:''});  
    this.dealerForm.patchValue({route_id:''});    
    this.routes.forEach(element => {
      if(element['depot_id']==this.dealerForm.get('depot_id').value){
        this.route.push(element);
      }
    });
    this.dealerForm.patchValue({route_id:this.route[0]['id']});    
    this.dealerForm.patchValue({route_name:this.route[0]['name']});
  }

  //select the route name 
  setRoute(){
    this.route.forEach(element => {
      if(element.id==this.dealerForm.get('route_id').value)
      this.dealerForm.patchValue({route_name:element.name});
    });
  }

  //edit table
  editTable(){
    this.contenteditable = !this.contenteditable;
    if(this.contenteditable){
      setTimeout(()=> {
        this.colName.nativeElement.focus();
    }, 0);     
      this.buttonVal="SAVE";
    }
    else
    this.buttonVal="EDIT";
  }

  //send the final saved data
  saveProfile(){
    console.log(this.dealerForm.value);
    this.apiService.editDealer(this.dealerForm.value).subscribe((res)=>{
      console.log(res);
      console.log("updated");
      this.toastr.success('Dealer Profile Updated', 'Success!', {timeOut: 3000});
    });
  }

  //edit table
  onRowClick(event, id){
    if(id=='email'){
      this.dealerForm.patchValue({'email':event.target.outerText})
    }
    if(id=='ship_to_address'){
      this.dealerForm.patchValue({'ship_to_address':event.target.outerText})
    }
    if(id=='bill_to_address'){
      this.dealerForm.patchValue({'bill_to_address':event.target.outerText})
    }
    if(id=='location'){
      this.dealerForm.patchValue({'location':event.target.outerText})
    }
  }
    //error class
    displayCssFor(field: string|Array<string>) {
      return (this.dealerForm.get(field).invalid && (this.dealerForm.get(field).touched || this.dealerForm.get(field).dirty) ) ? true : '';
    }

   //edit salesman
   onSubmit4(){
     this.salesman.forEach(element => {
       if(element['id']==this.dealerForm.get('salesman_id').value)
       this.profile[0]['name']=element['name'];
     });
     jQuery('#modal-default4').modal('toggle');
   } 

   //edit kaveri brands
   onSubmit3(){
      if(this.dealerForm.get('kaveri_brands').value == 'KAV')
      this.profile[0]['kaveri_brands']='KAV';
      if(this.dealerForm.get('kaveri_brands').value == 'GKAV')
      this.profile[0]['kaveri_brands']='GKAV';
      if(this.dealerForm.get('kaveri_brands').value == 'GKAV,KAV')
      this.profile[0]['kaveri_brands']='GKAV,KAV';
      if(this.dealerForm.get('kaveri_brands').value == 'KAV,GKAV')
      this.profile[0]['kaveri_brands']='KAV,GKAV';
    jQuery('#modal-default3').modal('toggle');
  }  

  //edit depot route
  onSubmit2(){
      this.depot.forEach(element => {
        if(element['id']==this.dealerForm.get('depot_id').value)
        this.profile[0]['depot_name'] = element['name'];
      });
      this.profile[0]['route_id'] = this.dealerForm.get('route_id').value;
    jQuery('#modal-default2').modal('toggle');
  }  

  //edit mobile
  onSubmit1(){
    console.log("helo");
      this.profile[0]['mobile'] = this.dealerForm.get('mobile').value;
    jQuery('#modal-default1').modal('toggle');
  }  
}
