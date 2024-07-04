function execute(url){
    let response = fetch(url).text()
    let doc = Html.parse(response)
    // let loginRequired = doc.select('.story_view_permisstion p.yellowcolor').first()
    // if (loginRequired != null) {
    //     return Response.error(`${loginRequired.text()}. Hãy đăng nhập trong trình duyệt Vbook.`)
    // }
    let ssrc = doc.select('.cur p img').first().attr('data-src')
    let sid = response.match(/sid:(\d+)/)[1]
    let cid = response.match(/cid:(\d+)/)[1]
    let expiry = response.match(/expire:(\d+)/)[1]
    let token = response.match(/token:"([0-9a-f.]+)/)[1]
    let ebe_cap = response.match(/action_ebe_captcha\('([^']+)'\)/)[1]
    let bodyform = {
        "iid" : `_0_${generateID()}`,
        "ipoi" :  "1",
        "sid" : sid,
        "cid" : cid,
        "expiry" : expiry,
        "token" : token,
        "src" : ssrc,
    }
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
    let json = fetch(`https://xxmanhwas.net/chaps/img`,{
        method : 'POST',
        headers : {
            'referer': url,
            //'x-requested-with': 'XMLHttpRequest'
        },
        body : bodyform
    }).json();
    let iUrl = `https://${json.media}/${json.src.split('/O')[0]}/`
    let imgs = [];
    doc.select('.cur p img').forEach(it =>{
        imgs.push(iUrl+it.attr('data-src'))
    })
    return Response.success(imgs)
}

function generateID() {
    const chars = '234567abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}