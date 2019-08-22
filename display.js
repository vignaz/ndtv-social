$(function() {
  chrome.storage.sync.get(["dataArr"], function(obj) {
    //var arr = JSON.parse(obj.data.toString());
    //var temp = arr["data"][0];
    //var dis = JSON.parse(temp[0]);
    let displayText = "";
    $.each(obj.dataArr, function(key, value) {
      if (value.hdl) {
        $("#hdl").text(value.hdl);
        $("#news-hdl").text(value.hdl);
      }
      if (value.sec) {
        $("#sec").text(value.sec);
        $("#news-sec").text(value.sec);
      }
      if (value.aut) {
        $("#aut").text(value.aut);
        $("#news-aut").text(value.aut);
      }
      if (value.hdl) {
        $("#img").text(value.img);
        $("#news-img").attr("src", value.img);
      }
    });
  });
});
