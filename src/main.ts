import { GreyCat } from '@greycat/web'
import './app.css'
import App from './App.svelte'
import { projectlib } from './project/index'


const greycat = await GreyCat.init({ libraries: [projectlib] })

window.greycat.default = greycat


const app = new App({
  target: document.getElementById('app'),
})

export default app
