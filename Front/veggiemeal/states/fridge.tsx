import {atom} from 'recoil';

export const localStorage:any = typeof window !== "undefined" ? window.localStorage : null

export const localStorageEffect = (key:string) => ({setSelf, onSet}:any) => {
    const savedValue = localStorage?.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  
    onSet((newValue: any, _:any, isReset:boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };


export const fridgeIngre = atom({
    key:'ingre',
    default:[],
    effects:[
        localStorageEffect('ingre'),
      ]
})