import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('spotify listo');
  }

  getQuery( query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer BQClIMQSOLRNcnGnU0wj2eo-vas74XjBPEjHtCmaSpWO-WSGXnmrkSL06Ct2nzcLCBzkxZuIvQVX0rHHQnQ'
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases')
                .pipe( map(data => {
                    // tslint:disable-next-line: no-string-literal
                    return data['albums'].items;
                  }));
  }

  getArtistas( termino: string) {
    return this.getQuery( 	`search?q=${ termino}&type=artist&limit=15`)
                      // tslint:disable-next-line: no-string-literal
                      .pipe( map( data => data['artists'].items));

  }
  getArtista( id: string) { return this.getQuery( 	`artists/${id}`); }
  getTopTracks( id: string) {
    return this.getQuery( 	`artists/${id}/top-tracks?country=us`)
                // tslint:disable-next-line: no-string-literal
                .pipe( map ( data => data['tracks']));
              }
}
