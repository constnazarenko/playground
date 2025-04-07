import ApiGateway from './ApiGateway';
import { API_BASE } from '../constants/app';

global.fetch = jest.fn();

describe('ApiGateway', () => {
  const apiGateway = new ApiGateway();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request and return the response', async () => {
    const mockResponse = { data: 'test' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await apiGateway.get('/test-path');

    expect(fetch).toHaveBeenCalledWith(`${API_BASE}/test-path`);
    expect(result).toEqual(mockResponse);
  });

  it('should make a POST request with payload and return the response', async () => {
    const mockResponse = { success: true };
    const payload = { key: 'value' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await apiGateway.post('/test-path', payload);

    expect(fetch).toHaveBeenCalledWith(`${API_BASE}/test-path`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    expect(result).toEqual(mockResponse);
  });

  it('should make a PUT request and return the response', async () => {
    const mockResponse = { updated: true };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await apiGateway.put('/test-path');

    expect(fetch).toHaveBeenCalledWith(`${API_BASE}/test-path`, {
      method: 'PUT',
    });
    expect(result).toEqual(mockResponse);
  });
});
