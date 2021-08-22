
import { accountService } from '@/service.js';

export const ErrorHandler = (responses)=>{
    const status = responses.status;
    const { code = '',  message='', details='' } = (responses && responses.data && responses.data.details) ? responses.data.details[0] : { };
    switch (status) {
        case 204:
          return { success: 'OK' };
        case 400:
            // eslint-disable-next-line no-case-declarations
            let text = '';
            if (code || details || message) {
                text = (code) ? code : `${message}`;
              } else {
                text = 'Bad Request';
              }
          return {errMessage: text };
  
        case 401:
            accountService.logout();  
          return { errMessage: 'Unauthorized'};
  
        case 426:
        case 409:
          return { errMessage: '409 Code' };
  
        case 403:
            accountService.logout();   
          return {errMessage:  "You don't have the necessary permissions to perform this action"};
  
        case 404:
          return { code: 404, errMessage: '404 code'};
  
        case 500:
          return { errMessage: 'Unable to process your request'};
  
        case 503:
          return { errMessage: 'Unable to process your request'};
        case 504:
          return { errMessage: '504 Timeout'};
  
        default:
          return { errMessage: 'General error. Please try agian' };
      }
}