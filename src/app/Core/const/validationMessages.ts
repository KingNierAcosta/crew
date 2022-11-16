import {ErrMsgFn, HashMap} from '@ngneat/error-tailor/lib/types';

export const ValidationMessages: HashMap<string | ErrMsgFn> = {
  required: 'Este campo es requerido',
};
