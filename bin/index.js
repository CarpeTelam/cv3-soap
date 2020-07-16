const soapRequest = require('easy-soap-request');
const fs = require('fs');
const { js2xml, xml2js } = require("xml-js");

const xmlData = "./data/jld-5053.xml"

require("dotenv").config({
  path: `.env`
});

const _declaration = {
  _attributes: {
    version: "1.0",
    encoding: "utf-8"
  }
};

const request = {
  authenticate: {
    user: { _text: process.env.CV3_USER },
    pass: { _text: process.env.CV3_PASS },
    serviceID: { _text: process.env.CV3_SERVICE_ID }
  }
};

const CV3DataRaw = fs.readFileSync(xmlData, 'utf-8');
const { CV3Data: { _attributes, products } } = xml2js(CV3DataRaw, { compact: true });

const CV3DataXML = js2xml(
  {
    _declaration,
    CV3Data: {
      _attributes,
      request,
      products
    }
  }, {
    compact: true,
  }
);

const CV3DataBase64 = Buffer.from(CV3DataXML, "ascii").toString("base64");

const xml = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2001/12/soap-envelope" SOAP-ENV:encodingStyle="http://www.w3.org/2001/12/soap-encoding"><SOAP-ENV:Body><m:CV3Data xmlns:m="http://soapinterop.org/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><data xsi:type="xsd:string">' + CV3DataBase64 + '</data></m:CV3Data></SOAP-ENV:Body></SOAP-ENV:Envelope>';

const url = 'https://service.commercev3.com/';
const requestHeaders = {
  'Accept': 'text/xml',
  'Content-Type': 'text/xml',
  'soapAction': 'https://service.commercev3.com/index.php/CV3Data',
  'user-agent': 'nodejs soap client',
};

(async () => {
  const { response } = await soapRequest({ url, headers: requestHeaders, xml, timeout: 60000 });
  const { headers, body, statusCode } = response;
  console.log(headers);
  console.log(Buffer.from(xml2js(body, { compact: true })['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:CV3DataResponse']['return']['_text'], "base64").toString('ascii'));
  console.log(statusCode);
})();
