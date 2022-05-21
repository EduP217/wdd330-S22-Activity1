import ExternalServices from './ExternalServices.js';
import Alert from './alert.js';
import { loadHeaderFooter } from './utils.js';

loadHeaderFooter();

//const dataSource = new ExternalServices('alerts');
//const alert = new Alert(dataSource);
const alert = new Alert();
alert.init();
