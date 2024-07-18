function execute(url){
    let doc = fetch(url).html()
    let ssrc = doc.select('.cur p img').first().attr('data-src')
    if(!ssrc){
        return Response.error("Truyện yêu cầu tài khoản!")
    } 
    let sid = /sid:(\d+)/.exec(doc)[1]
    let cid = /cid:(\d+)/.exec(doc)[1]
    let expire = /expire:(\d+)/.exec(doc)[1]
    let token = /token:"([0-9a-f.]+)/.exec(doc)[1]
    let ebe_cap = /action_ebe_captcha\('([^']+)'\)/.exec(doc)[1]
    let bodyform = {
        "iid" : `_0_${generateID()}`,
        "ipoi" :  "1",
        "sid" : sid,
        "cid" : cid,
        "expire" : expire,
        "token" : token,
        "src" : ssrc,
    }
    let checkLogin = doc.select('.top-login-menu').text();
    if (checkLogin.indexOf('Đăng xuất') === -1){
        const res = fetch(`https://xxmanhwas.net/${ebe_cap}?_wpnonce=e732af2390628a21d8b7500e621b1493c28d9330b415e88f27b8b4e2f9a440a3`, {
            method: 'POST',
            headers : {
                'referer': url,
                'x-requested-with': 'XMLHttpRequest'
            },
            body: {'nse': Math.random().toString()}
        }).html();
        let el = res.select('input')
        el.forEach(item =>{
            let name = item.attr('name');
            bodyform[name] = item.attr('value');
        })
        bodyform['doing_ajax'] = 1;
    }
    let json = fetch(`https://xxmanhwas.net/chaps/img`,{
        method : 'POST',
        headers : {
            'referer': url,
            //'x-requested-with': 'XMLHttpRequest'
        },
        body : bodyform
    }).json();
    let isFree = json.is_free
    let iUrl = `https://${json.media}/${json.src.split('/O')[0]}`
    let imgs = [];
    if(isFree === 1){
        doc.select('.cur p img').forEach(it =>{
            var img = "/" + it.attr('data-src')
            imgs.push(iUrl + img)
        })
        return Response.success(imgs)
    }else{
        imgs.push(iUrl)
        let el = doc.select('.cur p img');
        for (let i = 1;i < el.size(); i++) {
            var e = el.get(i);
            let src = e.attr('data-src')
            let json1 = fetch(`https://xxmanhwas.net/chaps/img`,{
                method : 'POST',
                headers : {
                    'referer': url,
                    //'x-requested-with': 'XMLHttpRequest'
                },
                body : {
                    "iid" : `_0_${generateID()}`,
                    "ipoi" :  i + 1,
                    "sid" : sid,
                    "cid" : cid,
                    "expire" : expire,
                    "token" : token,
                    "src" : src,
                }
            }).json();
            let simg = `https://${json1.media}/${json1.src.split('/O')[0]}`
            imgs.push(simg)
        }
        return Response.success(imgs)
    }
}
function generateID() {
    const chars = '234567abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}