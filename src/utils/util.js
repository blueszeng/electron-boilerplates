// import xml2js from 'xml2js'
const  xml2js = require('xml2js');

const xmlToObject = async (xml) => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml , function (err, result) {
            if (!!err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}

const objectToXml = (obj) => {
    const builder = new xml2js.Builder();
    let xml = builder.buildObject(obj);
    return xml;
}

// export default {
//     xmlToJson,
//     objectToXml
// }


module.exports = {
    xmlToObject,
    objectToXml
}



