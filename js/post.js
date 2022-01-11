function createXHR() {
  try {
    return new XMLHttpRequest();
  } catch (e) {
    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
      return new ActiveXObject("Msxml2.XMLHTTP");
    }
  }
}
function urlExists(testUrl) {
  http = jQuery.ajax({
    type: "HEAD",
    url: testUrl,
    async: false
  })
  status = http.status != 404;
  delete http;
  return status;
}
