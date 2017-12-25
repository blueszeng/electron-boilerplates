const ffi = require('ffi');
const ref = require('ref');
const path = require('path');
var iconv = require('iconv-lite');

var v = require('../utils/util');

// Convert from an encoded buffer to js string.

// const fs = require('fs-jetpack');
// console.log(__filename);
// console.log(ref)
const outStringPtr = ref.refType(ref.types.CString);
const inStringPtr = ref.refType(ref.types.CString);
let libm = ffi.Library('NISEC_SKSC', {
    'PostAndRecvEx': ['void', ['string', outStringPtr]],
});

let outPtr = ref.alloc(ref.types.CString);
libm.PostAndRecvEx('zengyosssngguang', outPtr)
str = iconv.decode(outPtr, 'gb2312');
console.log(str)

let test = async () => {
    let test = `<?xml version="1.0" encoding="gbk"?>
<business id="20001" comment="参数设置">
<body yylxdm="1">
<servletip>服务器IP地址</servletip>
<servletport>服务器端口号</servletport>
<keypwd>税控钥匙口令</keypwd>
</body>
</business>`
    try {
        let vs = await v.xmlToObject(test)
        console.log(vs);
        console.log(v.objectToXml(vs))
    } catch (err) {
        console.error(err);
    }

}
test();

