import { Module }                       from '@nestjs/common';
import { MongooseModule }               from '@nestjs/mongoose';

import { AppController }  from './app.controller';
import { AppService }     from './app.service';

import { UserModule }    from './user/user.module';

@Module({
  imports: [
    UserModule,

    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://cherrycollapse:3Jbp5ZIAmHuullbe@cluster0.7jlvhal.mongodb.net/testdb',
      }),
    }),

  ],

  controllers: [AppController],
  providers:   [AppService],
})

export class AppModule {}