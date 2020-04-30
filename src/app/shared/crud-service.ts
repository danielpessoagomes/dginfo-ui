import { HttpClient } from '@angular/common/http';
import { take, delay, map } from 'rxjs/operators';

export class CrudService<T> {

  constructor(
    protected http: HttpClient,
    private API_URL) {}

  list() {
    return this.http.get<any>(this.API_URL)
      .pipe(
        //delay(2000),
        // tap(console.log),
        map(r => {
          const data = r.content;
          const response = {
            data,
            total: r.totalElements
          };

          return response;
        })
      );
  }

  create(record: T) {
    return this.http.post<T>(this.API_URL, record)
      .pipe(
        take(1)
      );
  }

  update(record: T) {
    return this.http.put<T>(`${this.API_URL}/${record['codigo']}`, record);
  }

  delete(record: number) {
    return this.http.delete<T>(`${this.API_URL}/${record}`).pipe(take(1));
  }

  findById(record: number) {
    return this.http.get<T>(`${this.API_URL}/${record}`)
      .pipe(
        take(1)
      );
  }
}
