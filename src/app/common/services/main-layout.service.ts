import { BehaviorSubject } from 'rxjs';

class MainLayoutService {
  private readonly _isShading$ = new BehaviorSubject(false);
  readonly isShading$ = this._isShading$.asObservable();

  setIsShading(isShading: boolean): void {
    this._isShading$.next(isShading);
  }
}

export const mainLayoutService = new MainLayoutService();
