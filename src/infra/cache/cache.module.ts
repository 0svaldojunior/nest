import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [EnvModule],
  providers: [EnvService],
})
export class CacheModule {}
