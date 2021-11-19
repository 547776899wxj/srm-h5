/**
 * 光谱ct 64排ct
 */
<template>
	<view class="content" @longpress="open" @click="open">
		<image class="bg" src="/static/ct.png"></image>
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
			<view class="info-item">
				<view class="item-title">
					光谱CT
				</view>
				<view class="item-content">
					<view class="text">请</view>
					<view class="date-text">{{data[0].name}}</view>
					<view class="text">到</view>
					<view class="date-text">光谱CT</view>
					<view>检查室检查</view>
				</view>
			</view>
			<view class="info-item">
				<view class="item-title">
					64排CT
				</view>
				<view class="item-content">
					<view class="text">请</view>
					<view class="date-text">{{data[1].name}}</view>
					<view class="text">到</view>
					<view class="date-text">64排CT</view>
					<view>检查室检查</view>
				</view>
			</view>
		</view>
		<popupSet ref="popupSet" @confirm="confirm"  @close="close" :dataInit="dataPopup"  ></popupSet>
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
			data:[
				{name:''},
				{name:''}
			]
		};
	},
	onLoad() {
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
			// let res = {data:{queueTitle:'妇科疑难病症',"reload": false,"Data": [{"erName": "麻醉室一","patientCode": 123,"patientName": '就诊中',"lb": "EDO","callTime": null,"waitStatus": null,"waitList": [{"erName": "麻醉室一","patientCode": 123,"patientName": '我喜欢',"lb": "EDO","callTime": null,"waitStatus": null,"waitList": []},{"erName": "麻醉室一","patientCode": 123,"patientName": '我喜欢',"lb": "EDO","callTime": null,"waitStatus": null,"waitList": []}]},{"erName": "麻醉室二","patientCode": "08-12","patientName": "张三","lb": "EDO","callTime": "14:39:09","waitStatus": null,"waitList": [{"erName": "麻醉室二","patientCode": "08-13","patientName": "李四","lb": "EDO","callTime": "14:43:57","waitStatus": "4"},{"erName": "麻醉室二","patientCode": "08-14","patientName": "王五","lb": "EDO","callTime": "14:55:28","waitStatus": "4"}]},{"erName": "麻醉室三","patientCode": null,"patientName": null,"lb": "EDO","callTime": null,"waitStatus": null,"waitList": []},{"erName": "麻醉室四","patientCode": null,"patientName": null,"lb": "EDO","callTime": null,"waitStatus": null,"waitList": []}],
			// "ServerTime": "2021-04-14 15:43:50"}
			// }
			// res.data.Data = [{"erName": "麻醉室三","patientCode": null,"patientName": '我喜欢',"lb": "EDO","callTime": null,"waitStatus": null,"waitList": []}];
			
			uni.request({
				url: 'http://129.1.20.21:8019/Queue/spacsCTQueue',
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
						let dataMaps = [];
						this.newDate(res.data.ServerTime);
						datas.Data.forEach((data, index) => {
							let name = (data.patientName == '就诊中' ? data.patientName : this.$util.hideName(data.patientName)) || '';
							let waitList = data.waitList.map(item =>{
								return {
									name: this.$util.hideName(item.patientName),
									number: item.patientCode
								}
							})
							let dataMap = {
								room: data.erName || '',
								number: data.patientCode||'',	
								name: name,
								waitList: waitList
							};
							
							if(name && this.playSound){
								let room = '光谱CT';
								if(index==1){
									room = '64排CT'
								}
								let speakText = `请${data.patientName}到${room}检查室检查`;
								if(this.data.length==0){
									this.voiceData.push(speakText);
									this.voiceDataInit.push(speakText);
								}else{
									voiceDataInit = voiceDataInit.concat(speakText);
								}
							}
							dataMaps = dataMaps.concat(dataMap);
						});
						if(dataMaps.length == 0){
							dataMaps = [{name:''},{name:''}]
						}else if(dataMaps.length == 1){
							dataMaps.push({name:''});
						}
						console.log(dataMaps);
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
	}
};
</script>

<style lang="scss">
.info{
	padding:  0 40px;
	color: rgb(0,140,133);
	.info-item{
		.item-title{
			text-align: center;
			line-height: 97px;
			font-size: 60px;
		}
		.item-content{
			font-size: 85px;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 350px;
			.date-text{
				color: rgb(55,79,148);
				width: 560px;
				text-align: center;
			}
		}
	}
}
page {
	height: 100%;
}

.header {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 118px;
}

.content {
	position: relative;
	height: 100%;
	font-family: KaiTi;
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
	font-size: 60px;
	font-weight: 800;
	letter-spacing: 12px;
	    width: 700px;
	    text-align: center;
}
.header-time view {
	font-size: 35px;
	color: #000;
	letter-spacing: 5px;
}



</style>
