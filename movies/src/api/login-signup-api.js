// login function that takes in a username and password and returns a token and userId
export const login = async (username, password) => { 
    const response = await fetch('http://localhost:8080/api/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
    });
    const data = await response.json();
    return {
      token: data.token,
      userId: data.userId 
    };
  };
  
// signup function that takes in a username and password and returns a token and userId
export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};