/**
 * 消化内镜
 */
<template>
	<view class="content" @longpress="open" @click="open">
		<image class="bg" src="/static/check.png"></image>
		<view class="header">
			<view class="header-title">{{ title }}</view>
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
				<view class="room">{{ item.room }}</view>
				<view class="name" style="padding-left: 30px;box-sizing: border-box;">
					<text class="pr-15" v-if="item.number">{{ item.number }}号</text>
					<text class="pl-15">{{ item.name }}</text>
				</view>
				<view class="name wait" style="font-size: 58px;">
					<view>
						<view class="pr-15" v-if="item.waitingNo">{{ item.waitingNo }}号</view>
						<view class="pl-15">{{ item.waitingName }}</view>
					</view>
				</view>
				
			</view>
		</view>
		<popupSet ref="popupSet" @confirm="confirm"  @close="close" :dataInit="dataPopup" :showTitle="true"  ></popupSet>
	</view>
</template>

<script>
import popupSet from '../../components/popup-set/popup-set.vue';
// #ifdef APP-PLUS
	var FvvUniTTS = uni.requireNativePlugin('Fvv-UniTTS');
// #endif
export default {
	components: { popupSet },
	data() {
		return {
			dataPopup:{
				title:'',
				iType:'',
				screenNumber:'',
				playSound:false,
			},
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
				{
					room:'',
					number:'',
					name:'',
				},{
					room:'',
					number:'',
					name:'',
				},{
					room:'',
					number:'',
					name:'',
				},{
					room:'',
					number:'',
					name:'',
				},
			],
			cliniqueCode: '',
			iType: '',
			popupShow: false,
			seqNumber: '',
			screenNumber: '',
			playSound:true,
			voiceDataInit:[],
			voiceData:[],
			voicePlayTiems:3,
			voicePlayNumber:0,
			test: '测试',
			testNubmer: 0,
			reload:false,
			
		};
	},
	onLoad() {
		// this.title = uni.getStorageSync('title') || '';
		
		let date = new Date();
		this.weekday = new Array(7);
		this.weekday[0] = '星期日';
		this.weekday[1] = '星期一';
		this.weekday[2] = '星期二';
		this.weekday[3] = '星期三';
		this.weekday[4] = '星期四';
		this.weekday[5] = '星期五';
		this.weekday[6] = '星期六';
		this.init();
	},
	methods: {
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
		open(){
			this.$refs.popupSet.open();
			this.popupShow = true;
		},
		// 关闭设置
		close(){
			this.popupShow = false;
			this.init();
		},
		//确定设置
		confirm(res) {
			this.popupShow = false;
			this.data = [];
			this.init();
		},
		// 初始化数据
		init() {
			if (this.popupShow) {
				return false;
			}
			// 测试使用
			// let res = {data:{"reload": false,"data": [{"ername": "检查室一","lb": "EDO","callingNo": "09-01","callingName": "张三","waitingNo": "09-02","waitingName": "李四"},{"ername": "检查室二","lb": "EDO","callingNo": "09-03","callingName": "王五","waitingNo": "","waitingName": ""},{"ername": "检查室三","lb": "EDO","callingNo": "","callingName": "","waitingNo": "09-04","waitingName": "赵六"},{"ername": "检查室四","lb": "EDO","callingNo": "","callingName": "","waitingNo": "","waitingName": ""}],"queueTitle": "麻醉胃镜","serviceTime": "2021-05-31 15:32:47"}}
			
		
			uni.request({
				url: 'http://129.1.20.21:8019/Queue/pacs',
				success: res => {
					try{
						let datas = res.data;
						// #ifdef H5
							if(datas.reload=='true' || datas.reload==true){
								location.reload();
								return;
							}
						// #endif
						let voiceDataInit = [];
						this.title = res.data.queueTitle || '';
						let dataMaps = [];
						this.newDate(res.data.ServerTime);
						datas.data.forEach((data, index) => {
							console.log(data);
							let name = this.$util.hideName(data.callingName);
							
							let dataMap = {
								room: data.ername || '',
								number: data.callingNo||'',	
								name: name,
								waitingNo: data.waitingNo,
								waitingName: this.$util.hideName(data.waitingName) || ''
							};
							
							if(name && this.playSound){
								let number = this.chineseNumeral(dataMap.number+'')||'';
								number = number?number+'号,':'';
								let speakText = `请,${number}${data.callingName}到,${dataMap.room},检查`;
								if(this.data.length==0){
									this.voiceData.push(speakText);
									this.voiceDataInit.push(speakText);
								}else{
									voiceDataInit = voiceDataInit.concat(speakText);
								}
							}
							dataMaps = dataMaps.concat(dataMap);
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
								}, 6000);
							}
						}else{
							setTimeout(() => {
								this.init();
							}, 6000);
						}
					}catch(e){
						setTimeout(() => {
							this.init();
						}, 6000);
					}
				},
				fail: res => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
					setTimeout(() => {
						this.init();
					}, 6000);
				}
			});
		},
		// 语音队列
		voiceQueue(){
			let text = this.voiceData[0]; 
			console.log(text);
			// #ifdef H5
				this.$tui.webView.postMessage({
					data: {
						text:text
					}
				})
			// #endif
			// #ifdef APP-PLUS
				FvvUniTTS.init((callback) => {
					FvvUniTTS.speak({
						text:text
					});
				});
			// #endif
			if(this.voiceData.length>1){
				this.onDone(this.voiceData[1]);
			}else{
				this.onDone(this.voiceData[0]);
			}
		},
		// 播放完执行
		onDone(data){
			let date = 4300;
			if(data.length>12){
				date = date + ((data.length - 12)*300 ) 
			}
			setTimeout(() => {
				this.voicePlayNumber++;
				if(this.voicePlayNumber>=this.voicePlayTiems){
					this.voiceData.shift();
					this.voicePlayNumber = 0;
				}
				if(this.voiceData.length>0){
					this.voiceQueue()
				}else{
					this.init();
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
		
		
		
		
	}
};
</script>

<style lang="scss">
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
	width: 435px;
	padding-right: 50px;
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
	font-size: 70px;
	font-weight: 800;
	letter-spacing: 12px;
	text-align: center;
}
.header-time view {
	font-size: 35px;
	color: #000;
	letter-spacing: 5px;
}
.info {
	padding-left: 35px;
	padding-right: 35px;
	padding-top: 120px;
}
.info-patient {
	display: flex;
	height: 201px;
	font-size: 63px;
}
.name {
	width: 735px;
}
.info-patient view {
	
	color: #000;
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
.name.wait{
	flex-direction: column;
	
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
@media screen and (max-width: 1280px) {
    .bg{
		height: 720px;
		width: 1280px;
	}
	.info{
		padding-left: 24px;
		padding-right: 24px;
		padding-top: 79px;
	}
	.header{
		height: 78px;
	}
	.header-time view{
		font-size: 22px;
	}
	.info-patient{
		height: 135px;;
	}
	.info-patient view{
		font-size: 37px;
	}
	.name{
		width: 453px  
	}
	.room{
		width: 302px;
		padding-right: 20px;
	}
	.popup{
		width: 500px;
	}
	.uni-form-item{
		padding: 26px;
	}
	.popup-title{
		font-size: 25px;
	}
	.uni-input{
		font-size: 20px;
	}
	.radio-group{
		width: 288px;
	}
	.chooseBtn{
		font-size: 25px;
	}
	.popup-btn{
		font-size: 25px;
	}
}
</style>
