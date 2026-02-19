const mongo = require('../db/mongo');
const controller = require('../controllers/other');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn();
  return res;
}

describe('Other controller GET endpoints', () => {
  afterEach(() => jest.restoreAllMocks());

  test('getAllData returns 200 and an array', async () => {
    const fakeCursor = { toArray: jest.fn().mockResolvedValue([{ recipeName: 'test' }]) };
    const fakeCollection = { find: jest.fn().mockReturnValue(fakeCursor) };
    jest.spyOn(mongo, 'getDb').mockReturnValue({ db: () => ({ collection: () => fakeCollection }) });

    const res = mockRes();
    await controller.getAllData({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ recipeName: 'test' }]);
  });

  test('getAllData returns 500 when DB errors', async () => {
    jest.spyOn(mongo, 'getDb').mockImplementation(() => { throw new Error('DB failure'); });
    const res = mockRes();
    await controller.getAllData({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  test('getData returns 400 for invalid id', async () => {
    const req = { params: { id: 'bad-id' } };
    const res = mockRes();
    await controller.getData(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('getData returns 200 and object when found', async () => {
    const doc = { recipeName: 'found' };
    const fakeCursor = { toArray: jest.fn().mockResolvedValue([doc]) };
    const fakeCollection = { find: jest.fn().mockReturnValue(fakeCursor) };
    jest.spyOn(mongo, 'getDb').mockReturnValue({ db: () => ({ collection: () => fakeCollection }) });

    const req = { params: { id: '507f191e810c19729de860ea' } };
    const res = mockRes();
    await controller.getData(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(doc);
  });
});
