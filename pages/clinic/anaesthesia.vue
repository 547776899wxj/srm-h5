<!-- 麻醉门诊 安卓4-->
<template>
	<view class="content"  @longpress="open" @click="open">
		<image class="bg" src="/static/anaesthesia.png" ></image>
		<view class="header">
			<view class="header-title">{{title}}</view>
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
			<view class="info-patient" v-for="(item,index) in data" :key="index">
				<view class="room">{{item.cliniqueName}}</view>
				<!-- <view class="doctor">{{item.doctor}}</view> -->
				<view class="seeing" style="color: #ffa500; ">
					<text class="pr-15" v-show="item.callingSeq">{{item.callingSeq}}号</text>
					<text class="pl-15">{{item.calling}}</text>
				</view>
				<!-- <view class="seeing" style="padding-left: 60px;">
					<text class="pr-15" v-show="item.waitingSeq">{{item.waitingSeq}}号</text>
				</view> -->
			</view>
		</view>
		<popupSet ref="popupSet" @confirm="confirm" iTypeText="诊室" @close="close" :dataInit="dataPopup"></popupSet>
	</view>
</template>

<script>
import popupSet from '../../components/popup-set/popup-set.vue';
export default {
		components: { popupSet },
		data() {
			return {
				iType:'',
				title:'',
				screenNumber:'',
				popupShow:false,
				dateText: {
					year: '',
					month: '',
					date: '',
					day: '',
					time: ''
				},
				dataPopup:{
					title:'',
					iType:'',
					screenNumber:'',
					playSound:false,
				},
				data:[],
				voiceData:[],
				voiceDataInit:[],
				voicePlayTiems:3,
				voicePlayNumber:0,
				testNumber:0,
				audioList:[],
			};
		},
		onLoad() {
			this.init();
		},
		methods:{
			// 打开设置
			open(){
				this.$refs.popupSet.open();
				this.popupShow = true;
			},
			// 关闭设置
			close(){
				this.popupShow = false;
			},
			//确定设置
			confirm(res) {
				this.iType = res.iType;
				this.screenNumber = res.screenNumber;
				this.popupShow = false;
			},
			init(){
				
				// let res = {data:{"reload":"false",
				// "audioList":[{"deptCode": null,"deptName": null,"cliniqueName": "电子喉镜","cliniqueCode": "1","techTitle": null,"doctor": null,"doctorPic": null,"introduction": null,"calling": null,"callingSeq": null,"callingPreTime": null,"waiting": null,"waitingSeq": null,"waitingPreTime": null,"amPm": null,"status": null,"isReCall": null},{"deptCode": "2199","deptName": "耳鼻喉科","cliniqueName": "中医治疗","cliniqueCode": "747","techTitle": null,"doctor": null,"doctorPic": null,"introduction": null,"calling": "唐凤珍","callingSeq": "2014","callingPreTime": "2021-02-01 16:19:40","waiting": "李嘉妮","waitingSeq": "2015","waitingPreTime": null,"amPm": "下午","status": null,"isReCall": "3"},{"deptCode": "2199","deptName": "耳鼻喉科","cliniqueName": "耳内镜、鼻内镜","cliniqueCode": "6","techTitle": null,"doctor": null,"doctorPic": null,"introduction": null,"calling": "林洪燕","callingSeq": "4020","callingPreTime": "2021-02-01 15:57:02","waiting": "林洪燕","waitingSeq": "4020","waitingPreTime": null,"amPm": "下午","status": null,"isReCall": "1"}],
				// "Data":[
				// {"isReCall":0,"deptCode":"2199","deptName":"耳鼻喉科","cliniqueName":"内镜一","cliniqueCode":"5","techTitle":null,"doctor":"吴先杰","doctorPic":null,"introduction":null,"calling":"eee","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:52","waiting":"eee","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:52","amPm":'下午',"status":null},
				// {"isReCall":0,"deptCode":"2199","deptName":"耳鼻喉科","cliniqueName":"纤维鼻咽喉镜室","cliniqueCode":"1","techTitle":null,"doctor":"我先杰","doctorPic":null,"introduction":null,"calling":"tt","callingSeq":"1001","callingPreTime":"2021-01-15 12:37:42","waiting":"tt","waitingSeq":"1001","waitingPreTime":"2021-01-15 12:37:42","amPm":'下午',"status":null}
				// ],
				// "ServerTime":"2021-01-15 13:00:07"},
				// }
				
				// res.data.audioList[0].isReCall = this.testNumber++;
				// if(this.testNumber++ > 1){
				// 	console.log("测试");
				// 	res.data.audioList = [{"deptCode": null,"deptName": null,"cliniqueName": "电子喉镜","cliniqueCode": "1","techTitle": null,"doctor": null,"doctorPic": null,"introduction": null,"calling": null,"callingSeq": null,"callingPreTime": null,"waiting": null,"waitingSeq": null,"waitingPreTime": null,"amPm": null,"status": null,"isReCall": null},{"deptCode": "2199","deptName": "耳鼻喉科","cliniqueName": "中医治疗","cliniqueCode": "747","techTitle": null,"doctor": null,"doctorPic": null,"introduction": null,"calling": "唐凤珍","callingSeq": "2014","callingPreTime": "2021-02-01 16:21:33","waiting": "李嘉妮","waitingSeq": "2015","waitingPreTime": null,"amPm": "下午","status": null,"isReCall": "4"},{"deptCode": "2199","deptName": "耳鼻喉科","cliniqueName": "耳内镜、鼻内镜","cliniqueCode": "6","techTitle": null,"doctor": null,"doctorPic": null,"introduction": null,"calling": "林洪燕","callingSeq": "4020","callingPreTime": "2021-02-01 15:57:02","waiting": "林洪燕","waitingSeq": "4020","waitingPreTime": null,"amPm": "下午","status": null,"isReCall": "1"}]
				// }; 
				
				// 测试----------------------------------------------------------------------------------------------------------------------------------------
				
				
				uni.request({	
					url: 'http://129.1.20.21:8019/Queue/getNosethroat',
					method: 'POST',
					success: res => {
						try{
							let datas = res.data;
							this.dateText = this.geteDateText(datas.ServerTime);
							if(datas.reload=='true' || datas.reload==true){
								this.$tui.webView.postMessage({
									data: {
										reload:datas.reload
									}
								})
								return;
							}
							let dataMaps = [];
							let dataAudioList = [];
							let voiceDataInit = [];
							datas.Data.forEach(item =>{
								let calling =item.calling?this.$util.hideName(item.calling):'';
								let waiting =item.waiting?this.$util.hideName(item.waiting):'';
								dataMaps = dataMaps.concat({
									cliniqueName: item.cliniqueName || '',
									calling: calling,
									callingSeq: item.callingSeq || '',
									waiting: waiting,
									waitingSeq: item.waitingSeq || '',
									doctor: item.doctor || '',
								});
								
							})
							console.log(datas);
							// 语音
							datas.audioList.forEach(item =>{
								let isRecall = false;
								if(item.isReCall > 0){
									this.audioList.forEach((oldItem,index) =>{
										if(oldItem.callingSeq == item.callingSeq && item.isReCall > oldItem.isisReCallNumber){
											isRecall = true;
										}
									})
								}
								if(item.callingSeq){
									dataAudioList = dataAudioList.concat({
										callingSeq: item.callingSeq || '',
										isRecall: isRecall,
										isisReCallNumber:item.isReCall,
									});
									let number = this.$util.chineseNumeral(item.calling+'');
									let speakText = `请,${item.callingSeq},${item.calling},到${item.cliniqueName}就诊`;
									if(this.audioList.length==0){
										this.voiceData.push(speakText);
										this.voiceDataInit.push(speakText);
									}else{
										voiceDataInit = voiceDataInit.concat(speakText);
									}
								}
							})
							if(voiceDataInit.length>0){
								this.voiceData = this.$util.findDifferentElements(voiceDataInit,this.voiceDataInit);
								dataAudioList.forEach((item, index) => {
									if(item.isRecall){
										this.voiceData.unshift(voiceDataInit[index])
									}
								})
								this.voiceDataInit = voiceDataInit;
							}
							this.data = dataMaps;
							this.audioList = dataAudioList;
							if(this.voiceData.length>0){
								this.voiceQueue();	
							}else{
								setTimeout(() => {
									this.init()
								}, 6000);
							}
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.init();
							}, 6000);
						}
						
					},
					fail: (err) => {
						setTimeout(() => {
							this.init();
						}, 6000);
					},
				});
			},
			geteDateText(dataTime){
				let date = new Date(dataTime);
				let weekday = [ '星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
				return {
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					date: date.getDate(),
					day: weekday[date.getDay()],
					time: date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
				};
			},
			// 语音队列
			voiceQueue(){
				let text = this.voiceData[0]; 
				this.$tui.webView.postMessage({
					data: {
						text:text
					}
				})
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
						setTimeout(() => {
							this.init()
						}, 6000);
					}
				}, date);
				
			},
		}
	
};
</script>

