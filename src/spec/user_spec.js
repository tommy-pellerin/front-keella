import Cookies from "js-cookie";
import ky from "ky";
import { authSignInUp, authSignOut } from "../services/auth-fetch.js";

describe('authSignInUp', () => {
  beforeEach(() => {
    spyOn(Cookies, 'get');
    spyOn(Cookies, 'remove');
    spyOn(Cookies, 'set');
    spyOn(ky, 'post').and.callFake(() => {
      return Promise.resolve({
        headers: {
          get: (header) => {
            if (header === 'Authorization') return 'Bearer fake-token';
            if (header === 'content-type') return 'application/json';
          }
        },
        json: () => Promise.resolve({ success: true })
      });
    });
  });

  it('should remove existing keellauth cookie', async () => {
    Cookies.get.and.returnValue('existing-cookie');
    await authSignInUp('/signin', { username: 'test', password: 'password' });
    expect(Cookies.remove).toHaveBeenCalledWith('keellauth');
  });

  it('should set keellauth cookie on successful response', async () => {
    await authSignInUp('/signin', { username: 'test', password: 'password' });
    expect(Cookies.set).toHaveBeenCalledWith('keellauth', 'Bearer fake-token');
  });

  it('should return JSON response for content-type application/json', async () => {
    const response = await authSignInUp('/signin', { username: 'test', password: 'password' });
    expect(response).toEqual({ success: true });
  });

});

// Ensure this is at the top level of your test file or in a setup file that runs before your tests
beforeAll(() => {
  const localStorageMock = {
    getItem: jasmine.createSpy('getItem').and.returnValue('existing-user'),
    setItem: jasmine.createSpy('setItem'),
    clear: jasmine.createSpy('clear'),
    removeItem: jasmine.createSpy('removeItem')
  };

  global.window = { localStorage: localStorageMock };
  global.localStorage = localStorageMock;
});

describe('authSignOut', () => {
  beforeEach(() => {
    spyOn(Cookies, 'remove');
    spyOn(ky, 'delete').and.callFake(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true })
    }));
  });

  it('should remove keellauth cookie', async () => {
    await authSignOut('/signout');
    expect(Cookies.remove).toHaveBeenCalledWith('keellauth');
  });

  it('should clear localStorage if user is logged in', async () => {
    await authSignOut('/signout');
    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('should call ky.delete with correct URL', async () => {
    await authSignOut('/signout');
    expect(ky.delete.calls.mostRecent().args[0]).toMatch(/\/signout/);
  });

});