import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  root() {
    return {
      service: 'digital-business-card',
      graphql: '/graphql',
    };
  }

  @Get('health')
  health() {
    return { status: 'ok' };
  }
}
