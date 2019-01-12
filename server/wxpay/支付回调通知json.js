var notify = { 
    "appid": ["wx88152eef614c3441"], 
    "bank_type": ["CFT"], 
    "cash_fee": ["3280"], 
    "fee_type": ["CNY"], 
    "is_subscribe": ["N"], 
    "mch_id": ["1515387251"], 
    "nonce_str": ["D8YGQUO42Y8X"], 
    "openid": ["oxw_15Ul35xC40YCRmCxSgzl1trQ"], 
    "out_trade_no": ["1812208316050LP4S"], 
    "result_code": ["SUCCESS"], 
    "return_code": ["SUCCESS"], 
    "sign": ["640464F7556DE726ACBE61FCA935AC74"], 
    "time_end": ["20181221021044"], 
    "total_fee": ["3280"], 
    "trade_type": ["JSAPI"], 
    "transaction_id": ["4200000229201812219415096659"] 
}
console.log(notify);
console.log(notify.appid);
console.log(notify.appid[0]);
let copydata = {}
for (const key in notify) {
    if (notify.hasOwnProperty(key)) {
        const element = notify[key];
        copydata[key] = element[0]
    }
}
console.log(copydata);

