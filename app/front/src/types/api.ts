export interface BackResponse {
  code: number;
  message: string;
  data?: Object;
}

export interface BackResponseWithData {
  code: number;
  message: string;
  data: Object;
}
