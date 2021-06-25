import AsyncStorage from '@react-native-community/async-storage';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId, token });
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVpiBdRr1dVhNLFZxPh2mdTPz7fX8K0eQ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already.';
      }
      throw new Error(message);
    }
    const resData = await response.json();
    dispatch(
      authenticate(resData.localId, resData.idToken, +resData.expiresIn * 1000)
    );
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};
export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVpiBdRr1dVhNLFZxPh2mdTPz7fX8K0eQ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_NOT_FOUND' || errorId === 'INVALID_PASSWORD') {
        message = 'Invalid email/password';
      }
      throw new Error(message);
    }
    const resData = await response.json();
    dispatch(
      authenticate(resData.localId, resData.idToken, +resData.expiresIn * 1000)
    );
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
