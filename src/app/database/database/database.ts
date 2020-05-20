// @ts-ignore
import PouchDB from 'pouchdb';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ErrorMessage, SuccesMessage} from "../database-models/Messages";
import {first, map} from "rxjs/operators";

export class Database<T> {

  name: string;
  db: any;

  private _messages$: Subject<SuccesMessage | ErrorMessage> = new Subject();
  get messages$(): Observable<any> {
    return this._messages$.asObservable()
  }

  private _documenten$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  get documenten$(): Observable<any> {
    return this._documenten$.asObservable();
  }

  private get idFactory() {
    return new Date(Date.now());
  }

  constructor(name: string) {
    this.name = name;
    this.db = new PouchDB(name);

    // this.db.destroy();

    // fill documenten$ with initial data;
    this.db.allDocs({include_docs: true, descending: true}).then(result => {
      this._documenten$.next(result);
    });

    // subscribe to database changes. expose them on documenten$
    this.db.changes({live: true, since: 'now'})
      .on('change', (change) => {
        this.db.allDocs({include_docs: true, descending: true}).then(result => this._documenten$.next(result));
      })
      .catch(err => console.log(err));
  }

  create(document: T) {
    const doc = {_id: this.idFactory, ...document};
    this.db.put(doc)
      .then(response => {
        const message = {
          type: 'success',
          mutation: 'create',
          database: this.name,
          message: response,
        };
        this._messages$.next(message)
      })
      .catch(err => {
        console.log(err);
        this._messages$.next({type: 'error', message: err})
      })
  }

  update(document: T) {
    this.db.put(document)
      .then(response => {
        const message = {
          type: 'success',
          mutation: 'update',
          database: this.name,
          message: response,
        };
        this._messages$.next(message)
      })
      .catch(err => {
        console.log(err);
        this._messages$.next({type: 'error', message: err})
      })

  }
}

