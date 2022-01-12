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
i = 0
while (true) {
  url = "https://raw.githubusercontent.com/TechDudie/soulthief/main/posts/post_" + i
  newsfile = new createXHR();
  newsfile.open('GET', url, false);
  newsfile.send();
  if (newsfile.status === 404) {
    break;
  }
  text = newsfile.responseText;
  text = text.split("\n");
  post = "<h3>" + text[0] + "</h3>";
  text.shift();
  text.forEach(function(item, index) {
    post += "\n<p>" + item + "</p>";
  });
  document.getElementById("news").innerHTML += post;
  delete text;
  delete post;
  i++;
}
