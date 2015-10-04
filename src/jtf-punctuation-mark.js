// LICENSE : MIT
"use strict";
import {isUserWrittenNode} from "./util/node-util";
// 1.2. 句読点の使用
export default function punctuationMark(context) {
    let {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            // 1.2.1. 句点(。)と読点(、)
            if (/[,\.][亜-熙ぁ-んァ-ヶ]/.test(text) || /[亜-熙ぁ-んァ-ヶ][,\.]/.test(text)) {
                report(node, new RuleError("句読点には全角の「、」と「。」を使います。和文の句読点としてピリオド(.)とカンマ(,)を使用しません。"));
            }
            // 1.2.2. ピリオド(.)とカンマ(,)
            if (/[．，]/.test(text)) {
                report(node, new RuleError("全角のピリオドとカンマは使用しません。"));
            }
        }
    }
}