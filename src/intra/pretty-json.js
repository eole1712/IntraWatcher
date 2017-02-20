//
//  TwitterBots
//
//  Created on 18/02/2017
//  Copyright (c) 2017 Brigad. All rights reserved.
//


import jade from 'jade';

export default class {
  static toHtml(obj) {
   return jade.renderFile('src/intra/template.jade', {
     message: this.prettyPrint(obj),
     title: 'Modules'
   });
  }

  static replace(match, pIndent, pKey, pVal, pEnd) {
    const key = '<span class=json-key>';
    const val = '<span class=json-value>';
    const str = '<span class=json-string>';
    let r = pIndent || '';
    if (pKey)
      r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
    if (pVal)
      r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
    return r + (pEnd || '');
  }

  static prettyPrint(obj) {
    const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    return JSON.stringify(obj, null, 3)
      .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(jsonLine, this.replace);
  }
};
