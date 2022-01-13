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
function getJSONData(post_id) {
  json_url = "https://api.github.com/repos/TechDudie/soulthief/commits?path=posts/post_";
  json_url += post_id
  jsonfile = new createXHR();
  jsonfile.open('GET', json_url, false);
  jsonfile.send();
  json = jsonfile.responseText();
  json = eval(json);
  data = json[0]["commit"]["author"];
  return [data["name"], data["date"]]
}
base_url = "https://raw.githubusercontent.com/TechDudie/soulthief/main/posts/post_";
i = 0;
while (true) {
  url = base_url + i
  newsfile = new createXHR();
  newsfile.open('GET', url, false);
  newsfile.send();
  if (newsfile.status === 404) {
    break;
  }
  i++;
}
i--;
while (true) {
  url = base_url + i
  newsfile = new createXHR();
  newsfile.open('GET', url, false);
  newsfile.send();
  if (newsfile.status === 404) {
    break;
  }
  text = newsfile.responseText;
  text = text.split("\n");
  post = ""
  text.forEach(function(item, index) {
    post += "\n<p>" + item + "</p>";
  });
  document.getElementById("news").innerHTML += post;
  delete url;
  delete newsfile;
  delete text;
  delete post;
  i--;
}
delete base_url;
