import {atom, selector} from 'recoil';
import {localStorage, localStorageEffect} from 'states/fridge';

export const chooseMart = atom({
  key:'chooseMart',
  default:"none",
  effects:[
      localStorageEffect('chooseMart'),
    ]
})


export const cart = atom({
    key:'cart',
    default:[],
    effects:[
        localStorageEffect('cart'),
      ]
})

export const Ecart = atom({
  key:'Ecart',
    default:[],
    effects:[
        localStorageEffect('Ecart'),
      ]
})

export const Hcart = atom({
  key:'Hcart',
    default:[],
    effects:[
        localStorageEffect('Hcart'),
      ]
})