<style>
.pr-15{
	padding-right: 15px;
}
.pl-15{
	padding-left: 15px;
}
page {
	height: 100%;
}
.uni-form-item.uni-form-btn{
	padding: 0;
}

.chooseBtn{
	font-size: 30px;
	width: 438px;
}
.header{
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 118px;
}
.room{
	width: 45%;
	position: relative;
	left: 57px;
}
.doctor{
	width: 420px;
}
.seeing{
	width: 55%;
	box-sizing: border-box;
	padding-right: 200px;
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
.header-title{
	color: rgb(253,250,7);
	font-size: 63px;
	font-weight: 800;
	letter-spacing: 12px;
}
.header-time view {
	font-size: 35px;
	color: #000;
	letter-spacing:5px;
}
.info{
	padding-top: 121px;
	padding-left: 35px;
	padding-right: 35px;
}
.info-patient {
	display: flex;
	height: 200px;
	justify-content: space-around;
}
.info-patient view {
	font-size: 65px;
	font-weight: bold;
	color: #000;
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.popup-btn{
		font-size: 30px;
		color: #fff;
		padding-left: 40px;
		padding-right: 40px;
		background-color: rgb(68,114,196);
		margin-left: 40px;
		margin-right: 40px;
	}
	.popup{
		background-color: #fff;
		width: 600px;
		font-size: 40px;
		z-index: 100;
	}
	.popup-header{
		background-color: rgb(68,114,196);
		text-align: center;
		padding: 10px 0 ;
	}
	.uni-form-item{
		display: flex;
		align-items: center;
		padding: 40px;
		justify-content: center;
	}
	.popup-title{
		font-size: 30px;
	}
	.uni-input{
		font-size: 25px;
		border: 1px solid;
		padding: 20px 30px;
	}
</style>

