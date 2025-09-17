export enum ErrorStatus {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SOMETHING_WENT_WRONG = 999,
}

export const ErrorStatusMsg: {
  [key: number]: {
    title: string;
    message: string;
    img: string;
  };
} = {
  400: {
    title: "Bad Request",
    message:
      "The request could not be understood by the server due to malformed syntax.",
    img: "https://img.freepik.com/free-vector/400-error-bad-request-concept-illustration_114360-1902.jpg",
  },
  401: {
    title: "Unauthorized",
    message: "You are not authorized to access this resource",
    img: "https://img.freepik.com/free-vector/401-error-unauthorized-concept-illustration_114360-5531.jpg",
  },
  403: {
    title: "Forbidden",
    message: "You don't have permission to access this resource",
    img: "https://img.freepik.com/free-vector/403-error-forbidden-concept-illustration_114360-5571.jpg",
  },
  404: {
    title: "Not Found",
    message: "The requested resource was not found",
    img: "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg",
  },
  500: {
    title: "Internal Server Error",
    message: "Something went wrong",
    img: "https://img.freepik.com/free-vector/500-internal-server-error-concept-illustration_114360-1885.jpg",
  },
};
