/**
 * Post request to the server
 * 
 * @param {string} url 
 * @param {object} body
 */
export const post = async (url, body) => {
  fetch(url, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.5",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
      "Sec-GPC": "1",
      "Content-Type": "application/json",
    },
    referrer: "http://fyp.anweshb.com/",
    method: "POST",
    body: JSON.stringify(body),
    mode: "cors",
  });
};
