import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private providerURL = "https://cookies-api-7996f284e7c0.herokuapp.com/api/v1/provider";
  currentProviderSubject = new BehaviorSubject(null);

  public provider$ = this.currentProviderSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  public createProvider(options: any) {
    const { token, ...provider } = options;

    return this.http.post(this.providerURL, {
      ...provider
    }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }

  public async getAll(token: string) {
    return this.http.get(this.providerURL, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).pipe(
      tap(providerData => {
        this.currentProviderSubject.next(providerData as any);
      })
    )
  }

  setData(provider$: any) {
    provider$.subscribe((providerData: any) => {
      this.currentProviderSubject.next(providerData)
    })
  }

  getState() {
    return this.currentProviderSubject.getValue();
  }
}
