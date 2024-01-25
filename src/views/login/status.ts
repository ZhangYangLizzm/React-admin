export enum Status {
  Login,
  SignUp,
}

export interface StatusSetter {
  setStatus: (status: Status) => void;
}
