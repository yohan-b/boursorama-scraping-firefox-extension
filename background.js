function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.ondata = event => {
    let str = decoder.decode(event.data, {stream: true});
    // Just change any instance of Example in the HTTP response
    // to WebExtension Example.
    //str = str.replace(/Example/g, 'WebExtension Example');
    console.log(str)
    console.log(details.url)

    var request = new XMLHttpRequest();
    request.open("POST", "http://ovh1:3000/add");
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("X-API-KEY", "FIXME");
    request.overrideMimeType("text/plain");
    request.onload = function()
    {
        alert("Response received: " + request.responseText);
    };
    request.send('{"volume": 1234, "price": 12.3, "metric": "BNP", "time": "2020-04-23T13:31:21.643Z"}');

    filter.write(encoder.encode(str));
    filter.disconnect();
  }

  return {};
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["https://www.boursorama.com/bourse/action/graph/ws/UpdateCharts*"], types: ["xmlhttprequest"]},
  ["blocking", "requestBody"]
);

