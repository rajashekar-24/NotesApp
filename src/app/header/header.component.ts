import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentInit{

  selectedNote;
  constructor(private dataService: DataService ) { }

  addNote(){
    this.dataService.sendNote('add_note','header')
  }

  deleteNote(){
    if(this.selectedNote){
      if(confirm('Are you sure! Do you want to delete?')){
        let notes = JSON.parse(localStorage.getItem('notes'));
        let updateNotes = notes.filter((item,index) =>{
          return index != this.selectedNote.id;
        })
      
        localStorage.setItem('notes',JSON.stringify(updateNotes));
        this.dataService.sendNote('item_deleted','header');
      }  
      this.selectedNote=null;
    }else{
      alert('Choose a note to delete !');
    }
    
  }

  search(query){
      this.dataService.sendNote({"query": query},'header');
  }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.dataService.viewNoteObservable.subscribe((note:any) =>{
      this.selectedNote = note;
    })
  }
}

