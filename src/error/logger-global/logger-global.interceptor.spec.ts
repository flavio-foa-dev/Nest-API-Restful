import { LoggerGlobalInterceptor } from './logger-global.interceptor';

describe('LoggerGlobalInterceptor', () => {
  it('should be defined', () => {
    expect(new LoggerGlobalInterceptor()).toBeDefined();
  });
});
