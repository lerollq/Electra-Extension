var data = null;
var dataEth = null
var $currentWindow;

$(function () {
  initApp();
  addEventListener();
  getMyWallet();
});

function initApp(){
  $("#moreData").toggle();
  $currentWindow = $("#Statistics");
  fetchData();
  setData();
  setColorChanges();
 }

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

  function fetchData(){
      data = getJson("https://api.coinmarketcap.com/v1/ticker/electra/");
      dataEth = getJson("https://api.coinmarketcap.com/v1/ticker/ethereum/");
  }

  function setData()
  {
      $("#rank").text(data[0]['rank']);
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
  }


  function setColorChanges()
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



  function addEventListener()
  {
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
    $("#more").click(function(){
        $("#moreData").toggle();
        $(this).toggleClass("change");
    });
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
  $currentWindow.hide();
  switch(current){
    case "wallet-window":
     $currentWindow = $("#Wallet");
      break;
    case "stats-window":
     $currentWindow =  $("#Statistics");
      break;
    case "exchange-window":
      $currentWindow =  $("#Exchanges");
      break;
    case "info-window":
      $currentWindow =  $("#Info");
      break;
  }
  $currentWindow.show();
}
