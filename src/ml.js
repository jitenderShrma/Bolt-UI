import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
import en_GB from '@/lang/en-GB';
import pt_POR from '@/lang/pt-POR';

Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'en-GB',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('en-GB').create(en_GB),
    new MLanguage('pt-POR').create(pt_POR)
  ]
})