import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './modules/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_LINK ?? "mongodb://127.0.0.1:27017/task-manager"),
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
