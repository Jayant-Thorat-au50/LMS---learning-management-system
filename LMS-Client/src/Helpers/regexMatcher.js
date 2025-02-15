
export  const isEmail = (email) => {
   return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
};

export  const isPassword = (password) => {
   return password.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
};