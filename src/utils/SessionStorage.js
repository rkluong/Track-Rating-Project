import store from 'store';

var sessionStorage = module.exports = {
    saveCorner : function(name, value){
        const data = store.get('name');
        if (!data){
            store.set(name, value);
        }else{
            const merged = Object.assign({}, data, value);
            store.set(name, merged);
        }
    },
    getCorner: function(name){
        return store.get(name);
    },
    getCorners: function(){
        return store.get('corner');
    }
}
