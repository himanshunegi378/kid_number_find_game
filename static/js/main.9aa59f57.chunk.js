(this.webpackJsonpkid_number_find_game=this.webpackJsonpkid_number_find_game||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var r=n(1),s=n.n(r),c=n(6),i=n.n(c),a=(n(14),n(15),n(2)),o=n(4),u=n(7),l=n.n(u),j=n(3),b=n.n(j),d=n(0);function f(e){var t=e.answers,n=e.disabled,s=void 0!==n&&n,c=e.onAnswerClick;return Object(d.jsx)(r.Fragment,{children:Object(d.jsx)("ul",{className:"".concat(b.a.answer_list," ").concat(s&&b.a.answer_list__disabled),children:t.map((function(e,t){return Object(d.jsx)("li",{className:b.a.answer_item,onClick:function(){!function(e){s||c(e)}(t)},children:e},t)}))})})}var h=n(8),_=n.n(h),w=function(){var e={question:"",answers:[]},t=Math.floor(100*Math.random())+1;e.question=_.a.toWords(t).toUpperCase();for(var n=0;n<3;n++){var r=Math.floor(100*Math.random())+1;t!==r&&e.answers.push({answer:r.toString(),correct:!1})}return e.answers.push({answer:t.toString(),correct:!0}),e.answers=function(e){for(var t=e.answers.slice(),n=[];t.length>0;){var r=Math.floor(Math.random()*t.length);n.push(t[r]),t.splice(r,1)}return n}(e),e},O=n(9),g=Object(r.createContext)({speak:function(){}});function x(e){var t=e.children,n=Object(O.useSpeechSynthesis)(),s=n.speak,c=n.cancel,i=n.speaking,a=n.supported,o=Object(r.useCallback)((function(e){a&&(i&&c(),s(e))}),[c,s,i,a]);return Object(d.jsx)(g.Provider,{value:{speak:o},children:t})}function p(){return Object(r.useContext)(g).speak}function v(e){var t=e.score,n=p();return Object(d.jsxs)("div",{style:{fontSize:"xx-large",fontWeight:500},children:["Score : ",Object(d.jsx)("i",{onClick:function(){n({text:t.toString()})},children:t})]})}function m(){var e=Object(r.useState)(w()),t=Object(o.a)(e,2),n=t[0],s=n.question,c=n.answers,i=t[1],u=Object(r.useState)({right:0,wrong:0}),j=Object(o.a)(u,2),b=j[0],h=j[1],_=Object(r.useState)(!1),O=Object(o.a)(_,2),g=O[0],x=O[1],m=p();Object(r.useEffect)((function(){i(w())}),[]);var k=function(){i(w()),x(!1)},C=Object(r.useCallback)((function(e){var t=c[e];x(!0),t.correct?(m({text:"Correct!"}),h((function(e){return Object(a.a)(Object(a.a)({},e),{},{right:e.right+1})}))):(m({text:"Wrong!"}),h((function(e){return Object(a.a)(Object(a.a)({},e),{},{wrong:e.wrong+1})}))),setTimeout(k,1e3)}),[c,m]);return Object(d.jsxs)("div",{className:l.a.question_container,children:[Object(d.jsx)(v,{score:b.right-b.wrong}),Object(d.jsx)("h1",{onClick:function(){m({text:s})},children:s}),Object(d.jsx)(f,{disabled:g,answers:c.map((function(e){return e.answer})),onAnswerClick:C})]})}var k=function(){return Object(d.jsx)("div",{children:Object(d.jsx)(m,{})})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,21)).then((function(t){var n=t.getCLS,r=t.getFID,s=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),s(e),c(e),i(e)}))};i.a.render(Object(d.jsx)(s.a.StrictMode,{children:Object(d.jsx)(x,{children:Object(d.jsx)(k,{})})}),document.getElementById("root")),C()},3:function(e,t,n){e.exports={answer_list:"answerList_answer_list__sXq9W",answer_item:"answerList_answer_item__39PDq",answer_list__disabled:"answerList_answer_list__disabled__2KlDf"}},7:function(e,t,n){e.exports={question_container:"question_question_container__2hzZ1"}}},[[20,1,2]]]);
//# sourceMappingURL=main.9aa59f57.chunk.js.map