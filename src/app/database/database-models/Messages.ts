export interface SuccesMessage {
  type: string,
  mutation: 'create' | 'delete'
  database: string,
  timeStamp: Date;
  message: {
    ok: boolean,
    id: string
  }
}

export interface ErrorMessage {
  type: string,
  timeStamp: Date;
  message: {
    status: string,
    name: string,
    message: string,
    error: boolean,
    id: string,
    docId: string
  },
}
