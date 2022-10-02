import {atom} from 'recoil';
import {localStorage, localStorageEffect} from 'states/fridge';

export const cart = atom({
    key:'cart',
    default:[],
    effects:[
        localStorageEffect('cart'),
      ]
})