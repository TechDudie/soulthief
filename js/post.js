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
i = 0
while (true) {
  url = "https://raw.githubusercontent.com/TechDudie/soulthief/main/posts/post_" + i
  if (urlExists(url)) {
    newsfile = new createXHR();
    newsfile.open('GET', url, false);
    newsfile.send();
    document.getElementById("news").innerHTML += newsfile.responseText;
  } else {
    break;
  }
  i++;
}
