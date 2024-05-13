import { Controller } from '@nestjs/common';
import { CompetenceService } from './competence.service';

@Controller('competence')
export class CompetenceController {
  constructor(private readonly competenceService: CompetenceService) {}
}
