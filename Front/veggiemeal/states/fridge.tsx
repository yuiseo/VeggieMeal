import {atom} from 'recoil';

export const sessionStorage:any = typeof window !== "undefined" ? window.sessionStorage : null

export const sessionStorageEffect = (key:string) => ({setSelf, onSet}:any) => {
    const savedValue = sessionStorage?.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  
    onSet((newValue: any, _:any, isReset:boolean) => {
      isReset
        ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };


export const fridgeIngre = atom({
    key:'ingre',
    default:[],
    effects:[
        sessionStorageEffect('ingre'),
      ]
})