// @ts-ignore
import PouchDB from 'pouchdb';
import {Observable, Subject} from "rxjs";
import {ErrorMessage, SuccesMessage} from "../database-models/Messages";

export class Database<T> {

  name: string;
  db: any;

  private _messages$: Subject<SuccesMessage | ErrorMessage> = new Subject();
  get messages$() {
    return this._messages$.asObservable()
  }


  get total_rows(): Promise<number> {
    return this.db.allDocs().then(result => result.total_rows).catch(err => console.log(err));
  }

  private _documenten: Subject<T> = new Subject<T>();
  get documenten(): Promise<T> {
    return this.db.allDocs({include_docs: true}).then(result => result.rows);
  }

  constructor(name: string) {
    this.name = name;
    this.db = new PouchDB(name);
  }

  create(document: T) {
    this.db.put(document)
      .then(response => {
        const message = {
          type: 'success',
          mutation: 'create',
          database: this.name,
          timeStamp: new Date(Date.now()),
          message: response,
        };
        this._messages$.next(message)
      })
      .catch(err => {
      this._messages$.next({type: 'error', timeStamp: new Date(Date.now()), message: err})
    })
  }
}

