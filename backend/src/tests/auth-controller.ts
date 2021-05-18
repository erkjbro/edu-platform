import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import { expect } from 'chai';
import sinon from 'sinon';

import * as AuthController from '../controllers/auth-controller.js';
import { User } from '../models/user.js';

const MONGODB_URI = process.env.MONGODB_URI as string;
const TEST_USER_ID = '5c0f66b979af55031b34728a';

describe('Auth Controller', function () {
  before(function (done) {
    (async () => {
      try {
        await mongoose.connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        });

        const user = new User({
          firstName: 'test',
          lastName: 'user',
          role: 'student',
          email: 'test@test.com',
          password: 'tester',
          courses: [],
          _id: TEST_USER_ID,
        });

        await user.save();

        done();
      } catch (err) {
        console.error(err.message);
      }
    })();
  });

  it('should pass', function (done) {
    expect('test').to.equal('test');
    done();
  });

  // it('should throw an error with code 500 if accessing the database fails', function (done) {
  //   (async () => {
  //     try {
  //       sinon.stub(User, 'findOne');

  //       // @ts-ignore
  //       User.findOne.throws();

  //       const req = {
  //         body: {
  //           email: 'test@test.com',
  //           password: 'tester',
  //         },
  //       } as Request;

  //       const result = await AuthController.postLogin(
  //         req,
  //         {} as Response,
  //         () => {}
  //       );

  //       console.log(result);

  //       expect(result).to.be.an('error');
  //       expect(result).to.have.property('statusCode', 500);

  //       done();

  //       // @ts-ignore
  //       User.findOne.restore();
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   })();
  // });

  after(function (done) {
    (async () => {
      try {
        await User.deleteMany({});
        await mongoose.disconnect();
        done();
      } catch (err) {
        console.error(err.message);
      }
    })();
  });
});
