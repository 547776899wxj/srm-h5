<template>
	<view class="content vertical-screen">
		<view @longpress="open" @click="open">
			<view class="bg">
				<image class="bg-img" src="../../static/portrait-bg.png" >
			</view>
			<view class="content">
				<view class="header">
					<image class="logo" src="../../static/logo.png" >
					<view class="header-text">
						<text>{{dateText.year}}-{{dateText.month}}-{{dateText.date}}</text>
						<text>{{dateText.time}}</text>
					</view>
				</view>
				<view class="info">
					<view class="title">
						<text class="title-right" >心内科</text>
					</view>
					<view style="display: flex;height: 623px;">
						<view class="userimg" v-if="data.img"><image class="dataImg" :src="data.img" mode=""></image></view>
						<view class="userimg" v-else><image src="../../static/user.png" mode=""></image></view>
						<view class="info-content">
							<view class="name">
								<text class="info-title">姓名：</text>
								<text>吴先杰</text>
							</view>
							<view class="name-type">
								<text class="info-title">职称：</text>
								<text>主治医生</text>
							</view>
							<view class="info-text expertise">
								<text class="info-title">专长：</text>
								<text>心血管专业、高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病高血压等疾病</text>
							</view>
						</view>	
					</view>
					<!-- <view class="info-right " >
						<view v-if="data.wlist.length>0">
							<view class="info-right-title">
								正在就诊
							</view>
							<view class="info-right-number">
								<view  v-if="data.wlist.length>=1">
									<text style="padding-right: 30px;">{{data.wlist[0].number}}号</text>
									<text>{{data.wlist[0].name}}</text>
								</view>
							</view>
							<view class="info-right-title" style="margin-top: 5px;  margin-bottom: 17px;">
								等待就诊
							</view>
							<view class="info-right-number size">
								<view  v-if="data.wlist.length>=2">
									<text style="padding-right: 20px;">{{data.wlist[1].number}}号</text>
									<text>{{data.wlist[1].name}}</text>
								</view>
							</view>
							<view class="info-right-number size" >
								<view v-if="data.wlist.length>=3">
									<text style="padding-right: 20px;">{{data.wlist[2].number}}号</text>
									<text>{{data.wlist[2].name}}</text>
								</view>
							</view>
							<view style="font-size: 30px; margin-left: 76px; margin-top: 33px;">
								{{waitingNumber}}
							</view>
						</view>
					</view> -->
					<view class="bottom">
						感谢您的耐心等待
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="popup">
				<view class="popup-header">
					设置
				</view>
				<view>
					<view class="uni-form-item ">
						<view class="popup-title">诊室：</view>
						<input class="uni-input" v-model="iType"  placeholder="请输入诊室" />
					</view>
					<view class="uni-form-item uni-form-btn">
						<button type="default" class="chooseBtn" @click="navTo()">选择页面</button>
					</view>
					<view class="uni-form-item " >
						<button class="popup-btn" @click="close">取消</button>
						<button class="popup-btn" @click="confirm">确定</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
