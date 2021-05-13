const CRYPTOGRAPH = [
    //          '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'
    'l', 'M', 'u', 'I', 'P', 'e', 'F', 'Z', 'r', 'C', 'a',
    'k', 'h', 'K', '9', 'b', 'B', '6', '7', 'H', 'y', 'W',
    't', 'Y', '5', 'm', 'q', 'x', 'J', 'j', 'i', 'N', 'v',
    'T', 'S', 'G', 'U', 'c', '3', 's', '8', '2', 'z', 'L',
    'D', 'w', 'V', 'p', 'g', 'R', 'n', 'Q', 'X', '1', 'A',
    'O', '0', 'f', '4', 'E', 'd', 'o', 'l', 'M', 'u', 'I',
    'P', 'e', 'F', 'Z', 'r', 'C', 'a'
]

export const decodePhone = function(phone){
    if(!phone){
        return "";
    }
    var vChar = phone.split("");
    var sk = CRYPTOGRAPH.indexOf(vChar[0]);
    if (sk < 0 || sk>62 ) {
        return "";
    }
    var subpath = CRYPTOGRAPH.slice(sk,sk+11);
    var dChar = vChar.slice(1).map(item=>{
        var ind = subpath.indexOf(item);
        if(ind>9){
            return "-"
        }else{
            return ind
        }
    })
    return dChar.join("");
}

export const encodePhone = function(phone){
    if (!phone) {
        return "";
    }
    var vChar = phone.split("");
    var sk = Math.floor(Math.random() * 62)
    var subpath = CRYPTOGRAPH.slice(sk, sk+11);
    var eChar = vChar.map(item => {
        if (item == "-") {
            return subpath[10];
        } else {
            return subpath[item]
        }
    })
    return CRYPTOGRAPH[sk] + eChar.join("");
}

