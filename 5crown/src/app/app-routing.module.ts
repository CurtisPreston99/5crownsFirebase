import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameRoomComponent } from './game-room/game-room.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RoomSelectorComponent } from './room-selector/room-selector.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'room-selector', component: RoomSelectorComponent },
  { path: 'game/:id', component: GameRoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
