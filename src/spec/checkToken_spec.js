import checkTokenExpiration from '../services/checkToken.js';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Define mock functions
const jwtDecodeMock = () => ({
  exp: Math.floor(Date.now() / 1000) - (60 * 60), // Mock an expired token (timestamp in the past)
});

const cookiesGetMock = () => 'mockTokenValue'; // Return a mock token value


describe('checkTokenExpiration', () => {
  let dependencies;

  beforeEach(() => {
    dependencies = {
      jwtDecode: jasmine.createSpy().and.callFake(jwtDecodeMock),
      Cookies: {
        get: jasmine.createSpy().and.callFake(cookiesGetMock),
      },
    };
  });

  // Use the dependencies object in your tests
  it('should return true if token is expired', () => {
    // Setup
    const expiredToken = 'expiredToken';
    dependencies.Cookies.get.and.returnValue(`Bearer ${expiredToken}`);
    dependencies.jwtDecode.and.returnValue({ exp: Math.floor(Date.now() / 1000) - 3600 });

    // Act
    const result = checkTokenExpiration(dependencies);

    // Assert
    expect(result).toBe(true);
  });

  it('should return true if no token is found', () => {
    // Setup
    dependencies.Cookies.get.and.returnValue(null);
  
    // Act
    const result = checkTokenExpiration(dependencies);
  
    // Assert
    expect(result).toBe(true);
  });
  
  it('should return false if token is valid and not expired', () => {
    // Setup
    const validToken = 'validToken';
    dependencies.Cookies.get.and.returnValue(`Bearer ${validToken}`);
    dependencies.jwtDecode.and.returnValue({ exp: Math.floor(Date.now() / 1000) + 3600 }); // Token expires in an hour
  
    // Act
    const result = checkTokenExpiration(dependencies);
  
    // Assert
    expect(result).toBe(false);
  });
  
  it('should return true if token is invalid', () => {
    // Setup
    const invalidToken = 'invalidToken';
    dependencies.Cookies.get.and.returnValue(`Bearer ${invalidToken}`);
    dependencies.jwtDecode.and.callFake(() => { throw new Error('Invalid JWT token'); });
  
    // Act
    const result = checkTokenExpiration(dependencies);
  
    // Assert
    expect(result).toBe(true);
  });
});