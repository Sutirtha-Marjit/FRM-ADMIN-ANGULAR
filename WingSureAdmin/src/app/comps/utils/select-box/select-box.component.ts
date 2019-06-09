import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.less']
})
export class SelectBoxComponent implements OnInit {


  @Input() options:Array<{name:string,val:string, selected:boolean}> = []; 	
  @Output() whenSelect = new EventEmitter<{name:string,val:string, selected:boolean}>();
  
  
  constructor() { }

  ngOnInit() {
  }
  
  getSelected(){
	  const e = this.options.find((el)=>{
		  return el.selected;
	  });
	  
	  if(e){
		return e.name;  
	  }else{
		return '';  
	  }
  }
  
  optionSelect(selected){
	  
	  const e = this.options.find((el)=>{
		  return el.selected;
	  });
	  
	  if(e){
		  e.selected = false;
	  }
	  
	  if(this.options[selected]){
		  this.options[selected].selected = true;
		  this.whenSelect.emit(this.options[selected]);
	  }
  }
}
