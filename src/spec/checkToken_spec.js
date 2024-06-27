import checkTokenExpiration from '../services/checkToken.js';

const cookiesGetMock = () => 'mockTokenValue'; // Return a mock token value


describe('checkTokenExpiration', () => {
  let dependencies;

  beforeEach(() => {
    dependencies = {
      jwtDecode: jasmine.createSpy().and.callFake(() => ({
        exp: Math.floor(Date.now() / 1000) + 3600 // Assurez-vous que cette valeur simule correctement un token non expiré
      })),
      Cookies: {
        get: jasmine.createSpy().and.callFake(cookiesGetMock),
      },
    };
  });

  // Use the dependencies object in your tests
  it('isValid should return false if token is expired', () => {
    // Setup
    const expiredToken = 'expiredToken';
    dependencies.Cookies.get.and.returnValue(`Bearer ${expiredToken}`);
    dependencies.jwtDecode.and.returnValue({ exp: Math.floor(Date.now() / 1000) - 3600 });

    // Act
    const result = checkTokenExpiration(dependencies);

    // Assert
    expect(result.isValid).toBe(false);
  });

  it('isValid should return false if no token is found', () => {
    // Setup
    dependencies.Cookies.get.and.returnValue(null);
  
    // Act
    const result = checkTokenExpiration(dependencies);
  
    // Assert
    expect(result.isValid).toBe(false);
  });
  
  it('isValid should return true if token is valid and not expired', () => {
    // Setup
    const validToken = 'validToken';
    dependencies.Cookies.get.and.returnValue(`Bearer ${validToken}`);
    dependencies.jwtDecode.and.returnValue({ exp: Math.floor(Date.now() / 1000) + 3600 }); // Token expires in an hour
  
    // Act
    const result = checkTokenExpiration(dependencies);
  
    // Assert
    expect(result.isValid).toBe(true);
  });
  
  it('isValid should return false if token is invalid', () => {
    // Setup
    const invalidToken = 'invalidToken';
    dependencies.Cookies.get.and.returnValue(`Bearer ${invalidToken}`);
    dependencies.jwtDecode.and.callFake(() => { throw new Error('Invalid JWT token'); });
  
    // Act
    const result = checkTokenExpiration(dependencies);
  
    // Assert
    expect(result.isValid).toBe(false);
  });
});