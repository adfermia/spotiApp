import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  nuevasCanciones: any[] = [];
  loading: boolean;
  error = false;
  mensajeError = '';
  constructor(private spotify: SpotifyService) {
    this.loading = true;


    this.spotify.getNewReleases()
    .subscribe( (data: any) => {
      // tslint:disable-next-line: no-unused-expression
      this.nuevasCanciones = data;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.error = true;
      this.mensajeError = error.error.message;
    });

   }

  ngOnInit() {
  }

}
