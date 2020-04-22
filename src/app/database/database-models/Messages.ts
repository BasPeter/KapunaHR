export interface SuccesMessage {
  type: string,
  mutation: 'create' | 'delete'
  database: string,
  message: {
    ok: boolean,
    id: string
  }
}

export interface ErrorMessage {
  type: string,
  message: {
    status: string,
    name: string,
    message: string,
    error: boolean,
    id: string,
    docId: string
  },
}
