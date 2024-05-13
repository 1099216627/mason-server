import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { LocalGuard } from '../../../src/guards/local/local.guard';
import { RegisterDto } from '@app/auth/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('refresh')
  refresh(@Query('refresh') refresh: string) {
    return this.authService.refresh(refresh);
  }
}
