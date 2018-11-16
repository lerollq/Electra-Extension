
$(function () {

  // $("#moreData").toggle();
  addEventListener();
  setData();
  getMyWallet();
});

function getJson(url) {
 return JSON.parse($.ajax({
     type: 'GET',
     url: url,
     dataType: 'json',
     global: false,
     async:false,
     success: function(data) {
         return data;
     }
 }).responseText);
}

  function setData()
  {
      data = getJson("https://api.coinmarketcap.com/v1/ticker/electra/");
      dataEth = getJson("https://api.coinmarketcap.com/v1/ticker/ethereum/");

      $("#rank").text(data[0]['rank']);
      var ethPrice = 
      $("#ethPrice").text((parseFloat(data[0]['price_usd'])/parseFloat(dataEth[0]['price_usd'])).toFixed(8));
      $("#usdPrice").text("$"+parseFloat(data[0]['price_usd']).toFixed(6).toLocaleString("en-US"));
      $("#marketCap").text("$"+parseFloat(data[0]['market_cap_usd']).toLocaleString("en-US"));
      $("#totalSupply").text(parseFloat(data[0]['total_supply']).toLocaleString("en-US"));
      $("#circulatingSupply").text(parseFloat(data[0]['available_supply']).toLocaleString("en-US"));
      $("#maxSupply").text(parseInt(data[0]['max_supply']).toLocaleString("en-US"));
      $("#volume24").text("$"+parseInt(data[0]['24h_volume_usd']).toLocaleString("en-US"));
      $("#btcPrice").text(parseFloat(data[0]['price_btc']).toFixed(8));
      $("#change1h").text(data[0]['percent_change_1h'] + " %");
      $("#change24h").text(data[0]['percent_change_24h']+ " %");
      $("#change7d").text(data[0]['percent_change_7d']+ " %");
      setColor();
  }


  function setColor()
  {
      if (parseFloat(data[0]['percent_change_1h']) < 0)
        $("#change1h").addClass("price_down");
      else 
        $("#change1h").addClass("price_up");
      if (parseFloat(data[0]['percent_change_24h']) < 0)
        $("#change24h").addClass("price_down");
      else 
        $("#change24h").addClass("price_up");
      if (parseFloat(data[0]['percent_change_7d']) < 0)
        $("#change7d").addClass("price_down");
      else 
        $("#change7d").addClass("price_up");
  }



function getMyWallet()
{
  var ecaAmount = parseInt(getCookie("ecaAmount")).toFixed(6);
  if (isNaN(ecaAmount))
    ecaAmount = 0.0;
  uPrice = ecaAmount * parseFloat(data[0]['price_usd']);
  bPrice = ecaAmount * parseFloat(data[0]['price_btc']);
  $("#ecaAmount").text(parseFloat(ecaAmount));
  $("#ecaPriceUSD").text("$" + uPrice.toFixed(6));
  $("#ecaPriceBTC").text(bPrice.toFixed(8));
}

function setCookieEca()
{
  var eca = document.getElementById("inputEcaAmount").value;
  if(isNaN(parseFloat(eca)))
    return ;
  setCookie("ecaAmount", parseFloat(eca), 365);
  getMyWallet();
}

 function download_data_uri(dataURI, fileName) {
    var tempUrl = make_url_from_data(dataURI);
    var link = $('<a href="' + tempUrl + '" id="download" download="' + fileName + '" target="_blank"> </a>');
    $("body").append(link);
    $("#download").get(0).click();
  }

  function make_url_from_data(dataURI) {
    var blob = make_blob(dataURI);
    var tempUrl = URL.createObjectURL(blob);
    return tempUrl;
  }

  function make_blob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    };
    return new Blob([ab], {
      type: mimeString
    });
  }

  function addEventListener() {
    $("#stats-window").addClass('active');
    $("#btn-discord").click(function(){
        window.open('https://discordapp.com/invite/B8F7Jdv', '_blank').focus();
    });
    $("#btn-facebook").click(function(){
        window.open('https://www.facebook.com/Electracoineca/', '_blank').focus();
    });
    $("#btn-instagram").click(function(){
        window.open('https://www.instagram.com/electracoin/', '_blank').focus();
    });
    $("#btn-twitter").click(function(){
        window.open('https://twitter.com/electracoineca', '_blank').focus();
    });
    $("#btn-telegram").click(function(){
        window.open('https://t.me/Electracoin', '_blank').focus();
    });
    $("#btn-website").click(function(){
        window.open('https://electraproject.org/', '_blank').focus();
    });
    $("#wallet-window").click(function(){
        displayCurrent("wallet-window");
    });
    $("#stats-window").click(function(){
        displayCurrent("stats-window");
    });
     $("#exchange-window").click(function(){
        displayCurrent("exchange-window");
    });
     $("#info-window").click(function(){
        displayCurrent("info-window");
    });
    $("#submitWallet").click(function(){
        setCookieEca();
    });
    $("#btn-screenshot").click(function(){
      html2canvas(document.body).then(function(canvas) {downloadScreenshot(canvas)})
      });
  }

  function downloadScreenshot(canvas){
        var c = canvas.toDataURL('image/png');
        download_data_uri(c, "electa-screenshot");      
  }


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function displayCurrent(current)
{
  switch(current){
    case "wallet-window":
      $("#Statistics").hide();
      $("#Exchanges").hide();
      $("#Info").hide();
      $("#Wallet").show();
      $("#stats-window").removeClass('active');
      $("#exchange-window").removeClass('active');
      $("#wallet-window").addClass('active');
      break;
    case "stats-window":
      $("#Wallet").hide();
      $("#Exchanges").hide();
      $("#Info").hide();
      $("#Statistics").show();
      $("#stats-window").addClass('active');
      $("#exchange-window").removeClass('active');
      $("#wallet-window").removeClass('active');
      break;
    case "exchange-window":
      $("#Statistics").hide();
      $("#Wallet").hide();
      $("#Info").hide();
      $("#Exchanges").show();
      $("#stats-window").removeClass('active');
      $("#exchange-window").addClass('active');
      $("#wallet-window").removeClass('active');
      break;
    case "info-window":
      $("#Statistics").hide();
      $("#Wallet").hide();
      $("#Exchanges").hide();
      $("#Info").show();
      $("#stats-window").removeClass('active');
      $("#exchange-window").removeClass('active');
      $("#wallet-window").removeClass('active');
      break;
  }

 

  

}

ImageSaver = {
  download_data_uri: function(dataURI, fileName) {
    var tempUrl = ImageSaver.make_url_from_data(dataURI);
    var link = $('<a href="' + tempUrl + '" id="download" download="' + fileName + '" target="_blank"> </a>');
    $("body").append(link);
    $("#download").get(0).click();
  },

  make_url_from_data: function(dataURI) {
    var blob = ImageSaver.make_blob(dataURI);
    var tempUrl = URL.createObjectURL(blob);
    return tempUrl;
  },

  make_blob: function(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    };
    return new Blob([ab], {
      type: mimeString
    });
  }
}