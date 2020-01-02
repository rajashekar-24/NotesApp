import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private addNoteSubject =  new BehaviorSubject('');
  private viewNoteSubject = new BehaviorSubject('');

  addNoteObservable = this.addNoteSubject.asObservable();
  viewNoteObservable = this.viewNoteSubject.asObservable();

  constructor() { }

  sendNote(note, component){

    if(component == 'add-note'){
      this.addNoteSubject.next(note);
    }
    else if(component == 'view-notes'){
      this.viewNoteSubject.next(note);
    }
    else if(component == 'header'){
       this.addNoteSubject.next(note); //refresh left menu
       this.viewNoteSubject.next(note); // clear text area
    } 
  }
}
