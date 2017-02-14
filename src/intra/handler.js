//
//  brigad-backend
//
//  Created on 07/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
import pushpad from 'pushpad';

import config from './config.json';

const exclude = config.excluded_modules;

const url = `https://intra.epitech.eu/course/filter?format=json&&location=${config.intra_city}&&scolaryear=${config.intra_year}`;

const connect = config.url;
const headers = { cookie: config.token };

const project = new pushpad.Pushpad(config.push);

const registrer = async (module, code, instance) => {
  const reg = `https://intra.epitech.eu/module/${config.intra_year}`
    + `/${code}/${instance}/register?format=json`;

  const res = await fetch(reg, { method: 'POST', headers });

  if (res.status !== 401) {
    if (pushpad) {
      const notif = new pushpad.Notification({
        project: project, body: module.title, // max 120 characters
        title: 'Nouvelle module', // optional, defaults to your project name, max 30 characters
        targetUrl: connect, // optional, defaults to your project website
      });
      console.log(await new Promise(resolve => notif.broadcast((err, res) => resolve(err, res))));
    }
    if (config.email) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.email.email,
          pass: config.email.password,
        },
      });
      const options = {
        from: `"INTRA WATCHER" <${config.email.email}>'`,
        to:`"${config.email.name}", ${config.email.email}`,
        subject: 'Nouvelle inscription à ' + module.title,
        text: JSON.stringify(module, null, 2),
        html: JSON.stringify(module, null, 2),
      };
      await new Promise((resolve, reject) => transporter.sendMail(options, function (error, info) {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: ' + info.response);
      }));
    }
  }
  return module;
};

export default async function(event, ctx) {
  let res;

  res = await fetch(connect, { redirect: 'manual' });
  console.log('connection', res.status);
  if (res.status === 302) {
    headers.cookie =
      res.headers.get('set-cookie').slice(0, res.headers.get('set-cookie').indexOf(';'));
    console.log('new token', headers.cookie);
  }


  res = await fetch(url, { headers });

  const modules = await res.json();

  const filtered = modules
    .filter(module => (
        module.open === '1'
        && module.credits !== '0'
        && module.status === 'notregistered'
        && exclude.indexOf(module.code) === -1
      )
    );

  console.log('Selected modules : ', filtered.length);
  /*
   const notif = new pushpad.Notification({
   project: project,
   body: module.title, // max 120 characters
   title: 'Modules trouvés : ' + filtered.length, // optional, defaults to your project name, max 30 characters
   targetUrl: connect, // optional, defaults to your project website
   });

   console.log(await new Promise(resolve => notif.broadcast((err, res) => resolve(err, res))));
   */
  ctx.done(null, await Promise.all(
    filtered.map(async module => {
      console.log(module.code, '->', module.title, ' - ', module.credits);
      return await registrer(module, module.code, module.codeinstance);
    })));
};
