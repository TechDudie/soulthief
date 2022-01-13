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
  var json_url = "https://api.github.com/repos/TechDudie/soulthief/commits?path=posts/post_";
  json_url += post_id;
  var jsonfile = new createXHR();
  jsonfile.open('GET', json_url, false);
  jsonfile.send();
  var json = JSON.parse(jsonfile.responseText());
  var data = json[0]["commit"]["author"];
  return [data["name"], data["date"]];
}
function formatDate(github_date) {
  var date = github_date.split("-");
  date[2] = date[2].split("T")[0];
  return date[1] + "/" + date[2] + "/" + date[0];
}
var base_url = "https://raw.githubusercontent.com/TechDudie/soulthief/main/posts/post_";
var i = 0;
var newsfile;
while (true) {
  var url = base_url + i;
  newsfile = new createXHR();
  newsfile.open('GET', url, false);
  newsfile.send();
  if (newsfile.status === 404) {
    break;
  }
  i++;
}
i--;
var text;
var post;
var post_data;
var post_date;
while (true) {
  url = base_url + i;
  newsfile = new createXHR();
  newsfile.open('GET', url, false);
  newsfile.send();
  if (newsfile.status === 404) {
    break;
  }
  text = newsfile.responseText;
  text = text.split("\n");
  post_data = getJSONData(i);
  post_date = formatDate(data[1]);
  post = "<h3>" + post_date + " - " + post_data[0] + "</h3>";
  text.forEach(function(item, index) {
    post += "\n<p>" + item + "</p>";
  });
  document.getElementById("news").innerHTML += post;
  alert(post);
  i--;
}
