const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
console.log('x')
console.log(x)
const xObject = JSON.parse(x)
console.log('xObject')
console.log(xObject)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn'},
    { logo: 'B', url: 'https://www.bilibili.com'},
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
        console.log(index)
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
      let url = window.prompt('请问你要添加的网址是什么？')
      console.log(url)
      if(url.indexOf('http')!==0){
          url = 'https://' + url
      }
      console.log(url)
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

 $(document).on('keypress', (e)=>{
    const {key} = e
    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
 })