(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-clinic-clinicPortrait"],{"0614":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={uniPopup:i("c0bd").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content vertical-screen"},[n("v-uni-view",{on:{longpress:function(e){arguments[0]=e=t.$handleEvent(e),t.open.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.open.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"bg"},[n("v-uni-image",{staticClass:"bg-img",attrs:{src:i("9dc9").replace(/^\./,"")}})],1),n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"header"},[n("v-uni-image",{staticClass:"logo",attrs:{src:i("3a9c").replace(/^\./,"")}}),n("v-uni-view",{staticClass:"header-text"},[n("v-uni-text",[t._v(t._s(t.dateText.year)+"-"+t._s(t.dateText.month)+"-"+t._s(t.dateText.date))]),n("v-uni-text",[t._v(t._s(t.dateText.time))])],1)],1),n("v-uni-view",{staticClass:"info"},[n("v-uni-view",{staticClass:"title"},[n("v-uni-text",{staticClass:"title-right"},[t._v("心内科")])],1),n("v-uni-view",{staticStyle:{display:"flex",height:"623px"}},[t.data.img?n("v-uni-view",{staticClass:"userimg"},[n("v-uni-image",{staticClass:"dataImg",attrs:{src:t.data.img,mode:""}})],1):n("v-uni-view",{staticClass:"userimg"},[n("v-uni-image",{attrs:{src:i("06ab").replace(/^\./,""),mode:""}})],1),n("v-uni-view",{staticClass:"info-content"},[n("v-uni-view",{staticClass:"name"},[n("v-uni-text",{staticClass:"info-title"},[t._v("姓名：")]),n("v-uni-text",[t._v("吴先杰")])],1),n("v-uni-view",{staticClass:"name-type"},[n("v-uni-text",{staticClass:"info-title"},[t._v("职称：")]),n("v-uni-text",[t._v("主治医生")])],1),n("v-uni-view",{staticClass:"info-text expertise"},[n("v-uni-text",{staticClass:"info-title"},[t._v("专长：")]),n("v-uni-text",[t._v("心血管专业、高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病")])],1)],1)],1),n("v-uni-view",{staticClass:"bottom"},[t._v("感谢您的耐心等待")])],1)],1)],1),n("uni-popup",{ref:"popup",attrs:{type:"center",maskClick:!1}},[n("v-uni-view",{staticClass:"popup"},[n("v-uni-view",{staticClass:"popup-header"},[t._v("设置")]),n("v-uni-view",[n("v-uni-view",{staticClass:"uni-form-item "},[n("v-uni-view",{staticClass:"popup-title"},[t._v("诊室：")]),n("v-uni-input",{staticClass:"uni-input",attrs:{placeholder:"请输入诊室"},model:{value:t.iType,callback:function(e){t.iType=e},expression:"iType"}})],1),n("v-uni-view",{staticClass:"uni-form-item uni-form-btn"},[n("v-uni-button",{staticClass:"chooseBtn",attrs:{type:"default"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo()}}},[t._v("选择页面")])],1),n("v-uni-view",{staticClass:"uni-form-item "},[n("v-uni-button",{staticClass:"popup-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}},[t._v("取消")]),n("v-uni-button",{staticClass:"popup-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)}}},[t._v("确定")])],1)],1)],1)],1)],1)},o=[]},"06ab":function(t,e,i){t.exports=i.p+"static/img/user.83cc7431.png"},"06c5":function(t,e,i){"use strict";i("a630"),i("fb6a"),i("d3b7"),i("25f0"),i("3ca3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var n=a(i("6b75"));function a(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(t){if("string"===typeof t)return(0,n.default)(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?(0,n.default)(t,e):void 0}}},"0fa9":function(t,e,i){"use strict";var n=i("fcdc"),a=i.n(n);a.a},"3a9c":function(t,e,i){t.exports=i.p+"static/img/logo.08248fce.png"},5688:function(t,e,i){"use strict";i.r(e);var n=i("0614"),a=i("c69b");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("0fa9");var s,r=i("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"d39e4596",null,!1,n["a"],s);e["default"]=c.exports},"6b75":function(t,e,i){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},"70da":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".expertise[data-v-d39e4596]{overflow:hidden;height:227px}.chooseBtn[data-v-d39e4596]{font-size:30px;width:438px}.uni-form-item.uni-form-btn[data-v-d39e4596]{padding:0}.bg .bg-img[data-v-d39e4596]{position:absolute;top:0;z-index:-1;height:768px;width:1366px}.userimg[data-v-d39e4596]{margin-left:133px;height:397px;margin-top:28px;width:265px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;background-color:#fff}.dataImg[data-v-d39e4596]{height:507px;width:343px}.logo[data-v-d39e4596]{margin-left:50px;width:400px;height:80px}body[data-v-d39e4596]{margin:auto;min-width:1080px;max-width:1080px}.header[data-v-d39e4596]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;height:133px;padding-bottom:20px}.header-text[data-v-d39e4596]{margin-right:40px;padding-bottom:4px}.header-text uni-text[data-v-d39e4596]{font-size:34px;margin-left:20px;color:#fff}.info .title[data-v-d39e4596]{text-align:center;height:142px;line-height:142px;margin-top:46px;color:#095cb9}.info .title uni-text[data-v-d39e4596]{font-size:67px}.info-content[data-v-d39e4596]{margin-left:20px;width:603px;margin-top:45px}.info-content uni-text[data-v-d39e4596]{font-size:30px}.info-time[data-v-d39e4596]{font-size:30px}.info-right[data-v-d39e4596]{margin-top:25px;width:660px;margin-left:20px}.info-right-title[data-v-d39e4596]{font-size:55px;font-weight:800;text-align:center;letter-spacing:5px}.info-right-number[data-v-d39e4596]{text-align:center;font-size:60px;height:190px;line-height:190px}.info-right-number.size[data-v-d39e4596]{text-align:center;font-size:39px;height:80px;line-height:80px}.bottom[data-v-d39e4596]{font-size:35px;-webkit-margin-start:52px;margin-inline-start:52px;margin-top:67px}.popup-btn[data-v-d39e4596]{font-size:30px;color:#fff;padding-left:40px;padding-right:40px;background-color:#4472c4;margin-left:40px;margin-right:40px}.popup[data-v-d39e4596]{background-color:#fff;width:600px;font-size:40px;z-index:100}.popup-header[data-v-d39e4596]{background-color:#4472c4;text-align:center;padding:10px 0}.uni-form-item[data-v-d39e4596]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:40px;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.popup-title[data-v-d39e4596]{font-size:30px}.uni-input[data-v-d39e4596]{font-size:25px;border:1px solid;padding:20px 30px}",""]),t.exports=e},"9dc9":function(t,e,i){t.exports=i.p+"static/img/portrait-bg.74cd5406.png"},b85c:function(t,e,i){"use strict";i("a4d3"),i("e01a"),i("d28b"),i("d3b7"),i("3ca3"),i("ddb0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var n=a(i("06c5"));function a(t){return t&&t.__esModule?t:{default:t}}function o(t,e){var i;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=(0,n.default)(t))||e&&t&&"number"===typeof t.length){i&&(t=i);var a=0,o=function(){};return{s:o,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,r=!0,c=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return r=t.done,t},e:function(t){c=!0,s=t},f:function(){try{r||null==i["return"]||i["return"]()}finally{if(c)throw s}}}}},c69b:function(t,e,i){"use strict";i.r(e);var n=i("d3bb"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},d3bb:function(t,e,i){"use strict";var n=i("4ea4");i("99af"),i("fb6a"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("b85c")),o=(n(i("c0bd")),{data:function(){return{dateText:{year:"",month:"",date:"",day:"",time:""},title:"麻醉门诊",weekday:[],data:[],cliniqueCode:"",iType:"",popupShow:!1,seqNumber:"",test:"测试",testNubmer:0}},onLoad:function(){var t=this;this.iType=uni.getStorageSync("iType")||"";var e=new Date;this.weekday=new Array(7),this.weekday[0]="星期日",this.weekday[1]="星期一",this.weekday[2]="星期二",this.weekday[3]="星期三",this.weekday[4]="星期四",this.weekday[5]="星期五",this.weekday[6]="星期六",this.newDate(),setTimeout((function(){t.newDate(),setInterval((function(){t.newDate()}),6e4)}),1e3*e.getSeconds()),this.iType},methods:{navTo:function(){uni.setStorageSync("pageSetBoolean",!1),uni.redirectTo({url:"../index/index"})},newDate:function(){var t=new Date;this.dateText={year:t.getFullYear(),month:t.getMonth()+1,date:t.getDate(),day:this.weekday[t.getDay()],time:t.getHours()+":"+(t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())}},open:function(){this.$refs.popup.open(),this.popupShow=!0},close:function(){this.$refs.popup.close(),this.popupShow=!1},confirm:function(){""!==this.iType?(uni.showLoading({title:"加载中"}),uni.setStorageSync("iType",this.iType),this.popupShow=!1,this.data=[],this.init(),this.$refs.popup.close(),uni.hideLoading()):uni.showToast({title:"请输入诊室",icon:"none"})},init:function(){var t=this;if(this.popupShow)return!1;var e={DEPT_NAME:"心血管内科",DEPT_CODE:"62701",ROOM_CODE:"三楼3诊室",PATIENT_NAMES:["林碧昭","陈志隆","阮能斌","林宜付","吕妙英","雷如弟","林爱琼","林颖","黄允基","林庆思","林晖","张建基","雷月金","陈嫩","何帮勤","陈细呀","郑菊丹"],AM_PM:"下午",PATIENT_TIMES:["2020-08-05T06:30:00.000+00:00","2020-08-05T06:40:00.000+00:00","2020-08-05T07:15:00.000+00:00","2020-08-05T07:30:00.000+00:00","2020-08-05T07:40:00.000+00:00","2020-08-05T07:50:00.000+00:00","2020-08-05T08:00:00.000+00:00","2020-08-05T08:10:00.000+00:00","2020-08-05T08:15:00.000+00:00","2020-08-05T08:30:00.000+00:00","2020-08-05T08:40:00.000+00:00","2020-08-05T08:45:00.000+00:00","2020-08-05T08:50:00.000+00:00","2020-08-05T09:00:00.000+00:00","2020-08-05T09:10:00.000+00:00","2020-08-05T09:15:00.000+00:00","2020-08-05T09:20:00.000+00:00"],PATIENT_BARCODES:["J34965028","J53602097","0000000000680842","J12507368","J19512020","J23013136","J35416231","J03667247","J00651266","J34620353","J01834443","0000000002956521","J21538297","J02348906","J03387149","J04105238","J19567785"],PATIENT_SEQS:[1430,1440,1515,1530,1540,1550,1600,1610,1615,1630,1640,1645,1650,1700,1710,1715,1720],STATUS:"0",DOC_INTRO:"\r\n\ufeff擅长冠心病、急性心肌梗塞、外周血管疾病介入诊疗以及高血压、心力衰竭、心律失常的诊断和治疗。",ROOM_NAME:"3诊室",DOC_TITLE:"副主任医师",DOCTOR:"林施峰",DOCTOR_PICADD:""};if(e.doctor){this.seqNumber=e.seq_number;var i="";res.DOCTOR_PICADD&&(i="data:image/png;base64,"+res.DOCTOR_PICADD);var n={name:e.DOCTOR,title:e.DOC_TITLE,info:e.DOC_INTRO,time:"坐诊时间：",deptName:e.ROOM_NAME+" "+e.DEPT_NAME,img:i},a=this.chineseNumeral(e.seeing.number+""),o="请,".concat(a,"号,").concat(e.seeing.name,"到,").concat(e.room);console.log(o),this.onDone(o),this.data.length<4?this.data=this.data.concat(n):(this.data[3]=n,this.$forceUpdate())}else setTimeout((function(){t.init()}),3e3)},onDone:function(t){var e=this,i=4300;t.length>12&&(i+=300*(t.length-12)),setTimeout((function(){e.init()}),i)},chineseNumeral:function(t){var e,i="",n=(0,a.default)(t);try{for(n.s();!(e=n.n()).done;){var o=e.value;switch(o){case"0":i+="零";break;case"1":i+="一";break;case"2":i+="二";break;case"3":i+="三";break;case"4":i+="四";break;case"5":i+="五";break;case"6":i+="六";break;case"7":i+="七";break;case"8":i+="八";break;case"9":i+="九";break;default:i+=o}}}catch(s){n.e(s)}finally{n.f()}return i},hideName:function(t){return 2==t.length?t="*"+t.slice(1,t.length):t.length>2&&(t=t.slice(0,1)+"*"+t.slice(t.length-1,t.length)),t}}});e.default=o},fcdc:function(t,e,i){var n=i("70da");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("3f2cd52c",n,!0,{sourceMap:!1,shadowMode:!1})}}]);