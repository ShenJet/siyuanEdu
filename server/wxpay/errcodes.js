const errcodes = {
    "INVALID_REQUEST":{	
        msg:"参数错误",
        reason:	"参数格式有误或者未按规则上传",
        fix:"订单重入时，要求参数值与原请求一致，请确认参数问题" 
    },
    "NOAUTH":{	
        msg:"商户无此接口权限",
        reason:	"商户未开通此接口权限",
        fix:"请商户前往申请此接口权限" 
    },
    "NOTENOUGH":{	
        msg:"余额不足",
        reason:	"用户帐号余额不足",
        fix:"用户帐号余额不足，请用户充值或更换支付卡后再支付" 
    },
    "ORDERPAID":{	
        msg:"商户订单已支付",
        reason:	"商户订单已支付，无需重复操作",
        fix:"商户订单已支付，无需更多操作" 
    },
    "ORDERCLOSED":{	
        msg:"订单已关闭	",
        reason:	"当前订单已关闭，无法支付",
        fix:"当前订单已关闭，请重新下单"
    },
    "SYSTEMERROR":{	
        msg:"系统错误",
        reason:	"系统超时",
        fix:"系统异常，请用相同参数重新调用" 
    },
    "APPID_NOT_EXIST":{	
        msg:"APPID不存在",
        reason:	"参数中缺少APPID",
        fix:"请检查APPID是否正确" 
    },
    "MCHID_NOT_EXIST":{	
        msg:"MCHID不存在",
        reason:	"参数中缺少MCHID",
        fix:"请检查MCHID是否正确" 
    },
    "APPID_MCHID_NOT_MATCH":{	
        msg:"appid和mch_id不匹配",
        reason:	"appid和mch_id不匹配",
        fix:"请确认appid和mch_id是否匹配" 
    },
    "LACK_PARAMS":{	
        msg:"缺少参数",
        reason:	"缺少必要的请求参数",
        fix:"请检查参数是否齐全" 
    },
    "OUT_TRADE_NO_USED":{	
        msg:"商户订单号重复",
        reason:	"同一笔交易不能多次提交",
        fix:"请核实商户订单号是否重复提交" 
    },
    "SIGNERROR":{	
        msg:"签名错误",
        reason:	"参数签名结果不正确",
        fix:"请检查签名参数和方法是否都符合签名算法要求" 
    },
    "XML_FORMAT_ERROR":{	
        msg:"XML格式错误",
        reason:	"XML格式错误",
        fix:"请检查XML参数格式是否正确" 
    },
    "REQUIRE_POST_METHOD":{	
        msg:"请使用post方法",
        reason:	"未使用post传递参数",
        fix:"	请检查请求参数是否通过post方法提交" 
    },
    "POST_DATA_EMPTY":{	
        msg:"post数据为空",
        reason:	"post数据不能为空",
        fix:"请检查post数据是否为空" 
    },
    "NOT_UTF8":{	
        msg:"编码格式错误",
        reason:	"未使用指定编码格式",
        fix:"请使用UTF-8编码格式" 
    },
}
module.exports = errcodes