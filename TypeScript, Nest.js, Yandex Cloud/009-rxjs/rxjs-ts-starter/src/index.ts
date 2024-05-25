import { ajax } from 'rxjs/ajax';
import {forkJoin} from "rxjs";

forkJoin({
    github: ajax.getJSON('https://api.github.com/search/repositories?q=rxjs'),
    gitlab: ajax.getJSON('https://gitlab.com/api/v4/projects?search=nodejs')
}).subscribe(console.log)