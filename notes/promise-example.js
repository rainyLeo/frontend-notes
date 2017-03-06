/*eslint-disable*/
let promiseClean = new Promise(function (resolve, reject) {

  let isClean = false;

  if (isClean) {
    resolve('Clean');
  } else {
    reject('not Clean');
  }
});

promiseClean.then(function (fromResolve) {
  console.log('this room is ' + fromResolve);
}).catch(function (fromReject) {
  console.log('this room is ' + fromReject);
});

// 2.
let cleanRoom = function () {
  return new Promise(function (resolve, reject) {
    resolve('Cleaned the room');
  });
};

let removeGarbage = function (message) {
  return new Promise(function (resolve, reject) {
    resolve(message + ' remove Garbage');
  });
};

let winIcecream = function (message) {
  return new Promise(function (resolve, reject) {
    resolve(message + ' won icecream');
  });
};

cleanRoom().then(function (result) {
  return removeGarbage(result);
}).then(function (result) {
  return winIcecream(result);
}).then(function (result) {
  console.log('finished ' + result);
});

Promise.all([cleanRoom(), removeGarbage(), winIcecream(),]).then(function () {
  console.log(' all fineshed');
});

Promise.race([cleanRoom(), removeGarbage(), winIcecream(),]).then(function () {
  console.log(' one of them fineshed');
});

// 3.
new Promise(function (resolve, reject) {
  var img = document.createElement('img');
  img.src = './images/penguin1.jpg';
  img.onload = resolve;
  img.onerror = reject;
  document.body.appendChild(img);
}).then(function (resolveValue) {
  console.log('images loaded');
}).catch(function (rejectValue) {
  console.log('error');
});

// XHR
function get(url) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function () {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(Error("Network Error"));
    };
    req.send();
  });
}
get('story.json').then(function (response) {
  console.log("Success!", JSON.parse(response));
}).catch(function (error) {
  console.error("Failed!", error);
})

/* use promise get story page from google developer
https://developers.google.com/web/fundamentals/getting-started/primers/promises#promise-terminology
Demo: https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-all-example.html
*/
var fakeSlowNetwork;
(function () {
  var lsKey = 'fake-slow-network';
  var networkFakeDiv = document.querySelector('.network-fake');
  var checkbox = networkFakeDiv.querySelector('input');

  fakeSlowNetwork = Number(localStorage.getItem(lsKey)) || 0;

  networkFakeDiv.style.display = 'block';
  checkbox.checked = !!fakeSlowNetwork;

  checkbox.addEventListener('change', function () {
    localStorage.setItem(lsKey, Number(checkbox.checked));
    location.reload();
  });
}());

function spawn(generatorFunc) {
  function continuer(verb, arg) {
    var result;
    try {
      result = generator[verb](arg);
    } catch (err) {
      return Promise.reject(err);
    }
    if (result.done) {
      return result.value;
    } else {
      return Promise.resolve(result.value).then(callback, errback);
    }
  }
  var generator = generatorFunc();
  var callback = continuer.bind(continuer, "next");
  var errback = continuer.bind(continuer, "throw");
  return callback();
}

function wait(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

function get(url) {
  // Return a new promise.
  // We do all the work within the constructor callback.
  var fakeNetworkWait = wait(3000 * Math.random() * fakeSlowNetwork);

  var requestPromise = new Promise(function (resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('get', url);

    req.onload = function () {
      // 'load' triggers for 404s etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      } else {
        // Otherwise reject with the status text
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function () {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });

  return Promise.all([fakeNetworkWait, requestPromise,]).then(function (results) {
    return results[1];
  });
}

function getJson(url) {
  return get(url).then(JSON.parse);
}

function getSync(url) {
  var startTime = Date.now();
  var waitTime = 3000 * Math.random() * fakeSlowNetwork;

  var req = new XMLHttpRequest();
  req.open('get', url, false);
  req.send();

  while (waitTime > Date.now() - startTime) 
  ;

  if (req.status == 200) {
    return req.response;
  } else {
    throw Error(req.statusText || "Request failed");
  }
}

function getJsonSync(url) {
  return JSON.parse(getSync(url));
}

function getJsonCallback(url, callback) {
  getJson(url).then(function (response) {
    callback(undefined, response);
  }, function (err) {
    callback(err);
  });
}

var storyDiv = document.querySelector('.story');

function addHtmlToPage(content) {
  var div = document.createElement('div');
  div.innerHTML = content;
  storyDiv.appendChild(div);
}

function addTextToPage(content) {
  var p = document.createElement('p');
  p.textContent = content;
  storyDiv.appendChild(p);
}

// in script tag
getJson('story.json').then(function (story) {
  addHtmlToPage(story.heading);

  // Take an array of promises and wait on them all
  return Promise.all(
  // Map our array of chapter urls
  // to an array of chapter json promises
  story.chapterUrls.map(getJson));
}).then(function (chapters) {
  // Now we have the chapters jsons in order! Loop thorugh…
  chapters.forEach(function (chapter) {
    // …and add to the page
    addHtmlToPage(chapter.html);
  });
  addTextToPage("All done");
}).catch(function (err) {
  // catch any error that happened along the way
  addTextToPage("Argh, broken: " + err.message);
}).then(function () {
  document.querySelector('.spinner').style.display = 'none';
});

// version 2: When chapter one arrives we should add it to the page. This lets the user start reading before the rest of the chapters have arrive
// 
//  getJson('story.json').then(function (story) {
//   addHtmlToPage(story.heading);
// 
//   // Map our array of chapter urls
//   // to an array of chapter json promises
//   return story.chapterUrls.map(getJson).reduce(function (chain, chapterPromise) {
//     // Use reduce to chain the promises together,
//     // but adding content to the page for each chapter
//     return chain.then(function () {
//       return chapterPromise;
//     }).then(function (chapter) {
//       addHtmlToPage(chapter.html);
//     });
//   }, Promise.resolve());
// }).then(function () {
//   addTextToPage("All done");
// }).catch(function (err) {
//   // catch any error that happened along the way
//   addTextToPage("Argh, broken: " + err.message);
// }).then(function () {
//   document.querySelector('.spinner').style.display = 'none';
// });
// 

