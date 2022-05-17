import {
  loadHeaderFooter
} from "../js/utils.js";
import Admin from "../js/admin.js";
import ExternalServices from './ExternalServices.js';

loadHeaderFooter();

const myAdmin = new Admin(new ExternalServices());
myAdmin.showLogin();