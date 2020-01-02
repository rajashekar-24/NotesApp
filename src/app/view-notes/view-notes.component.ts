import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent implements OnInit, AfterContentInit{

  constructor(private dataService : DataService) { }
  navbar = true;
  notes: any = [];
  isActive = false;
  filterMessage = false;
  index;
  _notesCopy = [];

  onSelect(note,id){
      this.index = id;
      note.id = id;
      this.isActive = !this.isActive;
      this.dataService.sendNote(note, 'view-notes');
  }
  
  openNav() {
    this.navbar= !this.navbar;
    document.getElementById("sidebar").style.width = "350px";
    document.getElementById("menu").style.marginLeft = "350px";
  }
  
  closeNav() {
    this.navbar = !this.navbar;
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("menu").style.marginLeft= "0";
  }

  ngOnInit() {
    this.openNav();
  }

  ngAfterContentInit() {
    //Get the notes and update
    this.dataService.addNoteObservable.subscribe((note: any) => {
      if(localStorage.getItem('notes')){
        this.notes = JSON.parse(localStorage.getItem('notes'));
        this._notesCopy = [...this.notes]
      }

      //search notes 
      if(note.hasOwnProperty('query')){

        this.notes = this._notesCopy.filter((item) => {
          return item.text.toLowerCase().indexOf(note.query.toLowerCase()) >= 0
          });
          this.filterMessage = true;
      }
    })

    this.dataService.viewNoteObservable.subscribe( (note: any) => {
      if(note == 'item_deleted')
        this.index = null;
    })
   
  }


}
