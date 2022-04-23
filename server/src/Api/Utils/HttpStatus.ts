import { Request, Response } from 'express';
import httpStatus from 'http-status';

const DB_ERROR = 950;
const myHttpStatus = { DB_ERROR };
myHttpStatus[`${DB_ERROR}`] = 'BD error';
const HTTP_STATUS= {...httpStatus,...myHttpStatus}
export const Created = <T>(res: Response, data: T) => {
  return res.status(HTTP_STATUS.CREATED).send(data);
};

export const Ok = <T>(res: Response, data: T) => {
  return res.status(HTTP_STATUS.OK).send(data);
};

export const NoContent = (res: Response) => {
  return res.status(HTTP_STATUS.NO_CONTENT).send();
};

export const NotFound = (res: Response, data: any = { message: 'Not found' }) => {
  return res.status(HTTP_STATUS.NOT_FOUND).send(data);
};

export const BadRequest = (res: Response, data: any = { message: 'Bad request' }) => {
  return res.status(HTTP_STATUS.BAD_REQUEST).send(data);
};

export const ValidateRequiredQueryParameters = (req: Request, queryParams: string[]) => {
  return Object.keys(req.query).filter((i) => queryParams.includes(i)).length === queryParams.length;
};

export const DataExist=(res:Response)=>{
    return res.status(400).json({
        status:"error",
        type:"title",
        message: "This title is alredy resgister"   });
}

export const throwDBError = (message: any = '') => {
    throw new GeneralError(HTTP_STATUS.DB_ERROR, message);
  };
  
export function to<T>(promise: Promise<any>, errInfo?: string | object): Promise<[any, T] | T[]> {
    
    return promise
      .then((res) => [undefined,res])
      .catch((err) => {
        if (errInfo) {
          Object.assign(err, errInfo);
        }
  
        return [err, undefined];
      });
  }
  
  export function toAll(promises: Array<Promise<any>>): Promise<Array<any[] | [any, any]>> {
    return Promise.all(promises.map((p) => to(p)));
  }
  export class GeneralError extends Error {
    public statusCode: number;
  
    constructor(statusCode: number, message: any) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  