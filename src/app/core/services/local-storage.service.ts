import { Injectable } from '@angular/core';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(private _localStorageRefService: LocalStorageRefService) {
    }

    getItem(key: string): string | null {
        return this._localStorageRefService.localStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        this._localStorageRefService.localStorage.setItem(key, value);
    }

    removeItem(key: string): void {
        this._localStorageRefService.localStorage.removeItem(key);
    }
}



