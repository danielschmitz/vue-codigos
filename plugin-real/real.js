module.exports = {
	install: function (Vue, options) {
        Vue.filter('real', function() {
            var tmp = arguments[0]+'';
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
            if( tmp.length > 6 )
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            return 'R$ ' + tmp;
        })
    }
}
