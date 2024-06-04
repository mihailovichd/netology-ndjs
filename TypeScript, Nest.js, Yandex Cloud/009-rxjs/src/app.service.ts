import { Injectable } from '@nestjs/common';
import { firstValueFrom, forkJoin, from, map, Observable } from 'rxjs';
import axios from 'axios';

@Injectable()
export class AppService {
  private getObservableRequest(url: string): Observable<any> {
    return from(axios.get(url)).pipe(map((res: any) => res.data));
  }

  async getRepository() {
    const data$ = forkJoin({
      github: this.getObservableRequest(
        'https://api.github.com/search/repositories?q=rxjs',
      ),
      gitlab: this.getObservableRequest(
        'https://gitlab.com/api/v4/projects?search=nodejs',
      ),
    });
    return await firstValueFrom(data$);
  }
}
