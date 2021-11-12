const app = require('./app');
const roomsRouter = require('./routes/rooms');

module.exports = (app) => {
  app.use('/api/rooms', roomsRouter);
  app.get('/api/healthcheck', (_req, res) =>
    res.status(200).json({ status: 'healthy' })
  );
};
