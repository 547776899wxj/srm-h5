
<template>
	<view class="content" @longpress="open" @click="open">
		<image class="bg" src="/static/ultrasonic.jpg"></image>
		<view class="header">
			<!-- <view class="header-title">{{ title }}</view> -->
			<view class="header-time">
				<view>
					<text>{{ dateText.year }}年{{ dateText.month }}月{{ dateText.date }}日</text>
				</view>
				<view>
					<text class="pr-15">{{ dateText.day }}</text>
					<text>{{ dateText.time }}</text>
				</view>
			</view>
		</view>
		<view class="info">
			<view class="info-patient" v-for="(item, index) in data" :key="index">
				<view class="name">
					<text class="pr-15" v-if="item.number">{{ item.number }}号</text>
					<text class="pl-15">{{ item.name }}</text>
				</view>
				<view class="room">{{ item.room }}</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="popup">
				<view class="popup-header">设置</view>
				<view>
					<!-- <view class="uni-form-item ">
						<view class="popup-title">标题：</view>
						<input class="uni-input" v-model="title" placeholder="请输入标题" />
					</view> -->
					<view class="uni-form-item ">
						<view class="popup-title">科室：</view>
						<input class="uni-input" v-model="iType" placeholder="请输入科室" />
					</view>
					<view class="uni-form-item uni-form-btn">
						<view class="popup-title">屏幕：</view>
						<input class="uni-input" v-model="screenNumber" placeholder="第一个屏幕输入:1" />
					</view>
					<view class="uni-form-item ">
						<view class="popup-title">声音：</view>
						<radio-group @change="radioChange" class="radio-group">
							<label class="uni-list-cell uni-list-cell-pd">
							    <view>
							        <radio class="radio" value="false"  :checked="playSound==false"/>
							    </view>
							    <view class="popup-title">无</view>
							</label>
						    <label class="uni-list-cell uni-list-cell-pd">
						        <view>
						            <radio class="radio" value="true" :checked="playSound==true" />
						        </view>
						        <view class="popup-title">有</view>
						    </label>
						</radio-group>
					</view>
					<view class="uni-form-item uni-form-btn"><button type="default" class="chooseBtn" @click="navTo()">选择页面</button></view>
					
					<view class="uni-form-item ">
						<button class="popup-btn" @click="close">取消</button>
						<button class="popup-btn" @click="confirm">确定</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
// #ifdef APP-PLUS
	var FvvUniTTS = uni.requireNativePlugin('Fvv-UniTTS');
