document.addEventListener('DOMContentLoaded', () => {
  console.log('this is store_location.js')
  const selector = '#deleteUrl';
  if(document.querySelector(selector)){
    //すべてのselector要素にイベントを設定する。
    var btns = document.querySelectorAll(selector)
    for(var i = 0; i < btns.length; i++){
      btns[i].onclick = function() {
        //cookieに元居たページのurlを保存しておく
        document.cookie = `forwarding_url=${location.href};path=/`
      }
    }
  }
})