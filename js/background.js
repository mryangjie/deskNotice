$(document).ready(function(){

	// 通知 
	// chrome.extension.
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if(request.cmd=='notify'){
			notify(request.type);
			sendResponse('ok');
		}
	})

	function notify(ntype){
		let opt=null;
		switch(ntype){
			case 'basic':
				opt= {
					type: ntype,
					title: "桌面提醒",
					message: "中大奖了！",
					iconUrl: "../images/icon128.png",
				}
				break;
			case 'image':
				opt= {
					type: ntype,
					title: "桌面提醒",
					message: "中大奖了！",
					iconUrl: "../images/icon128.png",
					imageUrl:"../images/image.jpg",
				}
			break;
			case 'list':
				opt= {
					type: ntype,
					title: "桌面提醒",
					message: "中大奖了！",
					iconUrl: "../images/icon128.png",
					items: [{ title: "1.", message: "下班了"},
						{ title: "2.", message: "吃饭了."},
						{ title: "3.", message: "中奖了."}
					]
				}
			break;
			case 'progress':
				opt= {
					type: ntype,
					title: "桌面提醒",
					message: "当前进度...",
					iconUrl: "../images/icon128.png",			
					progress:80
				}
			break;
			}	
		chrome.notifications.create('',opt,function(){
		})
	}


	// 拦截
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
		chrome.tabs.query({}, tabs => {
			let a = [];
			let	host = '';
			let	tabId = '';
				
			tabs.map( list =>{ 
				if(list.active == true){
					a = {
						id: list.id,
						url: list.url
					}
				}
			})

			host = a.url.split('/')[2];  //document.domain;
			tabId = a.id
			if(host.indexOf(".taobao.com") == -1 && host.indexOf(".tmall.com") == -1) return; 

			chrome.tabs.update(tabId, {
				'url': 'https://element.eleme.cn/#/zh-CN/component/layout',
				'selected': true
			});
		})
	})

});