// #endif

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
			title: '',
			weekday: [],
			data: [
				// {
				// 	room:'科室1',
				// 	number:'A1002',
				// 	name:'张无忌',
				// },
			],
			cliniqueCode: '',
			iType: '',
			popupShow: false,
			seqNumber: '',
			screenNumber: '',
			playSound:false,
			voiceDataInit:[],
			voiceData:[],
			
			test: '测试',
			testNubmer: 0,
			reload:false,
		};
	},
	onLoad() {
		this.iType = uni.getStorageSync('iType') || '';
		this.screenNumber = uni.getStorageSync('screenNumber') || '';
		this.title = uni.getStorageSync('title') || '';
		this.playSound = uni.getStorageSync('playSound') || false;
		let date = new Date();
		this.weekday = new Array(7);
		this.weekday[0] = '星期日';
		this.weekday[1] = '星期一';
		this.weekday[2] = '星期二';
		this.weekday[3] = '星期三';
		this.weekday[4] = '星期四';
		this.weekday[5] = '星期五';
		this.weekday[6] = '星期六';
		if (this.iType && this.screenNumber) {
			this.init();
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
		newDate(dataTime) {
			let date = new Date(dataTime);
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
			if (this.iType && this.screenNumber) {
				this.init();
			}
		},
		//确定设置
		confirm() {
			if (this.iType === '') {
				uni.showToast({
					title: '请输入科室',
					icon: 'none'
				});
				return;
			}
				
			uni.showLoading({
				title: '加载中'
			});
			uni.setStorageSync('iType', this.iType);
			uni.setStorageSync('playSound', this.playSound);
			uni.setStorageSync('screenNumber', this.screenNumber);
			uni.setStorageSync('title', this.title);
			this.popupShow = false;
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
// 			let datas = [{"patientname":"王素霞","LB":" EDO","room_name":"检查室一","WAIT_STATUS":"4","call_time1":"16:31:40","patientcode":"2-808","ername":"检查室一","call_time":"16:31:40"},

// {"patientname":"吴良付","LB":"EDO","room_name":"检查室二","WAIT_STATUS":"6","call_time1":"15:32:53","patientcode":"14-03","ername":"检查室二","call_time":"15:32:53"},

// {"patientname":"田江芬","LB":"EDO","room_name":"检查室三","WAIT_STATUS":"4","call_time1":"16:26:29","patientcode":"16-05","ername":"检查室三","call_time":"16:26:29"},

// {"patientname":"田江芬","LB":"EDO","room_name":"检查室四","WAIT_STATUS":"4","call_time1":"16:26:29","patientcode":"16-05","ername":"检查室四","call_time":"16:26:29"}];
// 			datas[0].patientcode = datas[0].patientcode + this.testNubmer++
// 			let voiceDataInit = [];
// 			this.newDate('2020-08-26 16:17:54');
			
			uni.request({
				url: 'http://129.1.20.21:8019/Queue/CS_Get_Queue',
				data: {
					lb: this.iType,
					room_name_type: this.screenNumber,
				},
				success: res => {
					let datas = res.data.Data;
					if(res.data.reload=='true' && this.reload!=res.data.reload){
						this.$tui.webView.postMessage({
							data: {
								reload:res.data.reload
							}
						})
					}
					this.reload = res.data.reload;
					let voiceDataInit = [];
					let dataMaps = [];
					this.newDate(res.data.ServiceTime);
					datas.forEach((data, index) => {
						let name = this.$util.hideName(data.patientname);
						let dataMap = {
							room: data.room_name,
							number: data.patientcode||'',
							name: name
						};
						dataMaps = dataMaps.concat(dataMap);
					
						if(name && this.playSound){
							let number = this.chineseNumeral(dataMap.number+'')||'';
							number = number?number+'号,':'';
							let speakText = `请,${number}${data.patientname}到,${dataMap.room},检查`;
							if(this.data.length==0){
								this.voiceData.push(speakText);
								this.voiceDataInit.push(speakText);
							}else{
								voiceDataInit = voiceDataInit.concat(speakText);
							}
						}
					});
					this.data = dataMaps;
					if(this.playSound){
						if(voiceDataInit.length>0){
							this.voiceData = this.$util.findDifferentElements(voiceDataInit,this.voiceDataInit);
							this.voiceDataInit = voiceDataInit;
						}
						if(this.voiceData.length>0){
							this.voiceQueue();	
						}else{
							setTimeout(() => {
								this.init()
							}, 5000);
						}
					}else{
						setTimeout(() => {
							this.init();
						}, 5000);
					}
					
				},
				fail: res => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
					setTimeout(() => {
						this.init();
					}, 5000);
				}
			});
		},
		// 语音队列
		voiceQueue(){
			// #ifdef APP-PLUS
				FvvUniTTS.init((callback) => {
					FvvUniTTS.speak({
						text:this.voiceData[0]
					});
				});
			// #endif
			console.log(this.voiceData[0]);
			if(this.voiceData.length>1){
				this.onDone(this.voiceData[1]);
			}else{
				let date = 4300;
				if(this.voiceData[0].length>12){
					date = date + ((this.voiceData[0].length - 12)*300 ) 
				}
				setTimeout(() => {
					this.init()
				}, date);
			}
		},
		// 播放完执行
		onDone(data){
			let date = 4300;
			if(data.length>12){
				date = date + ((data.length - 12)*300 ) 
			}
			setTimeout(() => {
				this.voiceData.shift();
				if(this.voiceData.length>0){
					this.voiceQueue()
				}else{
					setTimeout(() => {
						this.init()
					}, 5000);
				}
			}, date);
			
		},
		//转大写
		chineseNumeral(data){
			let tmpnewchar = "" ;
				for(let char of data){
					switch (char) {
			            case "0":   tmpnewchar =  tmpnewchar + "零" ;break;
			            case "1":  tmpnewchar =  tmpnewchar + "一" ; break;
			            case "2":  tmpnewchar =  tmpnewchar + "二" ; break;
			            case "3":  tmpnewchar =  tmpnewchar + "三" ; break;
			            case "4":  tmpnewchar =  tmpnewchar + "四" ; break;
			            case "5":  tmpnewchar =  tmpnewchar + "五" ; break;
			            case "6":  tmpnewchar =  tmpnewchar + "六" ; break;
			            case "7":  tmpnewchar =  tmpnewchar + "七" ; break;
			            case "8":  tmpnewchar =  tmpnewchar + "八" ; break;
			            case "9":  tmpnewchar =  tmpnewchar + "九" ; break;
						default: tmpnewchar = tmpnewchar + char;
			        }
			}
			return tmpnewchar;
		},

		
		//声音设置
		radioChange(evt) {
			if(evt.target.value=='true'){
				this.playSound = true;
			}else{
				this.playSound = false;
			}
			uni.setStorageSync('playSound', this.playSound);
		},
		
	}
};
</script>

<style>
.pr-15 {
	padding-right: 15px;
}
.pl-15 {
	padding-left: 15px;
}
page {
	height: 100%;
}
.uni-form-item.uni-form-btn {
	padding: 0;
}
.radio-group{
	width: 341px;
	display: flex;
}
.radio{
	transform:scale(2);
	width: 48px;
	height: 48px;
	margin-right: 30px;
	display: flex;
	justify-content: center;
	    margin-left: 30px;
}
.uni-list-cell{
	display: flex;
	align-items: center;
}
.chooseBtn {
	font-size: 30px;
	width: 438px;
}
.header {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 118px;
}
.room {
    width: 540px;
    margin-left: 59px;
}
.content {
	position: relative;
	height: 100%;
}

.bg {
	position: absolute;
	height: 1080px;
	width: 1920px;
	z-index: -1;
}
.header-time {
	display: flex;
	position: absolute;
	justify-content: center;
	flex-direction: column;
	right: 45px;
	padding-top: 15px;
	top: 0px;
}
.header-title {
	color: rgb(253, 250, 7);
	font-size: 63px;
	font-weight: 800;
	letter-spacing: 12px;
}
.header-time view {
	font-size: 35px;
	color: #000;
	letter-spacing: 5px;
}
.info {
	padding-left: 35px;
	padding-right: 35px;
}
.info-patient {
	display: flex;
	height: 128px;
}
.name {
	width: 682px;
	margin-left: 261px;
}
.info-patient view {
	font-size: 60px;
	color: rgb(55,79,141);
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
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
