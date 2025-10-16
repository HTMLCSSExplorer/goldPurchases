


 import {string,object, number} from 'yup'


 export const newRowSchema = object({
  
  coin : string().required(),
  unit : number().required(),
  buyPrice : number().required(),


 })