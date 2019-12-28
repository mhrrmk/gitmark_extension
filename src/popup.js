let query = document.getElementById('query');
let go = document.getElementById('go');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

query.onclick = function(element) {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      console.log(tabs)
    });
  };
go.onclick = (element)=>{
  chrome.tabs.create({url: "src/ui/ui.html"}, (tab)=>{})
}