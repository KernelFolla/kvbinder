import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api/items`);

    expect(res.status).toBe(200);
  });
});
