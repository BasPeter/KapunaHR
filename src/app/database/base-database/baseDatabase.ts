// @ts-ignore
import PouchDB from 'pouchdb';

export class BaseDatabase {

  db: any;


  //TODO: find way to specify used model for db
  constructor(dbName: string, model: Object) {
    this.db = new PouchDB(dbName);
  }

  create(data: any) {
    this.db.put(data).then(res => console.log(res));
  }
}
