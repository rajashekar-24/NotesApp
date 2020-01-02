import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})

export class AddNoteComponent implements OnInit, AfterContentInit{

  constructor(private dataService : DataService) { }
  
  isReadonly = true;
  note: any ;
  notes = [];

  addNote(note){

    if(note){
      let item = { text: note, timestamp: new Date()};
      if(localStorage.getItem('notes')){
        this.notes = JSON.parse(localStorage.getItem('notes'));
        this.notes.push(item);
      }else{
        this.notes.push(item);
      }
      localStorage.setItem('notes', JSON.stringify(this.notes));
      this.dataService.sendNote(item, 'add-note');
      this.isReadonly = true; //disable text area
    }
    
  }
 

  ngOnInit() {
   
  }

  ngAfterContentInit(){
    //Appending selected note data to View
    this.dataService.viewNoteObservable.subscribe((note:any) =>{
        this.note = note.text;
        if(note == 'item_deleted')
        this.note = '';
        if(note == 'add_note')
          this.isReadonly = false;
       
        
    })
  }

}
