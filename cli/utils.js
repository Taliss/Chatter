const http = require('http');
const Conf = require('conf');
const commander = require('commander');

const keepAliveAgent = new http.Agent({ keepAlive: true });
const config = new Conf();

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

const throwIfMissingRequiredKey = (keys) => {
  keys.forEach((key) => {
    if (!config.get(key))
      throw new ValidationError(`Missing required key: ${key}`);
  });
};

const parseToInt = (value) => {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError('Not a number');
  }
  return parsedValue;
};

const timestampToDateTime = (timestamp) => {
  const ms = timestamp;
  const date = new Date(ms);
  return date.toLocaleString();
};

const parseMessage = ({ msg, user, created, room }) => {
  return `${user} | ${timestampToDateTime(created)} | ${msg}
  `;
};

const request = (options, reqBody) => {
  let resBody = [];
  return new Promise((resolve, reject) => {
    const req = http.request({ ...options, agent: keepAliveAgent }, (res) => {
      res.on('data', (chunk) => resBody.push(chunk));

      res.on('end', () => {
        resBody = Buffer.concat(resBody).toString();

        const json = JSON.parse(resBody);
        if (res.statusCode < 200 || res.statusCode > 299)
          reject({
            error: true,
            message: json.message,
            status: res.statusCode,
          });
        // there a lot of possibilities this to brake everything... thats why there are already existing json body parsers, but we can live with that
        resolve(json);
      });
      res.on('error', reject);
    });
    req.on('error', reject);

    if (reqBody) {
      req.write(JSON.stringify(reqBody));
    }
    req.end();
  });
};

module.exports = {
  throwIfMissingRequiredKey,
  parseMessage,
  parseToInt,
  store: config,
  request,
};
