load('config.js')
function execute(url) {
    let response = fetch(url)
    if (response.ok){
        let txt = response.text()
        let data = JSON.parse(txt.match(/var\s+scope_data\s*=\s*(\[.*?\]);/)[1])
        let list = []
        data.forEach(item =>{
            list.push({
                name: item.post_title +" "+item.member_type,
                url: item.chap_link,
                host: BASE_URL
            })
        })

        return Response.success(list.reverse())
    }
}