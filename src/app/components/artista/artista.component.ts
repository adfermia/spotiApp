import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {
  loading: boolean;
  artista: any = {};
  topTracks: any[] = [];
  constructor( private router: ActivatedRoute, private spotify: SpotifyService) {
    this.router.params.subscribe( params => {
        // tslint:disable-next-line: no-string-literal
        this.getArtista( params['id']);
        // tslint:disable-next-line: no-string-literal
        this.getTopTracks( params['id']);
    });
   }

  getArtista( id: string) {
    this.loading = true;
    this.spotify.getArtista( id )
      .subscribe( artista => {
          console.log('datos artista');
          console.log(artista);
          this.artista = artista;
          this.loading = false;
      });
  }
  getTopTracks( id: string) {
    this.spotify.getTopTracks( id )
          .subscribe( topTracks => {
            this.topTracks = topTracks;
          });
  }

}
