const cp = require('copy-dir');

const copyLogin = ()=>{
    cp.sync('./WingSureAdminLogin','./dist/WingSureAdminLogin',{
    utimes: true, 
    mode: true,    
    cover: true    
  });
};

copyLogin();