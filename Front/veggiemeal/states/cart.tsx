import {atom, selector} from 'recoil';
import {sessionStorage, sessionStorageEffect} from 'states/fridge';

export const chooseMart = atom({
  key:'chooseMart',
  default:"none",
  effects:[
      sessionStorageEffect('chooseMart'),
    ]
})


export const cart = atom({
    key:'cart',
    default:[],
    effects:[
        sessionStorageEffect('cart'),
      ]
})

export const Ecart = atom({
  key:'Ecart',
    default:[],
    effects:[
        sessionStorageEffect('Ecart'),
      ]
})

export const Hcart = atom({
  key:'Hcart',
    default:[],
    effects:[
        sessionStorageEffect('Hcart'),
      ]
})