import { AuthModule } from '@/infra/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { HttModule } from './http/http.module'
import { Module } from '@nestjs/common'
import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttModule,
  ],
})
export class AppModule {}
