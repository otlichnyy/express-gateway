import express from 'express';
import httpStatus from 'http-status';
import ApiError from '@src/utils/ApiError';

// refactor below with service or db model
const db = {
  users: () => {
    if (Math.random() > 0.5) {
      return [
        { userId: 1, name: 'otlichnyy' },
        { userId: 2, name: 'shashank' },
        { userId: 3, name: 'notestaq' },
        { userId: 4, name: 'typexed' },
      ];
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  },
};

const getUsers = (_: express.Request, res: express.Response) =>
  res.send(db.users());

export { getUsers };