// var FvvUniTTS = uni.requireNativePlugin('Fvv-UniTTS')
export default {
	data() {
		return {
			dateText: {
				year: '',
				month: '',
				date: '',
				day: '',
				time: ''
			},
			title: '麻醉门诊',
			weekday: [],
			data: [
				
			],
			cliniqueCode: '',
			iType: '',
			popupShow: false,
			seqNumber: '',
			test: '测试',
			testNubmer: 0
		};
	},
	onLoad() {
		this.iType = uni.getStorageSync('iType') || '';
		let date = new Date();
		this.weekday = new Array(7);
		this.weekday[0] = '星期日';
		this.weekday[1] = '星期一';
		this.weekday[2] = '星期二';
		this.weekday[3] = '星期三';
		this.weekday[4] = '星期四';
		this.weekday[5] = '星期五';
		this.weekday[6] = '星期六';
		this.newDate();
		setTimeout(() => {
			this.newDate();
			setInterval(() => {
				this.newDate();
			}, 60000);
		}, date.getSeconds() * 1000);
		if (this.iType) {
			// this.init();
		}
	},
	methods: {
		//选择页面
		navTo(){
			uni.setStorageSync('pageSetBoolean',false);
			uni.redirectTo({
				url: '../index/index',
			});
		},
		//当前时间
		newDate() {
			let date = new Date();
			this.dateText = {
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				date: date.getDate(),
				day: this.weekday[date.getDay()],
				time: date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
			};
		},
		// 打开设置
		open() {
			this.$refs.popup.open();
			this.popupShow = true;
		},
		// 关闭设置
		close() {
			this.$refs.popup.close();
			this.popupShow = false;
		},
		//确定设置
		confirm() {
			if (this.iType === '') {
				uni.showToast({
					title: '请输入诊室',
					icon: 'none'
				});
				return;
			}

			uni.showLoading({
				title: '加载中'
			});
			uni.setStorageSync('iType', this.iType);
			this.popupShow = false;
			this.data = [];
			this.init();
			this.$refs.popup.close();
			uni.hideLoading();
		},
		// 初始化数据
		init() {
			if (this.popupShow) {
				return false;
			}
			// 测试使用
			let data = {"DEPT_NAME":"心血管内科","DEPT_CODE":"62701","ROOM_CODE":"三楼3诊室","PATIENT_NAMES":["林碧昭","陈志隆","阮能斌","林宜付","吕妙英","雷如弟","林爱琼","林颖","黄允基","林庆思","林晖","张建基","雷月金","陈嫩","何帮勤","陈细呀","郑菊丹"],"AM_PM":"下午","PATIENT_TIMES":["2020-08-05T06:30:00.000+00:00","2020-08-05T06:40:00.000+00:00","2020-08-05T07:15:00.000+00:00","2020-08-05T07:30:00.000+00:00","2020-08-05T07:40:00.000+00:00","2020-08-05T07:50:00.000+00:00","2020-08-05T08:00:00.000+00:00","2020-08-05T08:10:00.000+00:00","2020-08-05T08:15:00.000+00:00","2020-08-05T08:30:00.000+00:00","2020-08-05T08:40:00.000+00:00","2020-08-05T08:45:00.000+00:00","2020-08-05T08:50:00.000+00:00","2020-08-05T09:00:00.000+00:00","2020-08-05T09:10:00.000+00:00","2020-08-05T09:15:00.000+00:00","2020-08-05T09:20:00.000+00:00"],"PATIENT_BARCODES":["J34965028","J53602097","0000000000680842","J12507368","J19512020","J23013136","J35416231","J03667247","J00651266","J34620353","J01834443","0000000002956521","J21538297","J02348906","J03387149","J04105238","J19567785"],"PATIENT_SEQS":[1430,1440,1515,1530,1540,1550,1600,1610,1615,1630,1640,1645,1650,1700,1710,1715,1720],"STATUS":"0","DOC_INTRO":"\r\n﻿擅长冠心病、急性心肌梗塞、外周血管疾病介入诊疗以及高血压、心力衰竭、心律失常的诊断和治疗。","ROOM_NAME":"3诊室","DOC_TITLE":"副主任医师","DOCTOR":"林施峰","DOCTOR_PICADD":""};
			if (!data.doctor) {
				setTimeout(() => {
					this.init();
				}, 3000);
				return;
			}
			this.seqNumber = data.seq_number;
			let img = '';
			if(res.DOCTOR_PICADD){
				img = 'data:image/png;base64,' + res.DOCTOR_PICADD;
			}
			let dataMap = {
				name:data.DOCTOR,
				title:data.DOC_TITLE,
				info:data.DOC_INTRO,
				time:'坐诊时间：',
				deptName:data.ROOM_NAME +' '+ data.DEPT_NAME,
				img:img,
			};
			// 请 票号  患者名 到 窗口名
			let number = this.chineseNumeral(data.seeing.number + '');
			let speakText = `请,${number}号,${data.seeing.name}到,${data.room}`;
			console.log(speakText);
			// FvvUniTTS.init((callback) => {
			// 	FvvUniTTS.speak({
			// 		text:speakText
			// 	});
			// });
			this.onDone(speakText);
			if (this.data.length < 4) {
				this.data = this.data.concat(dataMap);
			} else {
				this.data[3] = dataMap;
				this.$forceUpdate();
			}

			// uni.request({
			//     url: 'http://198.100.100.36:8018/Queue/Get_Queue',
			//     // url: 'http://192.168.0.159:8018/Queue/Get_Queue',
			// 	data:{
			// 		iType :this.iType ,
			// 	},
			// 	timeout:3000,
			//     success: (res) => {
			// 		let data = res.data.Data;
			//     },
			// 	fail:(res) => {
			// 		uni.showToast({
			// 			title:'请求失败',
			// 			icon:'none'
			// 		})
			// 	}
			// });
		},
		// 播放完执行
		onDone(data) {
			let date = 4300;
			if (data.length > 12) {
				date = date + (data.length - 12) * 300;
			}
			setTimeout(() => {
				this.init();
			}, date);
		},
		//转大写
		chineseNumeral(data) {
			let tmpnewchar = '';
			for (let char of data) {
				switch (char) {
					case '0':
						tmpnewchar = tmpnewchar + '零';
						break;
					case '1':
						tmpnewchar = tmpnewchar + '一';
						break;
					case '2':
						tmpnewchar = tmpnewchar + '二';
						break;
					case '3':
						tmpnewchar = tmpnewchar + '三';
						break;
					case '4':
						tmpnewchar = tmpnewchar + '四';
						break;
					case '5':
						tmpnewchar = tmpnewchar + '五';
						break;
					case '6':
						tmpnewchar = tmpnewchar + '六';
						break;
					case '7':
						tmpnewchar = tmpnewchar + '七';
						break;
					case '8':
						tmpnewchar = tmpnewchar + '八';
						break;
					case '9':
						tmpnewchar = tmpnewchar + '九';
						break;
					default:
						tmpnewchar = tmpnewchar + char;
				}
			}
			return tmpnewchar;
		},
		//隐藏名字
		hideName(name) {
			if (name.length == 2) {
				name = '*' + name.slice(1, name.length);
			} else if (name.length > 2) {
				name = name.slice(0, 1) + '*' + name.slice(name.length - 1, name.length);
			}
			return name;
		}
	}
};
</script>

