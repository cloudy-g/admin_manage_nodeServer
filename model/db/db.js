let axios = require('axios')

let {
    AccountList
} = require('./dbmodel');

axios
    .get('http://123.207.32.32:8000/home/multidata')
    .then(res => {
    
        let bannerList = res.data.data.banner.list;
        recommendList.forEach(element => {
            new RecommendList(element).save(err => console.log(err));
        });

    })