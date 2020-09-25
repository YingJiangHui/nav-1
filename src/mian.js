const dataStr = localStorage.getItem('frontNavSite');
const dataObj = JSON.parse(dataStr || '[]');
let ctrl = false
const map = dataObj.length > 0 ? dataObj : [{ title: 'G', url: 'https://github.com' }, { title: 'C', url: 'https://cssgradient.io/' }, { title: 'U', url: 'https://caniuse.com/' }, { title: 'S', url: 'https://stackoverflow.com/' }, { title: 'D', url: 'https://devdocs.io/' }]

$('.addButton')
    .on('click', function() {
        let siteUrl = window.prompt('输入需要添加的网址')
        if (siteUrl.indexOf('http') !== 0) {
            siteUrl = "https://" + siteUrl
        }
        let title = getUrl(siteUrl)[0]

        let siteObj = {
            title,
            url: siteUrl
        }
        map.push(siteObj);
        localStorage.setItem('frontNavSite', JSON.stringify(map))
        render();
    })

function getUrl(url) {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '');
}

function render() {
    $(".siteList>li").not('li.last').remove();
    map.forEach((item, i) => {
        let color = `rgb(${rgb()},${rgb()},${rgb()})`;
        let $li = $(`
            <li>
                <div class="site">
                    <div class="logo" style="color:${color};">${item['title']}</div>
                    <p class="link" style="color:rgba(0,0,0,0.7);">${getUrl(item['url']) }</p>
                    <svg class="icon chacha">
                    <use xlink:href="#icon-chacha1"></use>
                </svg>
                </div>
            </li>
            `)
            .insertBefore($('.siteList').find('li.last'))
        $li.on('click', function() {
            if (ctrl) {
                window.open(item['url'], '_blank');
            } else {
                window.open(item['url'], '_self');
            }
        })
        $li.on('click', '.chacha', (e) => {
            e.stopPropagation();
            map.splice(i, 1)
            render();
            localStorage.setItem('frontNavSite', JSON.stringify(map))
        })
    })
}

$(window).on('keypress', function(e) {
    if (flag) {
        for (let item of map) {
            if (e.key === item["title"].toLocaleLowerCase()) {
                window.open(item['url'])
            }

        }
    }
})
$(window).on('keydown', function(e) {
    ctrl = true
})
$(window).on('keyup', function(e) {
    ctrl = false
})
$(function() {
    searchTo(localStorage.getItem('SE'));
    render()
})

function rgb() {
    return Math.floor(Math.random() * 256);
}

function searchTo(name) {
    if (name === 'google') {
        $('.search-form')[0].action = 'https://www.google.com/search'
        $('.search-ipt')[0].name = 'q';
        $('.search-ipt')[0].placeholder = "Google"
        $('.btn-g').addClass('btn-active').siblings().removeClass('btn-active')
    } else {
        $('.search-form')[0].action = "https://www.baidu.com/s"
        $('.search-ipt')[0].name = 'wd';
        $('.search-ipt')[0].placeholder = "Baidu"
        $('.btn-b').addClass('btn-active').siblings().removeClass('btn-active')
    }
    $(".search-ipt").focus();
}
$('.btn-g').on('click', function() {
    localStorage.setItem('SE', "google");
    searchTo.call(null, 'google');
})


$('.btn-b').on('click', function() {
    localStorage.setItem('SE', "baidu");
    searchTo.call(null, 'baidu');
})
let flag = true;
$('.search-ipt').on('focus', function(e) {
    $('.btn-active').css({
        border: "4px solid rgba(35, 174, 229, 0.2)",
        borderBottom: "0"
    })
    flag = false
})

$('.search-ipt').on('blur', function() {
    flag = true
    $('.btn-active').css({
        boxShadow: "",
        border: '1px solid #ddd',
    })
})