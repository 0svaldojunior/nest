import { AuthModule } from '@/infra/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { EnvModule } from './env/env.module'
import { EventsModule } from './events/events.module'
import { HttModule } from './http/http.module'
import { Module } from '@nestjs/common'
import { envSchema } from './env/env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttModule,
    EnvModule,
    EventsModule,
  ],
})
export class AppModule {}
