const o=e=>e.replace(/“/g,"「").replace(/”/g,"」"),a=(e,r="second")=>{const t=/\{([^,]+),([^}]+)\}/g;return e.replace(t,(n,s,c)=>r==="first"?s:c)};export{o as r,a as t};
