const toString = Object.prototype.toString;

export const isObject = (para)=>{
	return toString.call(para)==="[object Object]"
}
export const isArray = (para)=>{
	return toString.call(para)==="[object Array]"
}
export const equal = function(m,n){
	var mt = toString.call(m),nt = toString.call(n);
	if(mt==nt){
		if(mt=="[object Array]"||mt=="[object Object]"){
			var mk = Object.keys(m),nk = Object.keys(n);
			if(mk.length==nk.length){
				for(var i=0;i<mk.length;i++){
					if(n.hasOwnProperty(mk[i])){
						if(!equal(m[mk[i]],n[mk[i]])){
							return false;
						}
					}else{
						return false;
					}
				}
			}else{
				return false;
			}
			return true;
		}else{
			if(mt=="[object Number]"&&isNaN(m)&&isNaN(n)){

			}else{
				return m==n;
			}
		}
	}else{
		return false
	}
}