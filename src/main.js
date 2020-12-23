const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.amazon.com'},
    { logo: 'B', url: 'https://www.bing.com'},
    { logo: 'C', url: 'https://www.csdn.net'},
    { logo: 'D', url: 'https://www.douban.com'},
    { logo: 'G', url: 'https://www.github.com'},
];
const simplifyUrl=(url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/, '')  // 删除 / 开头的内容
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
             <svg class="icon">
             <use xlink:href="#icon-close"></use>
             </svg>
            </div>
        </div>
    </li>`).insertBefore($lastLi)
    $li.on('click', ()=>{
        window.open(node.url)
    })
    $li.on('click','.close',(e)=>{
        console.log('NO!')
        e.stopPropagation()  // 组织冒泡
        console.log(hashMap)
        hashMap.splice(index, 1)  // 如果用webstorm此处会有注释，vscode没有
        render()
    })
    })
    }

render()

$('.addButton')
  .on('click',()=>{
      let url = window.prompt('请输入你要添加的网站地址')
      if(url.indexOf('http')!==0){
          url = 'https://' + url
      }
      hashMap.push({
          logo: simplifyUrl(url)[0].toUpperCase(), 
          logoType: 'text',
          url:url
        });
        render()
      });

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
 }

 // $(document).on('keypress', (e)=>{
 //    const {key} = e
 //    for(let i=0; i<hashMap.length; i++){
 //        if(hashMap[i].logo.toLowerCase() === key){
 //            window.open(hashMap[i].url)
 //        }
 //    }
 // })

$("#lLogo").wrap("<a href='https://github.com/ST2020wa/nav-1'></a>");
