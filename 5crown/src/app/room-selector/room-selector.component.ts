import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-selector',
  templateUrl: './room-selector.component.html',
  styleUrls: ['./room-selector.component.less']
})
export class RoomSelectorComponent implements OnInit {

  public Name: string = ""
  public Room: number;
  constructor() { }

  ngOnInit(): void {
  }

  public joinRoom(){
    console.log(this.Name)
    console.log(this.Room)
  }

}
