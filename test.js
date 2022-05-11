import React, { useState } from 'react';
const fetch = require("node-fetch");

test('renders correctly',()=>{

    var myUrl = 'http://api.scrapestack.com/scrape?access_key=c9b0848b308efec47d76f40c3d7b297e&url=https://api.hubapi.com/contacts/v1/contact/';
    var myHeader = new fetch.Headers({
        'Authorization': 'Bearer pat-eu1-d148f997-e2dc-499e-a414-790662e47c15',
        'Content-Type': 'application/json'
  });
  fetch(myUrl,{
    method: 'GET',
    headers: myHeader,
  }).then(Response => {
    expect(Response.status).toBe(300);
  })
})