import logSymbols from 'log-symbols';

export const logger = {
  success: (message: string) => console.log(logSymbols.success, message),
  error: (message: string) => console.log(logSymbols.error, message),
  info: (message: string) => console.log(logSymbols.info, message),
  warning: (message: string) => console.log(logSymbols.warning, message),
};

export class CommandService {
  async init() {
    logger.info('Initializing a new project...');
  }

  async generate() {
    logger.info('Generating a new [ app / package / component ]...');
  }
}
