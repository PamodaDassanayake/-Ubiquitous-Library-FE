export const getToken = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
   if (username !== null && password !== null){
       const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
       return token;
   }
   return null;
};