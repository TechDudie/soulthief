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
    text = newsfile.responseText;
    text = text.split("\n");
    post = "<h3>" + text[0] + "</h3>";
    text.shift();
    text.forEach(function(item, index) {
      post += "\n<p>" + item + "</p>";
    });
    document.getElementById("news").innerHTML += post;
    delete newsfile;
    delete text;
    delete post;
  } else {
    break;
  }
  i++;
}