<style>
.expertise{
	overflow: hidden;
	height: 227px;
}
.chooseBtn{
	font-size: 30px;
	width: 438px;
}
.uni-form-item.uni-form-btn{
	padding: 0;
}
.bg .bg-img {
	position: absolute;
	top: 0;
	z-index: -1;
	height: 768px;
	width: 1366px;
}
.userimg {
	margin-left: 133px;
	height: 397px;
	margin-top: 28px;
	width: 265px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #fff;
}
.dataImg {
	height: 507px;
	width: 343px;
}

.logo {
	margin-left: 50px;
	width: 400px;
	height: 80px;
}
body {
	margin: auto;
	min-width: 1080px;
	max-width: 1080px;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	height: 133px;
	padding-bottom: 20px;
}
.header-text {
	margin-right: 40px;
	padding-bottom: 4px;
}
.header-text text {
	font-size: 34px;
	margin-left: 20px;
	color: #ffffff;
}
.info .title {
	text-align: center;
	height: 142px;
	line-height: 142px;
	margin-top: 46px;
	color: rgb(9, 92, 185);
}
.info .title text {
	font-size: 67px;
}
.info-content{
	
}
.info-content {
	margin-left: 20px;
	width: 603px;
	margin-top: 45px;
}
.info-content text {
	font-size: 30px;
}

.info-time {
	font-size: 30px;
}
.info-right {
	margin-top: 25px;
	width: 660px;
	margin-left: 20px;
}
.info-right-title {
	font-size: 55px;
	font-weight: 800;
	text-align: center;
	letter-spacing: 5px;
}
.info-right-number {
	text-align: center;
	font-size: 60px;
	height: 190px;
	line-height: 190px;
}
.info-right-number.size {
	text-align: center;
	font-size: 39px;
	height: 80px;
	line-height: 80px;
}
.bottom {
	font-size: 35px;
	margin-inline-start: 52px;
	margin-top: 67px;
}

.popup-btn {
	font-size: 30px;
	color: #fff;
	padding-left: 40px;
	padding-right: 40px;
	background-color: rgb(68, 114, 196);
	margin-left: 40px;
	margin-right: 40px;
}
.popup {
	background-color: #fff;
	width: 600px;
	font-size: 40px;
	z-index: 100;
}
.popup-header {
	background-color: rgb(68, 114, 196);
	text-align: center;
	padding: 10px 0;
}
.uni-form-item {
	display: flex;
	align-items: center;
	padding: 40px;
	justify-content: center;
}
.popup-title {
	font-size: 30px;
}
.uni-input {
	font-size: 25px;
	border: 1px solid;
	padding: 20px 30px;
}
</style>
